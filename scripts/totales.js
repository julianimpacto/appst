function Totales() {	
}

Totales.prototype.DetermineTotales = function(ArrayList, IdEvento, IdReferenciado, DatosConexos, EviteSeñalarAlNuevo) {
  	switch ( IdEvento ) {
  		case 130508: case 130509:
  			return DetermineTotalesDeLaActualizacionDeCreditoDePersonas(ArrayList, IdEvento, IdReferenciado);
  			break;
		case 414019:			
			return dt414019(ArrayList, IdEvento);
			break;
  	}
};

function dt414019(array, idevento) {
	var douTotal = 0;
	for ( var i = 0; i < arlFilas.length-1 ; i ++ ) {		
		//var douPrecio = ProceseValor(document.getElementById('lstplanilla').rows[i].cells[4].innerText);
		arlFilas[i][4] = ProceseValor(arlFilas[i][2]) * ProceseValor(arlFilas[i][3]);
		douTotal += arlFilas[i][4];
	}
	var arlRetorno = new Array();
	arlRetorno.push(['Total', douTotal]);
	return arlRetorno;
}

function DetermineTotalesDeLaActualizacionDeCreditoDePersonas(array, idevento, niveldelusuario) {
	var douSaldo = 0;
	var douAbonos = 0;
	var douPrestamos = 0;
	var douCargos = 0;
	var douOtros = 0;
	var douSaldoActualizado = 0;
	var intCantidadAbonos = 0;
	var intMorosos = 0;
	var intCuentasDificilCobro = 0;
	var douSaldoDificilCobro = 0;
	var intCuentasEspeciales = 0;
	var douSaldoEspeciales = 0;
	var douSaldoMorosos = 0;
	var intCuentasActivas = 0;
	/*for ( var i = 0; i < array.length; i ++) {
		if ( array[i][10] != 0 || array[i][10] == '-1' ) {
			if ( array[i][10] == -1 ) {
				intCuentasDificilCobro +=1;
				douSaldoDificilCobro += array[i][7];			
			} else {
				intCuentasEspeciales +=1;
				douSaldoEspeciales += array[i][7];
			}
			
		} else {
			douSaldoActualizado += ProceseValor(array[i][7]);
			if ( array[i][6] > 0 ) { intCuentasActivas += 1; }
		}
		if ( array[i][2] != 0 ) {
			douAbonos += ProceseValor(array[i][2]);	
			intCantidadAbonos += 1;		
		}		 			
		douSaldo += ProceseValor(array[i][7]);		
		douPrestamos += ProceseValor(array[i][3]);
		douCargos += ProceseValor(array[i][4]);		
		douOtros += ProceseValor(array[i][5]);
		if ( Hoy() > Fecha(array[i][9]) ) {
			if ( array[i][9] != '2015-01-01' ) {
				intMorosos += 1;
				douSaldoMorosos += ProceseValor(array[i][7]);	
			}			
		}
	}*/

//PROCESO ALTERNO DE TOTALIZACIÓN
for ( var i = 0; i < array.length; i ++) {
		switch ( array[i][10] ) {			
			case '0': case '-4': case '-5':
				douSaldoActualizado += ProceseValor(array[i][7]);
				if ( array[i][6] > 0 ) { intCuentasActivas += 1; }
			break;
			case '-1':
				intCuentasDificilCobro +=1;
				douSaldoDificilCobro += array[i][7];
				douSaldoActualizado += ProceseValor(array[i][7]);
			break;
			case '-2': 
				intCuentasEspeciales +=1;
				douSaldoEspeciales += array[i][7];
				douSaldoActualizado += ProceseValor(array[i][7]);
			break;
			case '-3':
				intCuentasEspeciales +=1;
				douSaldoEspeciales += array[i][7];				
			break;
		}		
		if ( array[i][2] != 0 ) {
			douAbonos += ProceseValor(array[i][2]);	
			intCantidadAbonos += 1;		
		}		 			
		douSaldo += ProceseValor(array[i][7]);		
		douPrestamos += ProceseValor(array[i][3]);
		douCargos += ProceseValor(array[i][4]);		
		douOtros += ProceseValor(array[i][5]);
		if ( Hoy() > Fecha(array[i][9]) ) {
			if ( array[i][9] != '2015-01-01' ) {
				intMorosos += 1;
				douSaldoMorosos += ProceseValor(array[i][7]);	
			}			
		}
	}



	var arlRetorno = new Array();
	arlRetorno.length = 0;
	arlRetorno.push(['Seguros', douOtros]);	
	arlRetorno.push(['Cantidad de abonos', intCantidadAbonos]);	
	arlRetorno.push(['Abonos', douAbonos]);
	arlRetorno.push(['Préstamos', douPrestamos]);
	arlRetorno.push(['Base del día', 0]);
	arlRetorno.push(['Recuperación de la cartera', douAbonos - douPrestamos]);
		arlRetorno.push(['Cantidad de cuentas de difícil cobro', intCuentasDificilCobro]);		
		arlRetorno.push(['Saldo de difícil cobro', douSaldoDificilCobro]);
		arlRetorno.push(['Cantidad de cuentas especiales', intCuentasEspeciales]);
		arlRetorno.push(['Saldo de cuentas especiales', douSaldoEspeciales]);
		arlRetorno.push(['Cantidad de clientes', array.length - intCuentasDificilCobro]);
		arlRetorno.push(['Cantidad de cuentas activas', intCuentasActivas]);
		arlRetorno.push(['Intereses', douCargos]);	
	if (niveldelusuario == 6) {
		
		arlRetorno.push(['Saldo actualizado de la lista', douSaldoActualizado]);
	}

	/*arlRetorno.push(['Saldo total en la lista', douSaldo]);	
	arlRetorno.push(['Préstamos/Cargos', douPrestamos/douCargos]);	
	arlRetorno.push(['Cantidad de morosos', intMorosos]);
	arlRetorno.push(['Saldo de los morosos', douSaldoMorosos]);*/
	
	return arlRetorno;
}