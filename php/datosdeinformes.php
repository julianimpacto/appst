<?php
$servername = "localhost";
$username = "root";
$password = "bandband";
$q = $_REQUEST["q"];
$partes = explode(";", $q);
$bada = $partes[0];
$codconsulta = $partes[1];
$consulta = $partes[2];
$devuelvanombredelascolumnas = $partes[3];
//list($bada, $codconsulta, $consulta, $devuelvanombredelascolumnas) = split(";", $q, 4);
// Create connection
$conn = new mysqli($servername, $username, $password, $bada);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

switch ($codconsulta) {
	case '101305':
		$par = explode(",", $consulta);
		$sql = "SELECT eo.Fecha1 AS Fecha,eo.ideventocausante AS IdEvento,eo.idadministrativocausante AS IdAdministrativo,eo.idterminal AS IdTerminal, CONCAT(ev.ev, ' ', eo.IdAdministrativo, ' (', eo.Nota1, ')') AS Evento,
					eo.Nota2 AS Observaciones, te.no AS Cliente, us.no AS Responsable, eo.IdTerminal AS PC, mov.valor*(1-2*mov.escredito) AS Monto,
					mov.saldo as Saldo
				FROM movimientos AS mov, eventosocurrencias AS eo, eventos AS ev, terceros AS te, usuarios AS us 
				WHERE mov.subcuenta=130505
					AND eo.idterminal=mov.idterminal
					AND NOT eo.idevento IN(110505, 280505) 
					AND eo.idevento=mov.idevento 
					AND eo.idadministrativo=mov.idadministrativo 
					AND ev.id=eo.ideventocausante 
					AND te.id=mov.auxiliar 
					AND te.id=$par[2] 
					AND us.id=eo.idUsuario  
					AND eo.idterminal=2 
					AND eo.fecha1 > '$par[0] 00:00:00'  
					AND fecha1 < '$par[1] 23:59:59' ";
	break;
	case '101305aa':
		$par = explode(",", $consulta);
		$sql = "SELECT eo.fecha1 AS Fecha, eo.idterminal AS IdTerminal, eo.idevento AS IdEvento, eo.idadministrativocausante AS IdAdministrativo, ar.no AS Articulo, pd.precio AS Valor, (pd.precio*pd.cantidad) AS Total, pd.precio AS Precio
			FROM eventosocurrencias eo,planillasdetalles pd, terceros te,articulos ar
			WHERE te.id = eo.idtercero
				AND te.id=$par[2]
				AND eo.idevento = pd.idevento
				AND eo.idadministrativo = pd.idadministrativo
				AND eo.idterminal = pd.idterminal
				AND pd.idarticulo=ar.id
				AND pd.idevento=413500
				AND eo.idterminal=$par[2]
				AND eo.fecha1 > '$par[0] ' 
				AND eo.fecha1 < '$par[1] 23:59:59'
			ORDER BY pd.id";
	case '140002':
		$sql = "SELECT no, precioa, preciob, modificado FROM articulos ORDER BY modificado DESC LIMIT 100";		
	break;
	case '421055':
		$parametros = explode(",", $consulta);
		$sql = "SELECT 'Total de cargos en el período', SUM(mo.valor)/2
			 	FROM movimientos AS mo, 
			 		(SELECT idarticulo AS te
			 		 FROM planillasdetalles
			 		 WHERE idevento=130004
			 		 	AND idadministrativo=$parametros[2]) AS lista
			 	WHERE idevento=421055
			 		AND mo.modificado BETWEEN '$parametros[0]' AND '$parametros[1] 23:59:59'
			 		AND mo.auxiliar=lista.te";
	break;
	default:	
			break;
}
//echo $sql;
$result = $conn->query($sql);
if ($result->num_rows > 0) {						
	$numfilas=mysqli_num_rows($result);
	$numcolumnas=mysqli_num_fields($result);
	/*if ( $devuelvanombredelascolumnas ) {
		$campos = mysqli_fetch_fields($result);
		$col = 0;
		foreach ($campos as $valor) {
			if ( $col == 0 ) {
				echo $valor->name;
			} else {
				echo "|" . $valor->name;
			}
			$col ++;
		}
		echo ";";
	}*/	
	$k = 0;
	while($row=mysqli_fetch_array($result)) {			
		$k++;
		for ($j=0; $j<$numcolumnas; $j++ ) {
			if ($j==0) {
				echo $row[$j];
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