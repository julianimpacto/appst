<?php
$servername = "localhost";
$username = "root";
$password = "bandband";

$q = $_REQUEST["q"];
//list($bada, $usuario) = split(";", $q, 2);
$partes = explode(";", $q);
$bada = $partes[0];
$usuario = $partes[1];
// Create connection
if ( $bada == 'codex' ) { $password = 'bandband'; $username = 'root'; }
$conn = new mysqli($servername, $username, $password, $bada);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT id, idtercero, no, nivel FROM usuarios WHERE no = '" . $usuario . "'";		
$result = $conn->query($sql);
$cont = 0;
$idante = 0;

if ($result->num_rows > 0) {	
	while($row = mysqli_fetch_array($result)) {
		echo $row[0] . ";" . $row[1] . ";" . $row[2] . ";" . $row[3];		
	}			
} else {
	echo 'nada';
}	
$conn->close();
?>

