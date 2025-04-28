function Funcionario() {  
}

Funcionario.prototype.EnlisteEnEmplanillados = function(Lista, IdEvento, IdReferenciado, DatosConexos, EviteSeñalarAlNuevo) {
  var booYaEstaba = false;
  var intLugar = 0;
  for (var i = 0; i < Lista.rows.length; i ++) {
    if (Lista.rows[i].getAttribute('tag') == IdEvento + IdReferenciado) { 
      booYaEstaba = true; 
      intLugar = i;
    }
  }
  if ( !booYaEstaba ) {	
    var lviEnlistadoNuevo = Lista.insertRow(Lista.rows.length);
	for ( var i = 0; i < Lista.rows.length - 1; i ++ ) {
		Lista.rows[i].cells[0].setAttribute('style', 'color: rgb(180, 180, 180);');	
		Lista.rows[i].cells[1].setAttribute('style', 'color: rgb(180, 180, 180);');	
	}
	lviEnlistadoNuevo.setAttribute('id', 'ta' + IdEvento + IdReferenciado);
    lviEnlistadoNuevo.setAttribute('tag', IdEvento + IdReferenciado);    	
    lviEnlistadoNuevo.setAttribute('onclick', 'lstTareas_Click(this, event);');    
    var arlEvento = Funcionario1.BusqueEnArray(dwEventos, 0,  IdEvento);
    var arlNombre = new Array(); arlNombre.length = 0;
    switch (IdEvento) {
      case '101305':
      	arlNombre.push('Mi cuenta');
      break;
      case '130509': case '140001': case '140003': case '140009': case '140002': case '414019': case '414020': case '700500':
        arlNombre.push(document.getElementById('txtReferenciado').value);
      break;
	  case '130006':
		arlNombre.push('Cita Nueva');
	  break;
	  case '130503':
		arlNombre.push('Persona Nueva');
	  break;
	  case '130507':
		arlNombre.push('Usuario Nuevo');
	  break;
      case '140005': case '140010':
        arlNombre.push('Ajuste Nuevo');
      break;
    }
    var celTexto = lviEnlistadoNuevo.insertCell(0);
    celTexto.innerHTML = arlEvento[0][1];
    var celSubItem1 = lviEnlistadoNuevo.insertCell(1);
    celSubItem1.innerHTML = arlNombre[0];    
	lviEnlistadoNuevo.cells[0].setAttribute('style', 'color: rgb(255, 255, 255);');
	lviEnlistadoNuevo.cells[1].setAttribute('style', 'color: rgb(255, 255, 255);');
	var celElimnar = lviEnlistadoNuevo.insertCell(2);
	celElimnar.innerHTML = '<img style="background-color: rgb(41,100,171);" src="imagenes/eliminar.png" fila=' + IdEvento + IdReferenciado + ' onclick="eliminartarea(1, ' + (IdEvento + IdReferenciado) + ');" />';
    lstTareas_Click(lviEnlistadoNuevo, DatosConexos);        	
	
  } else {
    switch ( IdEvento ) { 
      case '140009':
        var lviEnlistado = Lista.rows[intLugar];
        lstTareas_Click(lviEnlistado, DatosConexos);        
      break;
    }
  }
  return DatosConexos;
};

Funcionario.prototype.BusqueEnArray = function(arraybusqueda, columnadebusqueda, busqueda) {
  var booSi = false;
  var arlBusqueda = arraybusqueda;
  var arlRetorno = [];
  arlRetorno.length = 0;
  for ( var i = 0; i < arlBusqueda.length; i ++ ) {
    if ( arlBusqueda[i][columnadebusqueda].toLowerCase().search(busqueda) != -1 ) {
      arlRetorno.push(arlBusqueda[i]);
    }
  }
  return arlRetorno;
};

Funcionario.prototype.ArrayATabla = function(array, clase, id) {
  var strRetorno = '<table class="' + clase + '" id="' + id + '"><tbody>';
  for (var i = 0; i < array.length; i ++) {
    var arlFila = array[i];
    strRetorno += '<tr>';
    for (var j = 0; j < arlFila.length; j ++) {
        if ( IsNumeric(arlFila[j]) ) { 
        	if ( id == 'resumen' ) {
        		if ( j == 4 ) { break; }
        		if ( j == 3 ) {
        			if ( 
        				matUsuario[4] > 5 ) { strRetorno += '<td style="text-align: right;" id="saldo' + arlFila[4] + '" onclick=arreglesaldo(' + arlFila[4] + ') ">' + NumeroFormateado(arlFila[j], 0) + '</td>'; 
        			} else {
        				strRetorno += '<td style="text-align: right;" id="saldo' + arlFila[j] + '" >' + NumeroFormateado(arlFila[j], 0) + '</td>';	
        			} 			
        		} else {
        			strRetorno += '<td style="text-align: right;" id="saldo' + arlFila[j] + '" >' + NumeroFormateado(arlFila[j], 0) + '</td>';
        		}
        	} else {
        		strRetorno += '<td style="text-align: right;">' + NumeroFormateado(arlFila[j], 0) + '</td>';
        	}          
        } else {
          strRetorno += '<td>' + arlFila[j] + '</td>';
        }        
    }
    strRetorno += '</tr>';
  }
  strRetorno += '</tbody></table>';
  return strRetorno;
}

