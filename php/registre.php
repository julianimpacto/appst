<?php
$servername = "localhost";
$username = "root";
$password = "bandband";;

$q = $_REQUEST["q"];
$Datos = explode(";", $q);
//list($bada, $idcomando, $comando) = split(";", $q, 3);
$bada = $Datos[0];
if ( $bada == 'codex' ) { $password = 'bandband'; $username = 'root'; }
$idcomando = $Datos[1];
$comando = $Datos[2];
$multiple = false;
switch ($idcomando) {
	case '0':
		$sql = $comando;
		break;
	case '1':		
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO movimientos (idevento, idadministrativo, ideventocausante, idadministrativocausante, subcuenta, auxiliar, escredito, valor, saldo, idterminal) VALUES (" . $parametros[0] . ", " . $parametros[1] . ", " . $parametros[2] . ", " . $parametros[3] . ", " . $parametros[4] . ", " . $parametros[5] . ", " . $parametros[6] . ", '" . $parametros[7] . "', '" . $parametros[8] . "', " . $parametros[9] . ");";				
		break;
	case '2':
		$parametros = explode("|", $comando);		
		$sql = "INSERT INTO eventosocurrencias (idevento, idadministrativo, idusuario, idtercero, idterminal, valor1, valor2, valor3, fecha1, fecha2, nota1, nota2, ideventocausante, idadministrativocausante) VALUES (" . $parametros[0] . ", " . $parametros[1] . ", " . $parametros[2] . ", " . $parametros[3] . ", " . $parametros[4] . ", '" . $parametros[5] . "', '" . $parametros[6] . "', '" . $parametros[7] . "', '" . $parametros[8] . "', '" . $parametros[9] . "', '" . $parametros[10] . "', '" . $parametros[11] . "', " . $parametros[12] . ", " . $parametros[13] . ");";
		break;
	case '3':
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO terceros (nit, no, direccion, telefono) VALUES ('" . $parametros[0] . "', '" . $parametros[1] . "', '" . $parametros[2] . "', '" . $parametros[3] . "');";		
		break;	
	case '4':
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO registros (registro, origen) VALUES('INSERT INTO terceros (nit, no, direccion, telefono) VALUES (*" . $parametros[0] . "*, *" . $parametros[1] . "*, *" . $parametros[2] . "*, *" . $parametros[3] . "*)', -1);";
		break;			
	case '5':
		$parametros = explode("|", $comando);
		$sql = "DELETE FROM planillasdetalles WHERE idevento=130004 AND idadministrativo=" . $parametros[0] . " AND id<" . $parametros[1];
		break;
	case '6':
		$parametros = explode('|', $comando);
		$ids=explode(',', $parametros[3]);
		$n=count($ids);
		$sql = "INSERT INTO planillasdetalles (idterminal, idevento, idadministrativo, idarticulo) VALUES ";
		for ($i=0; $i<$n; $i++) {
			if ($i==0) {
				$sql .= "($parametros[0], 130004, $parametros[2], $ids[$i])";
			} else {
				$sql .= ",($parametros[0], 130004, $parametros[2], $ids[$i])";
			}
		}		 
		break;
	case '7':
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO registros(registro, origen) VALUES ('DELETE FROM planillasdetalles WHERE idevento=130004 AND idadministrativo=" . $parametros[0] . " AND id<" . $parametros[1] . "', " . $parametros[2] . ")";
		break;
	case '8':
		$parametros = explode("|", $comando);
		$sql = "DELETE FROM planillasdetalles WHERE idarticulo=" . $parametros[0] . " AND idadministrativo=" . $parametros[1] . " AND idevento=130004";
		break;
	case '9':
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO registros(registro, origen) VALUES ('DELETE FROM planillasdetalles WHERE idevento=130004 AND idadministrativo=" . $parametros[1] . " AND idarticulo=" . $parametros[0] . "', " . $parametros[2] . ")";
		break;
	case '10':
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO dos (idte, idev, idad, idcss, idima, do) VALUES (" . $parametros[0] . ", 139007, " . $parametros[1] . ", " . $parametros[2] . ", " . $parametros[3] . ", '" . $parametros[4] . "')";
		break;
	case '11':
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO dos (idte, idev, idad, idcss, idima, do) VALUES (" . $parametros[0] . ", 139005, " . $parametros[1] . ", " . $parametros[2] . ", " . $parametros[3] . ", '" . $parametros[4] . "')";
		break;
	case '12':
		$parametros = explode("|", $comando);
		$sql = "UPDATE articulos SET " . $parametros[1] . "='" . $parametros[2] . "' WHERE id=" . $parametros[0];
		break;
	case '13':
		$parametros = explode(",", $comando);
		$sql = "INSERT INTO articulos (referencia, no, precioa, preciob, precioc, preciod, idiva, espesado, idretefuente, caxpr, alias) VALUES ('" . $parametros[0] . "', '" . $parametros[1] . "', '" . $parametros[2] . "', '" . $parametros[3] . "', '" . $parametros[4] . "', '" . $parametros[5] . "', '" . $parametros[6] . "', '" . $parametros[7] . "', '" . $parametros[8] . "', '" . $parametros[9] . "', '" . $parametros[10] . "')";
		break;
	case '14':
		$parametros = explode("|", $comando);
		$sql = "INSERT INTO articuloskardexpropond (idterminal, idevento, idadministrativo, idarticulo, cantidad) VALUES (" . $parametros[0] . ", 140005, " . $parametros[1] . ", " . $parametros[2] . ", '" . $parametros[3] . "')";
		break;
	case '15':
		$parametros = explode(",", $comando);
		$sql = "UPDATE articulos SET referencia='" . $parametros[0] . "' , no='" . $parametros[1] . "', precioa='" . $parametros[2] . "', preciob='" . $parametros[3] . "', precioc='" . $parametros[4] . "', preciod='" . $parametros[5] . "', idiva=" . $parametros[6] . ", espesado=" . $parametros[7] . ", idretefuente=" . $parametros[8] . ", caxpr=" . $parametros[9] . ", alias='" . $parametros[10] . "' WHERE id=" . $parametros[11];
		break;
	case '16':
		$parametros = explode(",", $comando);
		$sql = "UPDATE terceros SET no='" . $parametros[1] . "' WHERE id=" . $parametros[0];
		echo $sql;
		break;
	case '17':
		$parametros = explode(",", $comando);
		$sql = "UPDATE terceros SET direccion='$parametros[1]', telefono='$parametros[2]' WHERE id=$parametros[0]";
		echo $sql;
	break;
	case '101':
		$parametros = explode(",", $comando);
		$sql = "UPDATE $parametros[0] SET $parametros[1]='$parametros[2]' WHERE id=$parametros[3]";
	break;
	case '13050310':
		$parametros = explode(",", $comando);
		$sql = "INSERT INTO terceros (nit, no, direccion, telefono, email, cu, teca, esproveedor, escliente, espersonajuridica, escontribuyenteiva, esnoresponsable, escontribuyenteespecial, esgrancontribuyente, esestatal, esagentederetencion, esreteiva, esautoretenedor, esinformanteexogena, esusuarioaduanero, escontribuyentemenoresingresos, esasalariado, esindependiente, esextranjero, estransportadorinternacional)
			VALUES($comando)";
	break;
	case '13050710':
		$parametros = explode(",", $comando);
		$sql = "INSERT INTO us (no, co, idli) VALUES ('$parametros[0]', '$parametros[1]', $parametros[2])";
	break;
	case '13050711':
		$parametros = explode(",", $comando);
		$sql = "INSERT INTO usuarios VALUES (0, $parametros[0], '$parametros[1]', '$parametros[2]', $parametros[3], 1)";
	break;
	case '13050712':
		$parametros = explode(",", $comando);
		$sql = "DELETE FROM usev WHERE idus=$parametros[0];";		
		for ( $i = 1; $i <= count($parametros) - 2; $i ++ ) {			
			$sql.= "INSERT INTO usev VALUES (NULL, $parametros[0], $parametros[$i], CURDATE());";			
		}		
		$multiple = true;
	break;
	case '13050799':
		$parametros = explode("|", $comando);
		$sql = "UPDATE movimientos SET saldo='$parametros[1]', modificado=modificado WHERE id=$parametros[0];";
	break;
	default:
		# code...
		break;
}
//echo $sql;
$conn = new mysqli($servername, $username, $password, $bada);
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 
if ( $multiple )  {
	if (!$conn->multi_query($sql)) {
    	echo "nada";
	} else {
		echo $sql;
	}
} else {
	if ($conn->query($sql) === TRUE) {
    	$last_id = $conn->insert_id;    
    	echo $last_id;
	} else {
    	echo "nada";
	}	
}
$conn->close();
?>