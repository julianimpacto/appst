<?php
$servername = "localhost";
$username = "root";
$password = "bandband";
$q = $_REQUEST["q"];
$partes = explode(";", $q);
$bada = $partes[0];
if ( $bada == 'codex' ) { $password = 'bandband'; $username = 'root'; }
$codconsulta = $partes[1];
$consulta = $partes[2];
$devuelvanombredelascolumnas = $partes[3];
// Create connection
$conn = new mysqli($servername, $username, $password, $bada);

// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
}
switch ($codconsulta) {
	case '1':
		$sql = 'SELECT idplti FROM sipltiev WHERE idev=' . $consulta;
		break;
	case '2':
		$sql = 'SELECT id FROM sipl WHERE idsiplti=' . $consulta . ' ORDER BY id DESC LIMIT 1';
		break;
	case '3':
		$sql = "SELECT id, nocol, ancol, (SELECT esnu FROM siplop WHERE id=idsiplop) as idsiplop FROM siplde WHERE idsipl=" . $consulta . " ORDER BY nucol";
		break;
	case '4':
		$sql = "SELECT id, nocol, ancol, esnu FROM siplop WHERE idsiplti=" . $consulta . " ORDER BY id";
		break;	
	case '7':
		$sql = "SELECT saldo FROM movimientos WHERE subcuenta=139001 AND auxiliar=" . $consulta . " ORDER BY id DESC LIMIT 1";
		break;
	case '8':

		break;
	case '9':
		$parametros = explode("|", $consulta);		
		$sql = "SELECT idadministrativo FROM eventosocurrencias WHERE idterminal=" . $parametros[0] . " AND idevento=" . $parametros[1] . " ORDER BY id DESC LIMIT 1";
		break;
	case '10':
		$sql = "SELECT naturaleza FROM sistemapuc WHERE subcuenta=" . $consulta;
		break;
	case '11':
		$parametros = explode("|", $consulta);		
		$sql = "SELECT saldo FROM movimientos WHERE subcuenta=" . $parametros[0] . " AND auxiliar=" . $parametros[1] . " ORDER BY id DESC LIMIT 1;";		
		break;
	case '12':
		$sql = "SELECT no, telefono, direccion FROM terceros WHERE id=$consulta";
		break;
	case '13':
		$sql = "SELECT DATE_FORMAT(mov.modificado, '%Y-%c-%d %h:%i %p'), ev.ev, mov.valor, mov.saldo, mov.id
				FROM movimientos AS mov, eventos AS ev 
				WHERE mov.auxiliar=$consulta
					AND (mov.subcuenta=137010 OR mov.subcuenta=139001)
					AND ev.id=mov.idevento
				ORDER BY mov.id DESC
				LIMIT 60";
		break;
	case '14':
		$sql = "SELECT idcss, idima FROM sidoim WHERE id=140002";
		break;
	case '15':
		$sql = "SELECT idevento FROM eventosocurrencias WHERE idevento IN (904201, 904202) ORDER BY id DESC LIMIT 1";
		break;
	case '16':
		$sql = "SELECT id, no FROM li WHERE no LIKE '%" . $consulta . "' ORDER BY no";
		break;
	case '17':
		$sql = "SELECT 0, ar.id, ar.no, ar.precioa, ar.preciob, ar.precioc, ar.preciod, ar.modificado
                FROM articulos AS ar, li, lide
                WHERE li.id=$consulta
               		AND lide.idli=li.id
               		AND ar.id=lide.idar
               	ORDER BY lide.orden";
        break;
    case '18':
    	$sql = "SELECT no FROM articulos WHERE referencia='" . $consulta . "'";    	
    	break;
    case '19':
		$sql = "SELECT 0, ar.id, ar.no, ar.precioa, ar.preciob, ar.precioc, ar.preciod, ar.modificado " .
               "FROM articulos AS ar " .
               "WHERE referencia='" . $consulta . "' " .
               "LIMIT 30";
        break;
    case '20':    			
		$strTextoInteligente = "ar.no LIKE '";
		for ( $i = 0; $i < strlen($consulta); $i ++ ) {
			if ( substr($consulta, $i, 1) == " " ) {
				$strTextoInteligente .= "% ";
			} else {
				$strTextoInteligente .= substr($consulta, $i, 1);
			}
		} 
		$strTextoInteligente .= "%' ";
    	$sql = "SELECT 0, ar.id, ar.no, ar.precioa, ar.preciob, ar.precioc, ar.preciod, ar.modificado " .
               "FROM articulos AS ar " .
               "WHERE " . $strTextoInteligente .
               " OR referencia = '" . $consulta .
               "' LIMIT 30";               
        break;
	case '21':
		$strTextoInteligente = "ar.no LIKE '";
		for ( $i = 0; $i < strlen($consulta); $i ++ ) {
			if ( substr($consulta, $i, 1) == " " ) {
				$strTextoInteligente .= "% ";
			} else {
				$strTextoInteligente .= substr($consulta, $i, 1);
			}
		} 
		$strTextoInteligente .= "%' ";
		$sql = "SELECT 0, ar.id, ar.no, (SELECT scantidad FROM articuloskardexpropond WHERE idarticulo=ar.id ORDER BY id DESC LIMIT 1) AS existencias, 0, 0, (SELECT costo FROM articuloskardexpropond WHERE idarticulo=ar.id ORDER BY id DESC LIMIT 1) AS costo , 0, 0 FROM articulos AS ar WHERE " . $strTextoInteligente .
            " OR referencia = '" . $consulta .
            "' LIMIT 30";
	break;
	case '22':
	$strTextoInteligente = "ar.no LIKE '";
		for ( $i = 0; $i < strlen($consulta); $i ++ ) {
			if ( substr($consulta, $i, 1) == " " ) {
				$strTextoInteligente .= "% ";
			} else {
				$strTextoInteligente .= substr($consulta, $i, 1);
			}
		} 
		$strTextoInteligente .= "%' ";
		$sql = "SELECT 0, ar.id, ar.no, (SELECT scantidad FROM articuloskardexpropond WHERE idarticulo=ar.id ORDER BY id DESC LIMIT 1) AS existencias, 0, 0, (SELECT costo FROM articuloskardexpropond WHERE idarticulo=ar.id ORDER BY id DESC LIMIT 1) AS costo , 0, 0 FROM articulos AS ar WHERE ar.referencia='" . $consulta . "'";
    break;
    case '23':
    	$sql = "SELECT 0, ar.id, ar.no, (SELECT scantidad FROM articuloskardexpropond WHERE idarticulo=ar.id ORDER BY id DESC LIMIT 1) AS existencias, 0, 0, (SELECT costo FROM articuloskardexpropond WHERE idarticulo=ar.id ORDER BY id DESC LIMIT 1) AS costo , 0, 0 FROM articulos AS ar WHERE idarticulo=ar.id ORDER BY id DESC LIMIT 1) AS existencias " .
               "FROM articulos AS ar, li, lide " .
               "WHERE li.id=" . $consulta . " " .
               "AND lide.idli=li.id " .
               "AND ar.id=lide.idar";
    break;
	case '24':
		$sql = "SELECT referencia, no, precioa, preciob, precioc, preciod, idiva, espesado, idretefuente, caxpr, alias FROM articulos WHERE id=" . $consulta;
	break;
	case '25':
		$parametros = explode("|", $consulta);
		$sql = "SELECT $parametros[0] FROM $parametros[1] WHERE $parametros[2] ='$parametros[3]'";
	break;
	case '26':
		$parametros = explode("|". $consulta);
    	$sql = "SELECT no FROM articulos WHERE referencia='" . $parametros[0] . "' AND NOT id=" . $parametros[1];    	
    	break;
	case '27':
		$sql = "SELECT referencia, no, precioa, preciob, precioc, preciod, idiva, espesado, idretefuente, caxpr, alias, id FROM articulos WHERE referencia='" . $consulta . "'"; 
		break;	
	case '28':
		$sql = "SELECT nu FROM veheon WHERE ti=1 ORDER BY id DESC LIMIT 1";
		break;
	case '29':
		$parametros = explode("|", $consulta);
	$sql = "SELECT c1, idpersona, persona, abono, prestamo, interes, cargo, 
	saldoactual-prestamo-interes-cargo+abono as saldoanterior,saldoactual,
	fecha1,fecha2,clase,abonoanterior,c14,c15,c16,c17,c18,marcado
	FROM (
		SELECT 0 AS c1, p.idarticulo AS idpersona, t.no AS persona, e.abono, 
		e.prestamo, e.interes, e.cargo, m.saldo AS saldoactual, 0 AS c9, f1 AS fecha1, 
		f2 AS fecha2,
			t.coesco AS clase,
			COALESCE((SELECT valor1 FROM eventosocurrencias WHERE id=e.v6), 0) AS abonoanterior,
			COALESCE((SELECT valor1 FROM eventosocurrencias WHERE id=e.v7), 0) AS c14,
			COALESCE((SELECT valor1 FROM eventosocurrencias WHERE id=e.v8), 0) AS c15,
			COALESCE((SELECT valor1 FROM eventosocurrencias WHERE id=e.v9), 0) AS c16,
			COALESCE(t.telefono, 0) AS c17, m.id AS c18, p.id AS pid, t.esreteica as marcado
		FROM terceros t, planillasdetalles AS p,
			(SELECT idtercero, 
				SUM(IF(idevento IN(139006, 137011) AND fecha1=CURDATE(), valor1, 0)) AS abono,
				SUM(IF(idevento IN(137010, 139001) AND fecha1=CURDATE(), valor1, 0)) AS prestamo,
				SUM(IF(idevento = 421005 AND fecha1=CURDATE(), valor1, 0)) AS interes,
				SUM(IF(idevento = 421055 AND fecha1=CURDATE(), valor1, 0)) AS cargo,
				MAX(IF(idevento IN(137010, 137011, 139001, 139006), fecha1, '2015-01-01')) AS f1,
				MAX(IF(idevento IN(137010, 421005), fecha2, '2015-01-01')) AS f2,				
				MAX(IF(idevento = 137011 AND modificado<CURDATE(), id, 0)) AS v6,
				MAX(IF((idevento = 137010 OR idevento=139006) AND modificado<CURDATE(), id, 0)) AS v7,
				MAX(IF(idevento = 421005 AND modificado<CURDATE(), id, 0)) AS v8,
				MAX(IF(idevento = 421055 AND modificado<CURDATE(), id, 0)) AS v9
			FROM eventosocurrencias
			GROUP BY idtercero) e,
			(SELECT m.id, m.saldo, m.auxiliar
        	FROM movimientos m,
            	(SELECT MAX(id) AS id
            	FROM movimientos 
            	WHERE (subcuenta=137010 OR subcuenta=139001)
            	GROUP BY auxiliar) mf
        	WHERE m.id = mf.id) m
		WHERE t.id = e.idtercero
			AND p.idevento=130004
			AND t.id=p.idarticulo
			AND p.idadministrativo=$parametros[0]
			AND m.auxiliar = t.id
		UNION
		SELECT 0, t.id , t.no, 0, 0, 0, 0, 0, 0, '01/01/2015 00:00:00', '01/01/2015 00:00:00', clase, 0, 0, 0, 0, t.telefono, 0, t.pid, t.esreteica
		FROM (SELECT t.id AS id, t.no AS no, t.telefono AS telefono, p.id AS pid, t.coesco AS clase, t.esreteica
			FROM terceros t,
				planillasdetalles AS p
			WHERE p.idevento = 130004
				AND p.idadministrativo=$parametros[0]
				AND t.id = p.idarticulo) t
		WHERE NOT t.id IN (SELECT auxiliar FROM movimientos WHERE subcuenta IN (137010, 139001) GROUP BY auxiliar)) dt
	ORDER BY dt.pid";
		break;
	case '2901':
		$sql = "SELECT COALESCE((SELECT 1 FROM eventosocurrencias WHERE (idevento=137011) AND idtercero=te.id AND modificado>CURDATE() ORDER BY id DESC lIMIT 1), 0)
				FROM planillasdetalles AS pd, terceros AS te 
				WHERE pd.idevento=130004 	
					AND te.id=pd.idarticulo
					AND pd.idadministrativo=$consulta
				ORDER BY pd.id";
	break;
	case '30':
		$parametros = explode("|", $consulta);
		$sql = "SELECT (registreeventosimple(" . $parametros[0] . ", " . $parametros[1] . ", " . $parametros[2] . ", '" . $parametros[3] . "', '" . $parametros[4] . "', '" . $parametros[5] . "', '" . $parametros[6] . "', '" . $parametros[7] . "', '" . $parametros[8] . "', '" . $parametros[9] . "', " . $parametros[10] . ")) AS Ocurrencia;";
	break;
	case '31':
		$sql = "SELECT idevento
				FROM eventosocurrencias
				WHERE idevento IN (904201, 904202)
					AND idtercero=$consulta
				ORDER BY id DESC 
				lIMIT 1";
	break;
	case '32':
		$sql = "SELECT verifiquesaldo($consulta)";
  	break;
	case '41401905':
		$sql = "SELECT COALESCE((SELECT id 
								 FROM eventosocurrencias 
								 WHERE idevento=414019
				 					AND idtercero=$consulta
				 					AND valor3=10 AND fecha1>=CURDATE()), 904201)";
	break;
	case '111':
		$par = explode("|", $consulta);
		 $sql = "SELECT do AS Documento
				FROM dos 
				WHERE  idev=$par[0] 
					AND idad=$par[1] 
					AND idte=$par[2]";
	break;
	case '13050501':
		$part = explode("|", $consulta);
		$sql = "SELECT il.pr, il.vi, il.bada, il.lo, il.id, il.idcrac, teil.il, teil.teid FROM te, teil, il WHERE te.ni='$part[0]' AND te.co='$part[1]' AND te.ni=teil.ni AND il.id=teil.il;";
		/*if ( $ilteid == "nada") {
			echo "nada";
			return;
		}
		$datos = explode("|", $ilteid);
		"*/
	break;
	case '1305070201':		
		$sql = "SELECT id
				FROM terceros
				WHERE nit = '$consulta'";
	break;
	case '1305070202':
		$sql = "SELECT count(*)
				FROM usuarios
				WHERE no = '$consulta'";
	break;
	case '13050903':
		$parametros = explode("|", $consulta);
		$sql = "SELECT te.id, te.no,                   		
                    COALESCE((SELECT SUM(valor1) FROM eventosocurrencias WHERE idevento IN(139006, 137011) AND idtercero=te.id AND fecha1=CURDATE()), 0), 
	                COALESCE((SELECT SUM(valor1) FROM eventosocurrencias WHERE idevento IN(137010) AND idtercero=te.id AND fecha1=CURDATE()), 0),                    
	                COALESCE((SELECT SUM(valor1) FROM eventosocurrencias WHERE idevento=421005 AND idtercero=te.id AND fecha1=CURDATE()), 0),
	                COALESCE((SELECT SUM(valor1) FROM eventosocurrencias WHERE idevento=421055 AND idtercero=te.id AND fecha1=CURDATE()), 0),
	                COALESCE((SELECT saldo FROM movimientos WHERE (subcuenta=137010 OR subcuenta=139001) AND auxiliar=te.id AND modificado<CURDATE() ORDER BY id DESC LIMIT 1), 0), 
                    0,                    
                    COALESCE((SELECT fecha1 FROM eventosocurrencias WHERE idevento IN(137010, 137011, 139006) AND idtercero=te.id ORDER BY id DESC LIMIT 1), '2015-01-01'),
                    COALESCE((SELECT fecha2 FROM eventosocurrencias WHERE idevento IN(137010) AND idtercero=te.id ORDER BY id DESC LIMIT 1), '2015-01-01'),                    
					COALESCE((SELECT valor1 FROM eventosocurrencias WHERE idevento=130510 AND idtercero=te.id ORDER BY id DESC LIMIT 1), 0)
                FROM terceros AS te 
                WHERE te.id=" . $parametros[0];                        
	break;
	case '13050906':
		$sql = "SELECT modificado FROM eventosocurrencias WHERE idtercero=$consulta AND ideventocausante IN(137010, 137011, 139001, 139006, 421005, 421055) AND modificado>CURDATE() ORDER BY id lIMIT 1";
	break;
	case '13050907':
		$sql = "SELECT eo.idtercero, us.contrasena
				FROM eventosocurrencias AS eo, usuarios AS us
				WHERE eo.idevento=130010 AND eo.idtercero<>2 AND eo.valor1='$consulta' AND us.id=eo.idtercero";
	break;
	case '13050908':
		$parametros = explode("|", $consulta);
		$sql = "SELECT recontralista($parametros[0], $parametros[1], '$parametros[2]');";
	break;
	case '13050911':
		$sql = "SELECT te.no
				FROM 	terceros AS te, (SELECT idtercero AS idnuevo
										FROM eventosocurrencias
										WHERE fecha1=CURDATE()
											AND idevento=130503) AS nuevos,	
						planillasdetalles AS pd
				WHERE te.id=nuevos.idnuevo
					AND pd.idarticulo=te.id
					AND pd.idevento=130004
					AND pd.idadministrativo=$consulta";
	break;	
	case '413594':
		$sql = "SELECT 	0,
							ca.no AS Caja,
							ca.prefijo AS Prefijo,
							COALESCE((SELECT valor1 FROM eventosocurrencias WHERE idevento=413594 AND (idterminal=ca.id OR idtercero=ca.id) ORDER BY id DESC LIMIT 1), 1),
							COALESCE((SELECT valor2 FROM eventosocurrencias WHERE idevento=413594 AND (idterminal=ca.id OR idtercero=ca.id) ORDER BY id DESC LIMIT 1), 1),
							COALESCE((SELECT fecha1 FROM eventosocurrencias WHERE idevento=413594 AND (idterminal=ca.id OR idtercero=ca.id) ORDER BY id DESC LIMIT 1), CURDATE()),
							COALESCE((SELECT fecha2 FROM eventosocurrencias WHERE idevento=413594 AND (idterminal=ca.id OR idtercero=ca.id) ORDER BY id DESC LIMIT 1), CURDATE())
					FROM cajas AS ca";
	break;
	case '414019':
		$parametros = explode("|", $consulta);
		$sql = "SELECT pd.cantidad, pd.comentario
				FROM planillasdetalles AS pd, eventosocurrencias AS eo
				WHERE eo.valor3=10 AND eo.fecha1 >= CURDATE()
					  AND eo.idevento=414019
					  AND eo.idtercero=$parametros[0] 
					  AND pd.idevento=414019 
					  AND pd.idadministrativo=eo.idadministrativo
					  AND pd.idarticulo=$parametros[1]
				ORDER BY pd.id DESC
				LIMIT 1";
	break;
	case '414020':
		$sql = "SELECT 0, 0, lide.idar, ar.no, 0, 0, 0, 0
				FROM li, lide, articulos AS ar
				WHERE li.id=$consulta
					AND lide.idli=li.id
					AND ar.id=lide.idar
				ORDER BY lide.orden";
	break;
	case '41402001':
		$sql = "SELECT pd.id, pd.idarticulo
				FROM eventosocurrencias AS eo, planillasdetalles AS pd
				WHERE eo.id=$consulta
					AND pd.idterminal=eo.idterminal
					AND pd.idevento=eo.idevento
					AND pd.idadministrativo=pd.idadministrativo";
	break;
	case '414021':
		$sql = "SELECT MAX(id) 
				FROM eventosocurrencias
				WHERE idevento=414020 AND idtercero=$consulta";
	break;
	case '13000603':
		$sql = "SELECT te.id, te.no, teca.no, LEFT(te.cu, 10)
				FROM terceros AS te, teca
				WHERE te.nit='$consulta'
				 	AND teca.id=te.teca";
	break;
	case '13000604':
		$sql = "SELECT te.id, te.no, teca.no, LEFT(te.cu, 10)
				FROM terceros AS te, teca
				WHERE te.id='$consulta'
				 	AND teca.id=te.teca";
	break;
	case '13000606':
		$parametros = explode("|", $consulta);
		$sql = "SELECT (SELECT dp.no FROM articulosdepartamentos dp where dp.id=ar.iddepartamento) AS Estilista,
				te.no as Tercero, 
				ar.no AS Servicio, 
				ev.Idterminal, 
				ev.idevento, 
				ev.idadministrativo,
				LEFT(ev.fecha1,10) AS 'Fecha de Reserva', 
				RIGHT((ev.fecha1),8) AS Hora
				FROM eventosocurrencias ev,articulos ar,terceros te,eventos e 
				WHERE ev.idevento = e.id 
				AND ev.valor2=0 
				AND ev.idevento='130006' 
				AND te.id=ev.idtercero 
				AND ev.valor1=ar.id 
 				AND ev.Fecha1 BETWEEN '$parametros[1]' AND '$parametros[1] 23:59:59' 
 				AND ar.iddepartamento=(SELECT dp.id FROM articulos ar, articulosdepartamentos dp WHERE dp.id=ar.iddepartamento AND ar.referencia='$parametros[0]')
				ORDER BY Estilista,ev.fecha1";
	break;
	case '13000607':
		$sql = "SELECT id, no FROM articulos WHERE referencia='$consulta'";
	break;
	case '100000':
		$parametros = explode("|", $consulta);
		$campos = $parametros[0];
		$nombretabla = $parametros[1];
		$campocondicion = $parametros[2];
		$condicion = $parametros[3];
		$orden = $parametros[4];
		$limite = $parametros[5];
		if ( $campos == "" ) { $campos = '*'; }
		if ( $nombretabla == "" ) { $nombretabla = 'articulos'; }
		if ( $campocondicion == "" ) { $campocondicion = 'id'; }		
		if ( $condicion <> "" ) {
			$pos = strrpos($condicion, "-");
			if ($pos === false) { 
				$condicion = "WHERE $campocondicion='$condicion'";
			} else {
				$strTextoInteligente = "WHERE $campocondicion LIKE '%";
				For ($i = 1; $i <= strlen($condicion) -1 ; $i++ ) {
					If (substr($condicion, $i, 1) == " ") {
        				$strTextoInteligente .= "% ";
    				} Else {
     					$strTextoInteligente .= substr($condicion, $i, 1);
    				}
				}
				if (substr($strTextoInteligente, -1) != "%" ) { $strTextoInteligente .= "%"; }
				$strTextoInteligente .= "'";
				$condicion = $strTextoInteligente;
			}		
		}
		
		if ( $orden == "" ) { $orden = 'id'; }
		if ( $limite == "" ) { 
			$limite = ''; 
		} else {
			$limite = "LIMIT $limite";
		}
		$sql = "SELECT $campos FROM $nombretabla $condicion ORDER BY $orden $limite";				
	break;
}
//echo $sql;

$result = $conn->query($sql);

if ($result->num_rows > 0) {						
	$numfilas=mysqli_num_rows($result);
	$numcolumnas=mysqli_num_fields($result);

	$info_campo = $result->fetch_fields();	
	if ( $devuelvanombredelascolumnas == 'true' ) {
		$col = 0;
		foreach ($info_campo as $valor) {            
            if ( $col == 0 ) {
				echo $valor->name;
			} else {
				echo "|" . $valor->name;
			}
			$col ++;
        }
        echo ";";
    }
    $k = 0;
	while($row=mysqli_fetch_array($result)) {			
		$k++;
		for ($j=0; $j<$numcolumnas; $j++ ) {
			if ($j==0) {
				echo $row[$j];
			} else {
				echo utf8_decode("|" . $row[$j]);
			}			
		}	
		if ($k<$numfilas) { echo ";"; }		
	}		
} else {
	echo 'nada';
}	
$conn->close();
?>