function arreglesaldo(movid) {
	var salnu = prompt('Escriba el saldo', 'appst');
	if ( !IsNumeric(salnu) ) { alert('El sistema no entendió el valor'); return; }
	var Gestor1 = new Gestor();
	var respuesta = Gestor1.Registre("php/registre.php?q=" + strBaDa + ';13050799;' + movid + "|" + salnu);
	if ( respuesta != 0 ) { alert('Saldo arreglado') }
	document.getElementById('saldo' + movid).innerText = salnu;
}

Funcionario.prototype.ArrayATablaEspecial = function(array, clase, id, muprfi, ca, ev) {
	var muprfi = muprfi || true;
	var ca = ca || 'todos';		
	if ( ca != 'todos' ) { 
		var ca = ca.split(",");
	} else {
		ca = array[0];
	}
	var intInicio = 0;
	var strRetorno = '<table class="' + clase + '" id="' + id + '"><tbody>';
	if ( muprfi ) { intInicio = 1; }
	for ( var i = intInicio; i <= array.length -1; i ++ ) {
		strRetorno += FilaHTMLDeVector(array[i], array[0], ca, ev);
	}
	strRetorno += '</tbody></table>';
	return strRetorno;
}

function FilaHTMLDeVector(vector, atributos, ca, ev) {	
	var atributos = atributos || false;
	var strAtributosFila ='<tr Tag="' + vector[0] + '"';	
	var strFila = '';
	for ( var i = 0; i <= atributos.length - 1; i ++ ) {
		strAtributosFila += ' ' + atributos[i] + '="' + vector[i] + '"';			
	}
	strAtributosFila += ' ' + ev;
	for ( var j = 0; j <= ca.length - 1; j ++ ) {
		for ( var k = 0; k <= atributos.length - 1; k ++ ) {
			if ( ca[j].toLowerCase() == atributos[k].toLowerCase() ) { strFila += '<td id="' + atributos[k] + vector[0] + '" ' + atributos[k] + '="' + vector[k] + '">' + vector[k] + '</td>'; }
		}
	}	
	strAtributosFila += '>' + strFila + '</tr>';
	return strAtributosFila;
}

function DigitoNIT(NIT) {
	var sTMP = '';
	var sTMP1 = '';
	var sTMP2 = '';
	var iResiduo = 0;
	var iChequeo = 0;
	var iPrimos = new Array();
	iPrimos.push(0);
	iPrimos.push(3); iPrimos.push(7); iPrimos.push(13); iPrimos.push(17); iPrimos.push(19);
    iPrimos.push(23); iPrimos.push(29); iPrimos.push(37); iPrimos.push(41); iPrimos.push(43);
    iPrimos.push(47); iPrimos.push(53); iPrimos.push(59); iPrimos.push(67); iPrimos.push(71);
	for ( var i = 0; i <= NIT.length - 1; i ++ ) {
		sTMP = NIT.substr(NIT.length - i - 1, 1);
		iChequeo = iChequeo + parseInt(sTMP) * iPrimos[i + 1];
	}
	iResiduo = iChequeo%11;
	if ( iResiduo <= 1 ) { return iResiduo; }
	return 11 - iResiduo;
}

function NITValido(NIT) {
	NIT = NIT.trim();
	NIT = TextoNITValido(NIT);	
	if ( NIT.indexOf('-') != -1 ) {
		var matNIT = NIT.split('-');
		if ( matNIT[0].length < 7 ) {
			alert('El NIT, parece muy corto. Escribió: ' + NIT );
			return false;
		}
		if ( matNIT[0].length > 10 ) {
			alert('El NIT, parece muy largo. Escribió: ' + NIT );
			return false;
		}
		if ( !IsNumeric(matNIT[1]) ) { matNIT[1] = matNIT[1].toUpperCase(); } 
		if ( !IsNumeric(matNIT[0]) || (!IsNumeric(matNIT[1]) && matNIT[1].indexOf("V")==-1) )  {
			alert('Por favor, en el NIT, escriba sólo números a lado y lado del guión. Escribió: ' + NIT);
			return false;
		}
		if ( IsNumeric(matNIT[1]) ) {
			if ( parseInt(matNIT[1]) !=  DigitoNIT(matNIT[0]) ) {
				alert('El dígito de verificación, no corresponde al NIT');
				return false;			
			}
		}		
	} else {
		if ( !IsNumeric(NIT) ) {
			alert('Por favor, en el NIT, escriba sólo números. Escribió: ' + NIT);
			return false;
		}
		if ( NIT.length < 6 ) {
			alert('El NIT, parece muy corto. Escribió: ' + NIT );
			return false;
		}
		if ( NIT.length > 10 ) {
			alert('El NIT, parece muy largo. Escribió: ' + NIT );
			return false;
		}		
	}
	return true;
}

function TextoNITValido(Texto) {
	var strCaracteresValidos = '0123456789-Vv';
	var strRetorno = Texto;
	for ( var i = 0; i <= Texto.length - 1; i ++ ) {
		if ( strCaracteresValidos.indexOf(Texto.substr(i, 1)) == -1 ) {	
			if ( i == Texto.length - 2 ) {
				strRetorno = strRetorno.replace(Texto.substr(i, 1), "-");				
			} else {
				strRetorno = strRetorno.replace(Texto.substr(i, 1), '');
			}			
		} 
	}
	return strRetorno;
}