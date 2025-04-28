<?php
$servername = "localhost";
$username = "root";
$password = "bandband";
$q = $_REQUEST["q"];
$partes = explode(";", $q);
$bada = $partes[0];
if ( $bada == 'codex' ) { $password = 'bandband'; $username = 'root'; }
$tabla = $partes[1];
// Create connection
$conn = new mysqli($servername, $username, $password, $bada);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

if ( $tabla == 'articulos' ) {
	$sql = "SELECT * FROM " . $tabla . " ORDER BY no";	
} else {
	$sql = "SELECT * FROM " . $tabla . " ORDER BY Id";
}
		
$result = $conn->query($sql);
if ($result->num_rows > 0) {						
	$numfilas=mysqli_num_rows($result);
	$numcolumnas=mysqli_num_fields($result);
	$i = 0;
	$k = 0;
	while($row=mysqli_fetch_array($result)) {			
		$k++;
		for ($j=0; $j<$numcolumnas; $j++ ) {
			if ($j==0) {
				echo utf8_encode($row[$j]);
			} else {
				echo utf8_encode("|" . $row[$j]);
			}			
		}	
		if ($k<$numfilas) { echo ";"; }		
	}		
} else {
	echo 'nada';
}	
$conn->close();
?>

