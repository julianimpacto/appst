<?php
$servername = "localhost";
$username = "root";
$password = "bandband";
$q = $_REQUEST["q"];
$partes = explode(";", $q);
$bada = $partes[0];
if ( $bada == 'codex' ) { $password = 'bandband'; $username = 'root'; }
$texto = $partes[1];
$tabla = $partes[2];
$campo = $partes[3];
$limit = $partes[4];
$nombretabla = $partes[5];
$condiciones = $partes[6];
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
		$sql = "SELECT idtercero, " . $campo . " FROM " . $tabla . $strTextoInteligente . $condiciones . " ORDER BY nota2 LIMIT " . $limit . ";";	
	} else {
		if ($tabla == 'eventosocurrencias2') {
			$sql = "SELECT eo.idtercero, listas.no, eo.idevento						
					FROM eventosocurrencias AS eo, 
						(SELECT id AS maxid, idtercero AS idlista, idevento AS ca
	 					 FROM eventosocurrencias,	
							(SELECT MAX(id) AS maxid
		 					 FROM eventosocurrencias 
		 					 WHERE idevento IN(904201, 904202)
		 					 GROUP BY idtercero) AS ids
	 					 WHERE id=ids.maxid) AS ulca,
						(SELECT idadministrativo AS idlista, nota2 AS no
	 					 FROM eventosocurrencias
	 					 WHERE idevento=130004 
							AND nota2 LIKE '%$texto%') AS listas,
						(SELECT idtercero AS usuario, valor1 AS idlista
	 					 FROM eventosocurrencias
	 					 WHERE idevento=130010
	 						AND idtercero=$limit) AS usre
					WHERE eo.idevento=ulca.ca
						AND eo.idtercero=listas.idlista
						AND eo.idtercero=ulca.idlista
						AND eo.idtercero=usre.idlista
						AND eo.id=ulca.maxid
					ORDER BY eo.idtercero";			
		} else {
			$sql = "SELECT id, " . $campo . " FROM " . $tabla . $strTextoInteligente . $condiciones . " ORDER BY no LIMIT " . $limit . ";";
		}		
	}	
}
$result = $conn->query($sql);
$cont = 0;
$idante = 0;
if ($result->num_rows > 0) {	
	echo '<table class="lstCoincidencias" id="' . $nombretabla . '">';
	switch ($tabla) {
		case 'eventos':
			while($row = mysqli_fetch_array($result)) {
				echo utf8_encode('<tr Tag=' . $row[0] . ' onclick="lstEventos_Click(this, event);" TagReferenciado="' . $row[3] . '" TagDetalle="' . $row[2] . '" IdPlTi=' . $row[4] . '><td id="td' . $row[0] . '">' . $row[1] . '</td></tr>');
			}
		break;
		case 'eventosocurrencias2':
			while($row = mysqli_fetch_array($result)) {

				if ( $row[2] == 904202 ) {
					echo utf8_encode('<tr><td Tag=' . $row[0] . ' onclick="' . $nombretabla . '_Click(this, event);" id="td' . $row[0] . '">' . $row[1] . '</td><td id="tda' . $row[0] . '"><a Tag="' . $row[0] . '" class="botondeplanilla" onclick="bloqueecartera(1, this);">Activa</a></td><td id="nuco"><a Tag="' . $row[0] . '" class="botondeplanilla" onclick="reviserecibos(this, event);">Revisar</a></td></tr>');
					//echo utf8_encode('<tr id="cmd' . $row[0] . '" Tag=' . $row[0] . ' onclick="lstReferenciado_Click(this, event);" TagDetalle="' . $row[2] . '" id="td' . $row[0] . '"><td>' . $row[1] . '</td><td><a Tag="' . $row[0] . '" onclick="bloqueecartera(1, this);">Activa</a></td></tr>');
				} else {
					echo utf8_encode('<tr><td Tag=' . $row[0] . ' onclick="' . $nombretabla . '_Click(this, event);" id="td' . $row[0] . '">' . $row[1] . '</td><td id="tda' . $row[0] . '"><a Tag="' . $row[0] . '" class="botondeplanilla" onclick="desbloqueecartera(1, this);">Suspendida</a></td><td id="nuco"><a Tag="' . $row[0] . '" class="botondeplanilla" onclick="reviserecibos(this, event);">Revisar</a></td></tr>');
					//echo utf8_encode('<tr id="cmd' . $row[0] . '" Tag=' . $row[0] . ' onclick="lstReferenciado_Click(this, event);" TagDetalle="' . $row[2] . '" id="td' . $row[0] . '"><td>' . $row[1] . '</td><td><a Tag="' . $row[0] . '" onclick="bloqueecartera(1, this);">Suspendida</a></td></tr>');
				}
			}
		break;
		default:
			while($row = mysqli_fetch_array($result)) {
				echo utf8_encode('<tr Tag=' . $row[0] . ' onclick="' . $nombretabla . '_Click(this, event);"><td id="td' . $row[0] . '">' . $row[1] . '</td></tr>');	
			}	
		break;
	}

	if ($tabla == 'eventos') {
		
	} else {
		
	}			
	echo '</table>';
} else {
	echo '<img src="imagenes/noencontrado.png" alt="" />';
}	
$conn->close();
?>

