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
     //echo "mala conexión";
} 
$sql = "SELECT pr, vi, bada, lo, id, idcrac FROM il WHERE id = " . $q;		
$result = $conn->query($sql);
$cont = 0;
$idante = 0;
//echo $sql;
if ($result->num_rows > 0) {
	while($row = mysqli_fetch_array($result)) {
		echo "$row[0]|$row[1]|$row[2]|$row[3]|$row[4]|$row[5]";
	}			
} else {
	echo 'nada';
}	
$conn->close();
?>
