<?php
$servername = "localhost";
$username = "root";
$password = "bandband";

$q = $_REQUEST["q"];
list($bada, $texto, $tabla, $campo, $limit, $nombretabla, $condiciones) = split(";", $q, 7);
// Create connection
$conn = new mysqli($servername, $username, $password, $bada);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 
$strTextoInteligente = " WHERE " . $tabla . '.' . $campo . " LIKE '%";
	For ($i = 0; $i <= strlen($texto) -1 ; $i++ ) {
	If (substr($texto, $i, 1) == " ") {
        $strTextoInteligente .= "% ";
    } Else {
     	$strTextoInteligente .= substr($texto, $i, 1);
    }
}
if (substr($strTextoInteligente, -1) != "%" ) { $strTextoInteligente .= "%"; }
$strTextoInteligente .= "'";
if ($tabla == 'eventos') {
	$sql = "SELECT eventos.id, eventos.ev, sipltiev.cocu0, sipltiev.cocu1, sipltiev.idplti
		FROM eventos, sipltiev " . 
		$strTextoInteligente . 
		" AND sipltiev.idev=eventos.id " .
		$condiciones .
		" ORDER BY eventos.ev
		LIMIT ". $limit . ";";
} else {
	if ($tabla == 'eventosocurrencias') {
		$sql = "SELECT idtercero, " . $campo . " FROM " . $tabla . $strTextoInteligente . $condiciones . " LIMIT " . $limit . ";";	
	} else {
		$sql = "SELECT id, " . $campo . " FROM " . $tabla . $strTextoInteligente . $condiciones . " LIMIT " . $limit . ";";	
	}	
}
$result = $conn->query($sql);
$cont = 0;
$idante = 0;
if ($result->num_rows > 0) {	
	echo '<table class="lstCoincidencias" id="' . $nombretabla . '">';
	if ($tabla == 'eventos') {
		while($row = mysqli_fetch_array($result)) {
			echo utf8_encode('<tr Tag=' . $row[0] . ' onclick="lstEventos_Click(this, event);" TagReferenciado="' . $row[3] . '" TagDetalle="' . $row[2] . '" IdPlTi=' . $row[4] . '><td id="td' . $row[0] . '">' . $row[1] . '</td></tr>');
		}
	} else {
		while($row = mysqli_fetch_array($result)) {
			echo utf8_encode('<tr Tag=' . $row[0] . ' onclick="' . $nombretabla . '_Click(this, event);"><td id="td' . $row[0] . '">' . $row[1] . '</td></tr>');	
		}
	}			
	echo '</table>';
} else {
	echo '<img src="imagenes/noencontrado.png" alt="" />';
}	
$conn->close();
?>