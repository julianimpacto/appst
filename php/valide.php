<?php
$servername = "localhost";
$username = "root";
$password = "bandband";
$dbname = "mercavilla_codex";
$q = $_REQUEST["q"];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 
$partes = explode("|", $q);

$sql = "CALL validep('$partes[0]', '$partes[1]', '$partes[2]', '$partes[3]');";		
$result = $conn->query($sql);

$cont = 0;
$idante = 0;

if ($result->num_rows > 0) {	
	while($row = mysqli_fetch_array($result)) {
		echo "$row[0]";		
	}		
} else {
	echo 'nada';
}	
$conn->close();
?>

