<?php
$servername = "localhost";
$username = "root";
$password = "bandband";
$dbname = "mercavilla_codex";
$q = $_REQUEST["q"];
$partes = explode(";", $q);
$bada = $partes[0];
$usuario = $partes[1];
$contrasena = $partes[2];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT idli FROM us WHERE no='" . $usuario . "' AND co='" . $contrasena . "';";		
$result = $conn->query($sql);
$cont = 0;
$idante = 0;

if ($result->num_rows > 0) {	
	while($row = mysqli_fetch_array($result)) {
		echo $row[0];		
	}		
} else {
	echo 'nada';
}	
$conn->close();
?>

