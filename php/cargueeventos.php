 <?php
$servername = "localhost";
$username = "root";
$password = "bandband";
$q = $_REQUEST["q"];
$partes = explode(";", $q);
$bada = $partes[0];
if ( $bada == 'codex' ) { $password = 'bandband'; $username = 'root'; }
$usuario = $partes[1];
$busqueda = $partes[2];
// Create connection
$conn = new mysqli($servername, $username, $password, $bada);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT ev.id, ev.ev, (SELECT tabla FROM sistemacontabilidadcriteriosauxiliares AS cri, sipltaas WHERE sipltaas.idsiplti = sipltiev.cocu0 AND cri.id=sipltaas.idtaas) AS cocu0,
 		     (SELECT tabla FROM sistemacontabilidadcriteriosauxiliares AS cri, sipltaas WHERE sipltaas.idsiplti = sipltiev.cocu1 AND cri.id=sipltaas.idtaas) AS cocu1, sipltiev.idplti 
FROM eventos AS ev, sipltiev
WHERE sipltiev.idev=ev.id
	AND ev.id IN (SELECT idev FROM usev WHERE idus=$usuario)
ORDER BY ev.id;";
//echo $sql;
$result = $conn->query($sql);
$cont = 0;
$idante = 0;
if ($result->num_rows > 0) {	
	echo '<table class="lstCoincidencias" id="lstEventos0">';
	while($row = mysqli_fetch_array($result)) {
		echo utf8_decode('<tr Tag=' . $row[0] . ' onclick="lstEventos_Click(this, event);" TagReferenciado="' . $row[3] . '" TagDetalle="' . $row[2] . '" IdPlTi=' . $row[4] . '><td id="td' . $row[0] . '">' . $row[1] . '</td></tr>');
	}			
	echo '</table>';
} else {
	echo '<img src="imagenes/404.png" alt="" />';
}	
$conn->close();
?>

