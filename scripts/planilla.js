var intTipo = 0;
var strTag = '';
var booEnCarga = false;
var strHTMLColumnas = '';
var strHTMLFilas = '';
var strHTMLAnterior = '';
var arlFilas = new Array();
var arlVariablesTemporales = new Array();
var argumentosauxiliares = '';

var arlColumnas = new Array();
Columnas.length = 0;

function Planilla() {
}

Planilla.prototype.EtiquetePlanilla = function(etiqueta, argumentos) {
	var argumentos = argumentos || '';
	document.getElementById('plaPlanilla').innerHTML = '';
	intTipo = 0;
	if (etiqueta != '') {
		strTag = etiqueta;
		booEnCarga = true;
		//intTipo = TipoPlanilla(strTag.substring(0, 6));
		intTipo = Funcionario1.BusqueEnArray(dwSiPlTiEv, 2, strTag.substring(0, 6))[0][1];
		document.getElementById('plaPlanilla').setAttribute('tag', intTipo);
		document.getElementById('plaPlanilla').setAttribute('etiqueta', etiqueta);
		arlFilas.length = 0;
		CargueLasColumnas();
		switch (intTipo) {
			case '130006':
				ev130006(1, 1);
			break;
			case '130503':
				reorganiceparatercerosdatos(1, 0);
			break;
			case '130507':
				ev130507(1, 0);
			break;
			case '130508': case '130509':
				//ReorganiceParaActualizacionDeCreditoDePersonas(etiqueta.substring(6));
				ev130509(1, etiqueta.substring(6));
				booEnCarga = false;				
			break;
			case '140001':
				reorganiceparaactualizaciondepreciosenlista('1', etiqueta.substring(6));
			break;			
			case '140003':
				if ( intReferenciado == 0 ) {
					reorganiceparaarticulosdatos('1', intReferenciado);
				} else {
					reorganiceparaarticulosdatos('2', intReferenciado);
				}				
			break;
			case '140009':
				reorganiceparaactualizaciondepreciosenlista('1', argumentos);
			break;
			case '413594':
				ev413594(1, 0);
			break;
			case '414019':
				ev414019(1, 0);
			break;
			case '700500':
				ev700500(1, argumentos);
			break;
		}		
	}
};

function CargueLasColumnas() {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	var Gest = new Gestor();
	var arrSiPl = Gest.DatosDeConsulta(2, intTipo);
	arlColumnas.length = 0;	
	if ( arrSiPl.length != 0 ) {
		arlColumnas = Gest.DatosDeConsulta(3, arrSiPl[0][0]);
	} else {
		arlColumnas = Gest.DatosDeConsulta(4, intTipo)
	}	
	strHTMLColumnas = '<tr>';
	arlColumnas.forEach(Columnas);	
	strHTMLColumnas += '</tr>';
}

function Columnas(item, index) {
	var arlColumna = item;	
	strHTMLColumnas += '<td tag="' + arlColumna[0] + '" style="text-align: Center; color: rgb(240,240,240); background-color: rgb(41,100,171); font-size: 15px;" >' + arlColumna[1] + '</td>';	
}

function reorganiceparaarticulosdatos(paso, argumentos) {
	//var argumentos = argumentos || 0;
	if ( !HayInternet() ) { alert('No está conectado.'); return; }	
	var Gestor1 = new Gestor();	
	switch (paso) {
		case '1':
			arlFilas.length = 0;
			for ( var j = 0; j <= 10; j ++ ) { arlFilas.push(['', '']); }
			var i = -1;			
			i += 1; arlFilas[i][0] = 'referencia'; arlFilas[i][1] = '';
			i += 1; arlFilas[i][0] = 'no'; arlFilas[i][1] = '';
			i += 1; arlFilas[i][0] = 'precioa'; arlFilas[i][1] = 0;
			i += 1; arlFilas[i][0] = 'preciob'; arlFilas[i][1] = 0;
			i += 1; arlFilas[i][0] = 'precioc'; arlFilas[i][1] = 0;
			i += 1; arlFilas[i][0] = 'preciod'; arlFilas[i][1] = 0;
			i += 1; arlFilas[i][0] = 'idiva'; arlFilas[i][1] = 7;
			i += 1; arlFilas[i][0] = 'espesado'; arlFilas[i][1] = 0;
			i += 1; arlFilas[i][0] = 'idretefuente'; arlFilas[i][1] = 1;
			i += 1; arlFilas[i][0] = 'caxpr'; arlFilas[i][1] = 1;
			i += 1; arlFilas[i][0] = 'alias'; arlFilas[i][1] = '';
			if ( argumentos != 0 ) {				
				for ( var i = 0; i < argumentos[0].length - 1; i ++ ) { arlFilas[i][1] = argumentos[0][i]; }
				//intReferenciado = argumentos[0][11];
			}					
			strHTMLFilas = '';			
			//document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';			
			strHTMLFilas += '<tr tag="referencia" id="fila1"><td>Referencia</td><td style="text-align: left;"><input type="text" id="txtReferencia" class="cajacredencial" placeholder="' +  arlFilas[0][1] + '" style="width: 250px;" onblur="actualiceArrayFilas(this,  ' + 1 + ', 1)" value="' +  arlFilas[0][1] + '"></input></td></tr>';			
			strHTMLFilas += '<tr tag="no" id="fila2"><td>Nombre</td><td style="text-align: left;"><input type="text" id="txtNo" class="cajacredencial" placeholder="' +  arlFilas[1][1] + '" style="width: 450px; position: left;" onblur="actualiceArrayFilas(this,  ' + 2 + ', 1)" value="' +  arlFilas[1][1] + '"></input></td></tr>';			
			strHTMLFilas += '<tr tag="precioa" id="fila3"><td>Precio A</td><td style="text-align: left;"><input type="number" id="txtPrecioA" class="cajacredencial" placeholder="' +  arlFilas[2][1] + '" style="width: 150px;" onblur="actualiceArrayFilas(this,  ' + 3 + ', 1)" value="' +  arlFilas[2][1] + '"></input></td></tr>';			
			strHTMLFilas += '<tr tag="preciob" id="fila4"><td>Precio B</td><td style="text-align: left;"><input type="number" id="txtPrecioB" class="cajacredencial" placeholder="' +  arlFilas[3][1] + '" style="width: 150px;" onblur="actualiceArrayFilas(this,  ' + 4 + ', 1)" value="' +  arlFilas[3][1] + '"></input></td></tr>';			
			strHTMLFilas += '<tr tag="precioc" id="fila5"><td>Precio C</td><td style="text-align: left;"><input type="number" id="txtPrecioC" class="cajacredencial" placeholder="' +  arlFilas[4][1] + '" style="width: 150px;" onblur="actualiceArrayFilas(this,  ' + 5 + ', 1)" value="' +  arlFilas[4][1] + '"></input></td></tr>';			
			strHTMLFilas += '<tr tag="preciod" id="fila6"><td>Precio D</td><td style="text-align: left;"><input type="number" id="txtPrecioD" class="cajacredencial" placeholder="' +  arlFilas[5][1] + '" style="width: 150px;" onblur="actualiceArrayFilas(this,  ' + 6 + ', 1)" value="' +  arlFilas[5][1] + '"></input></td></tr>';			
			strHTMLFilas += '<tr tag="idiva" id="fila7"><td>IVA</td><td style="text-align: center;"><a id="articuloiva" class="botondeplanilla2" Tag=' +  arlFilas[6][1] + ' tabla="ivas" onclick="muestretabla(1, [this, ' + 7 + ', 1, \'lstplanilla\']);"><img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></a></td></tr>';			
			strHTMLFilas += '<tr tag="espesado" id="fila7"><td>Es Pesado Al Venderse</td><td style="text-align: center;"><a id="articuloespesado" Tag=' +  arlFilas[7][1] + ' tabla="sisino" onclick="muestretabla(1, [this, ' + 8 + ', 1, \'lstplanilla\']);" class="botondeplanilla2"><img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></a></td></tr>';			
			strHTMLFilas += '<tr tag="idretefuente" id="fila8"><td>Concepto de Retención</td><td style="text-align: center;"><a id="articuloretefuente" class="botondeplanilla2" Tag=' +  arlFilas[8][1] + ' tabla="retefuentes" onclick="muestretabla(1, [this, ' + 9 + ', 1, \'lstplanilla\']);"><img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></a></td></tr>';			
			strHTMLFilas += '<tr tag="caxpr" id="fila9"><td style="text-align: left;">Cantidad Por Presentación</td><td><input type="number" id="txtCaXPr" class="cajacredencial" placeholder=' +  arlFilas[9][1] + ' style="width: 150px;" onblur="actualiceArrayFilas(this,  ' + 10 + ', 1)" value="' +  arlFilas[9][1] + '"></input></td></tr>';			
			strHTMLFilas += '<tr tag="alias" id="fila10"><td>Alias</td><td style="text-align: left;"><input type="text" id="txtAlias" class="cajacredencial" placeholder="' +  arlFilas[10][1] + '" style="width: 150px;" onblur="actualiceArrayFilas(this,  ' + 11 + ', 1)" value="' +  arlFilas[10][1] + '"></input></td></tr>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(25, 'no|ivas|id|' + arlFilas[6][1], false, true, 'articuloiva', 'determinea', document.getElementById('articuloiva'));
			Gestor1.DatosDeConsulta(25, 'no|sisino|id|' + arlFilas[7][1], false, true, 'articuloespesado', 'determinea', document.getElementById('articuloiva'));
			Gestor1.DatosDeConsulta(25, 'descripcion|retefuentes|id|' + arlFilas[8][1], false, true, 'articuloretefuente', 'determinea', document.getElementById('articuloiva'));
			booEnCarga = false;
			document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstplanilla">' + strHTMLColumnas + strHTMLFilas + '</table>';
		break;
		case '2':
			document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=32 height=32></img><br>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(24, argumentos, false, true, 'plaPlanilla', 'reorganiceparaarticulosdatos', '1');
		break;
	}
}

//function actualiceArrayFilas(sender, fila, columna) { arlFilas[fila-1][columna] = sender.value; }

function ev1(paso, argumentos) {
	switch ( paso ) {
		case 1:
			document.getElementById('txtDetalle').value = argumentos.innerText;		
			document.getElementById('secDetalle').innerHTML = '';		
			document.getElementById('plaPlanilla').innerHTML = imgEsperaGra;
			var arlArgumentos = new Array();
			arlArgumentos.push(''); //seccion y nombre de la tabla
			arlArgumentos.push(11); //clase
			arlArgumentos.push(false); //muestre nombre de las columnas					
			arlArgumentos.push('no');
			arlArgumentos.push('ev1');
			arlArgumentos.push('onclick="ev1(1, this);"');			
			ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;|" + document.getElementById('txtDetalle').getAttribute('Tag') + "||" + argumentos.getAttribute('id') + '|no|1;false', true,  '', 'ev100000', arlArgumentos); 
		break;
		case 2:
			var arlFilas = argumentos[6][0];
			var strRetorno = '<table class="lstOperativa" id="lstplanilla" tabla="' + argumentos[1] + '" ><tbody>';	
			switch ( argumentos[1] ) {
				case 11:
					strRetorno += '<tr><td>Id del registro</td><td>' + arlFilas[0] + '</td>'
								+ '<tr><td>Es proveedor</td><td><input fila="1" type=text id="esproveedor" class="cajacredencial" placeholder="' + arlFilas[1] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es cliente</td><td><input fila="2" type=text id="escliente" class="cajacredencial" placeholder="' + arlFilas[2] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es persona jurídica</td><td><input fila="3" type=text id="espersonajuridica" class="cajacredencial" placeholder="' + arlFilas[3] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>NIT</td><td><input fila="4" type=text id="nit" class="cajacredencial" placeholder="' + arlFilas[4] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Nombre</td><td><input fila="5" type=text id="no" class="cajacredencial" placeholder="' + arlFilas[5] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Dirección</td><td><input fila="6" type=text id="direccion" class="cajacredencial" placeholder="' + arlFilas[6] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Teléfono</td><td><input fila="7" type=text id="telefono" class="cajacredencial" placeholder="' + arlFilas[7] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Correo</td><td><input fila="8" type=text id="email" class="cajacredencial" placeholder="' + arlFilas[8] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Fecha de nacimiento</td><td><input fila="9" type=text id="cu" class="cajacredencial" placeholder="' + arlFilas[9] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Categoría</td><td><input fila="10" type=text id="teca" class="cajacredencial" placeholder="' + arlFilas[10] + '" onblur="ev101(1, this);" style="width:90%;"input></td>'
								+ '<tr><td>Es del régimen común</td><td><input fila="11" type=text id="escontribuyenteiva" class="cajacredencial" placeholder="' + arlFilas[11] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es contribuyente especial</td><td><input fila="12" type=text id="escontribuyenteespecial" class="cajacredencial" placeholder="' + arlFilas[12] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es gran contribuyente</td><td><input fila="13" type=text id="esgrancontribuyente" class="cajacredencial" placeholder="' + arlFilas[13] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es entidad estatal</td><td><input fila="14" type=text id="esestatal" class="cajacredencial" placeholder="' + arlFilas[14] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es autorretenedor</td><td><input fila="15" type=text id="esautoretenedor" class="cajacredencial" placeholder="' + arlFilas[15] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es informante de exógena</td><td><input fila="16" type=text id="esinformanteexogena" class="cajacredencial" placeholder="' + arlFilas[16] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es usuario aduanero</td><td><input fila="17" type=text id="esusuarioaduanero" class="cajacredencial" placeholder="' + arlFilas[17] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es eximido del IVA</td><td><input fila="18" type=text id="esnoresponsable" class="cajacredencial" placeholder="' + arlFilas[18] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es contribuyente de menores ingresos</td><td><input fila="19" type=text id="escontribuyentemenoresingresos" class="cajacredencial" placeholder="' + arlFilas[19] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es asalariado</td><td><input fila="20" type=text id="esasalariado" class="cajacredencial" placeholder="' + arlFilas[20] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es trabajador independiente</td><td><input fila="21" type=text id="esindependiente" class="cajacredencial" placeholder="' + arlFilas[21] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es extranjero sin residencia en Colombia</td><td><input fila="22" type=text id="esextranjero" class="cajacredencial" placeholder="' + arlFilas[22] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es transportador internacional</td><td><input fila="23" type=text id="estransportadorinternacional" class="cajacredencial" placeholder="' + arlFilas[23] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es agente de retención</td><td><input fila="24" type=text id="esagentederetencion" class="cajacredencial" placeholder="' + arlFilas[24] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Es agente de retención de IVA</td><td><input fila="25" type=text id="esreteiva" class="cajacredencial" placeholder="' + arlFilas[25] + '" onblur="ev101(1, this);" style="width:90%;"></input></td>'
								+ '<tr><td>Modificado</td><td><input fila="26" type=text id="modificado" class="cajacredencial" placeholder="' + arlFilas[26] + '" onblur="ev101(1, this);" style="width:90%;"	></input></td>';
				break;	
			}			
			strRetorno += '</tbody></table>';
			document.getElementById('plaPlanilla').innerHTML = strRetorno;
		break;
	}	
}

function ev101(paso, argumentos) {
	switch ( paso ) {
		case 1:
			if ( argumentos.value == '' ) { return; }
			var arlArgumentos = new Array();
			arlArgumentos.push(argumentos);
			var Gestor1 = new Gestor();
			Gestor1.Registre("php/registre.php?q=" + strBaDa + ';101;' + document.getElementById('txtDetalle').getAttribute('tag') + ',' + argumentos.getAttribute('id') + ',' + argumentos.value + ',' + document.getElementById('lstplanilla').rows[0].cells[1].innerText, true, '', 'ev101', arlArgumentos);
			document.getElementById('lstplanilla').rows[parseInt(argumentos.getAttribute('fila'))].cells[1].innerHTML = imgEsperaPeq;
			argumentos.style.backgroundColor = ColorRGB(240, 240, 240);
		break;
		case 2:						
			if ( argumentos[1] == 'nada' ) {
				alert('La actualizacion, NO fue registrada.');
			} else {
				argumentos[0].setAttribute('placeholder', argumentos[0].value);
				argumentos[0].style.backgroundColor = ColorRGB(150, 250, 150);
			}
			argumentos[0].value = '';
			document.getElementById('lstplanilla').rows[parseInt(argumentos[0].getAttribute('fila'))].cells[1].innerHTML = argumentos[0].outerHTML;
			document.getElementById(argumentos[0].getAttribute('id')).focus();			 
		break;
	}
}

function ev101305(paso, argumentos) {
	switch(paso) {
		case 1:
			if ( !HayInternet() ) { alert('No está conectado.'); return; }
			document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
			Gestor1.DatosDeConsulta(101305, argumentos, false, true, '', 'ev101305', 2);
		break;
		case 2:

		break;
	}
}

function ev130006(paso, argumentos) {
	switch (paso) {
		case 1:
			if ( !HayInternet() ) { alert('No está conectado.'); return; }			
			arlFilas.length = 0;
			arlFilas.push(0);
			arlFilas.push(0);
			arlFilas.push(hoy());
			arlFilas.push('08:00:00');		
			strHTMLFilas = '<tr><td>Cliente</td><td id="tdcliente" style="text-align: center;" ><input type=text id="txtcliente" class="cajacredencial" idte=0></input><a class="botondeplanilla" >Nuevo</a></td></tr>'
						 + '<tr><td>Servicio</td><td  style="text-align: center;" ><input type=text id="txtservicio" class="cajacredencial" idse=0 onkeyup="ev13000605(this, event);"></input></td></tr>'			
						 + '<tr><td>Fecha</td><td style="text-align: center;"><input type="number" class="cajastandar" id="txtfecidi" placeholder="Día" style="width: 10%;" onblur="ev13000602(1, this);"></input><input type="number" class="cajastandar" id="txtfecime" placeholder="Mes" style="width: 10%;" onblur="ev13000602(1, this);"></input><input type="number" class="cajastandar" id="txtfecian" placeholder="Año" style="width: 20%;" onblur="ev13000602(1, this);"></input></td></tr>'
						 + '<tr><td>Hora</td><td style="text-align: center;"><input type=number id="txthora" class="cajacredencial" style="width: 10%;" value="08" onblur="ev13000607(1, this);"></input><input type=number id="txtminuto" class="cajacredencial" style="width: 10%;" value="00" onblur="ev13000607(1, this)"></input></td></tr>'
						 + '<tr><td colspan=2></td></tr>';						  
			document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstplanilla">' + strHTMLColumnas + strHTMLFilas + '</table>';
			document.getElementById('txtfecidi').value = DiaDe(arlFilas[2]);
			document.getElementById('txtfecime').value = MesDe(arlFilas[2]);
			document.getElementById('txtfecian').value = AñoDe(arlFilas[2]);			
	}	
}

function ev13000602(paso, argumentos) {
	switch (paso) {
		case 1:
			var strFecha = document.getElementById('txtfecian').value + '-' + document.getElementById('txtfecime').value + '-' + document.getElementById('txtfecidi').value;
			if ( isDate(Fecha(strFecha)) ) {
				arlFilas[2] = strFecha;
			} else {
				alert('Asegúrese de escribir una fecha correcta.')
			}
		break;
		case 2:
		
		break;
	}
}

function ev13000603(paso, argumentos) {
	switch (paso) {
		case 1:
			document.getElementById('tdcliente').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif"></img><a class="botondeplanilla" >Nuevo</a>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(13000603, argumentos, false, true, '', 'ev13000603', 2);
		break;
		case 2:
			if ( argumentos == 'nada' ) {				
				document.getElementById('tdcliente').innerHTML = '<input type=text id="txtcliente" class="cajacredencial" idte=0></input><a class="botondeplanilla" >Nuevo</a>';
				arlFilas[0] = 0;
			} else {
				document.getElementById('tdcliente').innerHTML = '<table class="lstOperativa">'
															   + '<tr><td>' + argumentos[0][1] + '</td></tr>'
															   + '<tr><td>' + argumentos[0][2] + '</td></tr>'
															   + '<tr><td>' + argumentos[0][3] + '</td></tr>'
															   + '<tr><td><a class="botondeplanilla" >Nuevo</a></td></tr></table>';
				arlFilas[0] = argumentos[0][0];
			}
		break;
		case 3:
			document.getElementById('tdcliente').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif"></img><a class="botondeplanilla" >Nuevo</a>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(13000604, argumentos, false, true, '', 'ev13000603', 2);
		break;
	}
}

function ev13000605(sender, e) {
	var keyascii =(e.keyCode ? e.keyCode : e.which);
	if (keyascii == 13) {
		if ( sender.value == '' ) { return; }
		ev13000606(1, sender.value);
	} 
}

function ev13000606(paso, argumentos) {
	switch (paso) {
		case 1:
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(13000606, argumentos + '|' + arlFilas[2], false, true, '', 'ev13000606', 2);
			Gestor1.DatosDeConsulta(13000607, argumentos, false, true, '', 'ev13000606', 3);
		break;
		case 2:
			var FuncionarioA = new Funcionario();
			for ( var i = 0; i < argumentos.length; i ++ ){
				argumentos[i][3] = '<a class="botondeplanilla" fila="' + i + '" idte="' + argumentos[i][3] + '" idev=130006" idad="' + argumentos[i][5] + '" onclick="ev130007(1, this);">Cancelar</a>';
				argumentos[i][4] = '';
				argumentos[i][5] = '';
			}
			var strTabla = FuncionarioA.ArrayATabla(argumentos, 'lstOperativa', 'lstCitas');
			document.getElementById('lstplanilla').rows[5].cells[0].innerHTML = strTabla;
		break;
		case 3:
			if ( argumentos == 'nada' ) { 
				document.getElementById('lstplanilla').rows[2].cells[1].innerHTML = '<input type=text id="txtservicio" class="cajacredencial" idse=0 onkeyup="ev13000605(this, event);"></input>';
				arlFilas[1] = 0;
			} else {
				document.getElementById('lstplanilla').rows[2].cells[1].innerHTML = '<input type=text id="txtservicio" class="cajacredencial" idse=0 onkeyup="ev13000605(this, event);"></input>'	
																				  + '<br><a id="txtnombreservicio" class="botondeplanilla" >' + argumentos[0][1] + '</a>';
				arlFilas[1] = argumentos[0][0];
			}
		break;
	}
}

function ev13000607(paso, argumentos) {
	if ( argumentos.value == '' ) { alert('Por favor, escriba algún valor.'); return; }
	arlFilas[3] = 0;
	if ( argumentos.getAttribute('id') == 'txthora' ) {
		if ( ProceseValor(argumentos.value) < 0 || ProceseValor(argumentos.value) > 23 ) { alert('Por favor, escriba valores entre 0 y 23'); }
	}
	if ( argumentos.getAttribute('id') == 'txtminuto' ) {
		if ( ProceseValor(argumentos.value) < 0 || ProceseValor(argumentos.value) > 59 ) { alert('Por favor, escriba valores entre 0 y 59'); }
	}
	arlFilas[3]	= enteroenxcifras(document.getElementById('txthora').value, 2) + ':' + enteroenxcifras(document.getElementById('txtminuto').value ,2);
}

function ev13000610(paso, argumentos) {
	switch (paso) {
		case 1:
			var Gestor1 = new Gestor();
			var strServicio = document.getElementById('txtservicio').innerText;
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 130006 + '|' + arlFilas[0] + '|' + arlFilas[1] + '|0|0||' + strServicio + '|' + arlFilas[2] + ' ' + arlFilas[3] + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev13000610', 2);	
			document.getElementById('lnkRegistrar').innerHTML = '<img id="imgBoton1" src="imagenes/cargando2.gif" style="padding-top: 30px; margin-right: 50px;" width=64 height=64 alt="" />';	
		break;
		case 2:
			if ( argumentos == 'nada' ) { alert('La cita, no pudo ser registrada.'); return; }
			recargueaplicacion();
		break;
	}
}

function ev130007(paso, argumentos) {
	switch (paso) {
		case 1:
			document.getElementById('lstCitas').rows[argumentos.getAttribute('fila')].cells[3].innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></img><br>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|130007|' + matUsuario[0] + '|' + argumentos.getAttribute('idte') + '|' + argumentos.getAttribute('idad') + '|0|130006|1|' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev130007', 2);
		break;
		case 2:
			if ( argumentos == 'nada' ) { alert('La cita no pudo ser cancelada.'); return; }
			recargueaplicacion();
		break;		
	}
}

function reorganiceparatercerosdatos(paso, argumentos1) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }	
	var Gestor1 = new Gestor();	
	switch (paso) {
		case 1:
			strHTMLFilas = '';
			document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
			arlFilas.length = 0;		
			for (var i = 0; i <= 25; i ++) {
				var arlFila = new Array();
				arlFila.push(''); arlFila.push('');
				arlFilas.push(arlFila);
			}
			
			
			if ( intReferenciado == 0 ){				
				var i = -1;				
				i += 1; arlFilas[i][0] = 'nit'; arlFilas[i][1] = '';
				strHTMLFilas += '<tr tag="nit" id="fila1"><td>identificación</td><td><input type="text" id="txtNIT" class="cajacredencial" style="width: 250px;" onblur="actualiceArrayFilas(this,  ' + 1 + ', 1); ev13050504(1, this);" value="' +  arlFilas[0][1] + '"></input></td>';
				i += 1; arlFilas[i][0] = 'no'; arlFilas[i][1] = '';
				strHTMLFilas += '<tr tag="no" id="fila2"><td>Nombre o Razón Social</td><td><input type="text" id="txtNo" class="cajacredencial" style="width: 500px;" onblur="actualiceArrayFilas(this,  ' + 2 + ', 1)" value="' +  arlFilas[1][1] + '"></input></td>';
				i += 1; arlFilas[i][0] = 'direccion'; arlFilas[i][1] = 'ns';
				strHTMLFilas += '<tr tag="direccion" id="fila3"><td>Dirección</td><td><input type="text" id="txtDireccion" class="cajacredencial" style="width: 500px;" onblur="actualiceArrayFilas(this,  ' + 3 + ', 1)" value="' +  arlFilas[2][1] + '" placeholder="ns" value="ns" ></input></td>';
				i += 1; arlFilas[i][0] = 'telefono'; arlFilas[i][1] = 'ns';
				strHTMLFilas += '<tr tag="telefono" id="fila4"><td>Teléfonos</td><td><input type="text" id="txtTelefono" class="cajacredencial" style="width: 500px;" onblur="actualiceArrayFilas(this,  ' + 4 + ', 1)" value="' +  arlFilas[3][1] + '" placeholder="ns" value="ns" ></input></td>';
				i += 1; arlFilas[i][0] = 'email'; arlFilas[i][1] = 'ns';
				strHTMLFilas += '<tr tag="email" id="fila5"><td>Correo electrónico</td><td><input type="text" id="txtEMail" class="cajacredencial" style="width: 500px;" onblur="actualiceArrayFilas(this,  ' + 5 + ', 1)" value="' +  arlFilas[4][1] + '" placeholder="ns" value="ns" ></input></td>';
				i += 1; arlFilas[i][0] = 'cu'; arlFilas[i][1] = '2015-01-01';
				strHTMLFilas += '<tr tag="cu" id="fila6"><td>Cumpleaños</td><td><input type="text" id="txtCu" class="cajacredencial" style="width: 500px;" onblur="actualiceArrayFilas(this,  ' + 6 + ', 1)" value="' +  arlFilas[5][1] + '" placeholder="2015-01-01" value="2015-01-01" ></input></td>';
				i += 1; arlFilas[i][0] = 'teca'; arlFilas[i][1] = 5;
				strHTMLFilas += '<tr tag="teca" id="fila7"><td>Categoría</td><td><a class="botondeplanilla2" Tag=5 tabla="teca" onclick="muestretabla(1, [this, ' + (7) + ', 1, \'lstplanilla\']);">0 Estrellas</a></td>';
				i += 1; arlFilas[i][0] = 'esproveedor'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esproveedor" id="fila8"><td>Es Proveedor</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + (8) + ', 1, \'lstplanilla\']);">No</a></td>';
				i += 1; arlFilas[i][0] = 'escliente'; arlFilas[i][1] = 1;
				strHTMLFilas += '<tr tag="escliente" id="fila9"><td>Es Cliente</td><td><a class="botondeplanilla2" Tag=1 tabla="sisino" onclick="muestretabla(1, [this, ' + (9) + ', 1, \'lstplanilla\']);">Sí</a></td>';
				i += 1; arlFilas[i][0] = 'credito'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="credito" id="fila10"><td>Cupo de crédito</td><td><input type="number" id="txtCredito" class="cajacredencial" placeholder=0 style="width: 150px;" onblur="actualiceArrayFilas(this,  ' + 10 + ', 1)" value="' +  arlFilas[9][1] + '" ></input></td>';
				i += 1; arlFilas[i][0] = 'espersonajuridica'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="espersonajuridica" id="fila11"><td>Es Persona Jurídica</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 11 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'escontribuyenteiva'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="escontribuyenteiva" id="fila12"><td>Es Del Régimen Común</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 12 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esnoresponsable'; arlFilas[i][1] = 1;
				strHTMLFilas += '<tr tag="esnoresponsable" id="fila13"><td>Está eximido de responder por el IVA</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 13 + ', 1, \'lstplanilla\']);">Sí</a></input></td>';
				i += 1; arlFilas[i][0] = 'escontribuyenteespecial'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="escontribuyenteespecial" id="fila14"><td>Es Contribuyente Especial</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 14 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esgrancontribuyente'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esgrancontribuyente" id="fila15"><td>Es Gran Contribuyente</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 15 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esestatal'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esestatal" id="fila16"><td>Es Entidad Del Estado</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 16 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esagentederetencion'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esagentederetencion" id="fila17"><td>Es Agente De Retención</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 17 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esreteiva'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esreteiva" id="fila18"><td>Es Designado Retenedor Del IVA</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 18 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esautoretenedor'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esautoretenedor" id="fila19"><td>Es Autorretenedor</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 19 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esinformanteexogena'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esinformanteexogena" id="fila20"><td>Es Informante de Exógena</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 20 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esusuarioaduanero'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esusuarioaduanero" id="fila21"><td>Es Usuario Aduanero</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 21 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'escontribuyentemenoresingresos'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="escontribuyentemenoresingresos" id="fila22"><td>Es Contribuyente de Menores Ingresos</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 22 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esasalariado'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esasalariado" id="fila23"><td>Es Asalariado</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 23 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esindependiente'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esindependiente" id="fila24"><td>Es Independiente</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 24 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'esextranjero'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="esextranjero" id="fila25"><td>Es Extranjero Sin Residencia Nacional</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 25 + ', 1, \'lstplanilla\']);">No</a></input></td>';
				i += 1; arlFilas[i][0] = 'estransportadorinternacional'; arlFilas[i][1] = 0;
				strHTMLFilas += '<tr tag="estransportadorinternacional" id="fila26"><td>Es Transportador Internacional</td><td><a class="botondeplanilla2" Tag=0 tabla="sisino" onclick="muestretabla(1, [this, ' + 26 + ', 1, \'lstplanilla\']);">No</a></input></td>';				
				booEnCarga = false;
				document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstplanilla">' + strHTMLColumnas + strHTMLFilas + '</table>';
			} else {

			}
		break;
	}
}

function ev13050504(paso, argumentos) {
	switch ( paso ) {
		case 1:
			var arlArgumentos = new Array();
			arlArgumentos.push(argumentos);	arlArgumentos.push(''); arlArgumentos.push(false); arlArgumentos.push('');
			arlArgumentos.push('ev13050504');
			ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;no|terceros|nit|" + argumentos.value + '||;false', true,  '', 'ev100000', arlArgumentos); 
		break;
		case 2:
			alert('El NIT descrito está registrado a: ' + argumentos[5][0][0]);
			argumentos[0].value = '';
			argumentos[0].focus();
		break;
	}
}

function ev13050310 (paso, argumentos) {
	switch (paso) {
		case 1:
			if ( arlFilas[0][1] == '' ) { alert('No se puede registrar una persona sin NIT o cédula.'); return; }
			if ( !NITValido(arlFilas[0][1]) ) { return; }
			if ( arlFilas[1][1] == '' || arlFilas[1][1].length < 5 ) { alert('El nombre asignado no es aceptable.'); return; }
			if ( !isDate(Fecha(arlFilas[5][1])) ) { alert('La fecha de nacimiento descrita, no es válida.'); return; }
			var strDatos = '"' + arlFilas[0][1] +  '"';
			for ( var i = 1; i < arlFilas.length; i ++ ) {
				if ( i != 9 ) { strDatos += ', "' + arlFilas[i][1] + '"'; }	
			}
			var Gestor1 = new Gestor();
			Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 13050310 + ';' + strDatos, true, '', 'ev13050310', 2);
			document.getElementById('lnkRegistrar').innerHTML = '<img id="imgBoton1" src="imagenes/cargando2.gif" style="padding-top: 30px; margin-right: 50px;" width=64 height=64 alt="" />';	
		break;
		case 2:
			if ( argumentos == 'nada' ) { 
				alert('La persona, no pudo ser registrada.'); 
				document.getElementById('lnkRegistrar').innerHTML = '<a class="link" style="margin-right: 50px; margin-top: 20px;" onclick="lnkRegistrar_Click();">Registrar</a>';
				var Gestor1 = new Gestor();
				Gestor1.Registre('borreanterior');
				return; 
			}
			recargueaplicacion();
		break;		
	}
}

function ev130507(paso, argumentos) {
	if ( matUsuario[4] < 5 ) { alert('No se puede realizar la tarea por falta de credenciales'); return; }
	if ( !HayInternet() ) { alert('No está conectado.'); return; }	
	switch (paso) {
		case 1:
			if ( intReferenciado == 0 ) {			
				arlFilas.length = 0;
				arlFilas.push(0);
				arlFilas.push('');
				arlFilas.push('');
				arlFilas.push(5);		
				var strRoles = '';
				for ( var i = 0; i <= dwEventos.length - 1; i ++ ) {
					if ( dwEventos[i][4] ) {
						strRoles += '<tr id="' + dwEventos[i][0] + '" fila="' + i + '" asociado="0"><td><a idev="' + dwEventos[i][0] + '" fila="' + i + '" class="botondeplanilla" onclick="ev13050704(1, this);">' + dwEventos[i][1] + '</a></td><tr>';
					}					
				}
				strRoles = '<table class="lstOperativa" id="lstRoles"><body>' + strRoles + '</body></table>';			
				strHTMLFilas = '<tr><td>Id Persona</td><td id="tdpersona" style="text-align: center;" ><input type=text id="txtpersona" class="cajacredencial" idte=0 onblur="ev13050702(1, this);"></input></td></tr>'
						 + '<tr><td>Nombre</td><td id="tdnombre" style="text-align: center;" ><input type=text id="txtno" class="cajacredencial" onblur="ev13050702(1, this);"></input></td></tr>'			
						 + '<tr><td>Contrasena</td><td style="text-align: center;"><input type="password" class="cajastandar" id="txtcontrasena" style="width: 30%;" onblur="ev13050702(1, this);"></input></tr>'
						 + '<tr><td>Eventos asociados</td><td id="ev">' + strRoles + '</td></tr>';
				document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstplanilla">' + strHTMLColumnas + strHTMLFilas + '</table>';			
				document.getElementById('txtpersona').focus();
			} else {

			}
		break;
	}
}

function ev13050702(paso, argumentos) {
	switch (paso) {
		case 1:
			var Gestor1 = new Gestor();
			switch (argumentos.getAttribute("id")) {				
				case 'txtpersona':					
					arlFilas[0] = 0;
					var arlArgumentos = new Array();
					arlArgumentos.push(argumentos);	arlArgumentos.push(0); arlArgumentos.push(false); arlArgumentos.push('');
					arlArgumentos.push('ev13050702');					
					ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;id,no|terceros|nit|" + argumentos.value + '||;false', true,  '', 'ev100000', arlArgumentos); 					
					document.getElementById('tdpersona').innerHTML = imgEsperaPeq;
				break;
				case 'txtno':
					arlFilas[1] = '';
					var arlArgumentos = new Array();
					arlArgumentos.push(argumentos);	arlArgumentos.push(1); arlArgumentos.push(false); arlArgumentos.push(argumentos.value);
					arlArgumentos.push('ev13050702');					
					ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;no|usuarios|no|" + argumentos.value + '||;false', true,  '', 'ev100000', arlArgumentos);
					document.getElementById('tdnombre').innerHTML = imgEsperaPeq;					
				break;				
				case 'txtcontrasena':
					arlFilas[2] = argumentos.value;
					var strTexto = argumentos.value;
					if ( strTexto.length != 6 ) { 
						arlFilas[2] = '';
						argumentos.focus();						
					}					
				break;
				case 'txtnivel':
					arlFilas[3] = parseInt(argumentos.value);
					if ( parseInt(argumentos.value) < 1 && parseInt(argumentos.value) > 5 ) { 
						alert('Por favor, utilice un nivel entre 1 y 5 para el nuevo usuario'); 
						arlFilas[3] = 0;
					}
				break;
			}
		break;
		case 2:
			switch (argumentos[1]) {
				case 0:
					if ( argumentos[5][0][0] == 'nada' ) {
						document.getElementById('tdpersona').innerHTML = argumentos[0].outerHTML;						
					} else {
						arlFilas[0] = argumentos[5][0][0];
						document.getElementById('tdpersona').innerHTML = '<a class="lblimportante">' + argumentos[5][0][1] + '</a>';
						document.getElementById('txtno').focus();
					}					
				break;
				case 1:
					document.getElementById('tdnombre').innerHTML = argumentos[0].outerHTML;
					if ( argumentos[5] == 'nada' ) {						
						document.getElementById('txtno').value = argumentos[3];
						arlFilas[1] = argumentos[3];
						document.getElementById('txtcontrasena').focus();
					} else {
						alert('El nombre elegido, ya está registrado en el sistema');						
					}
				break;
			}
		break;
	}
}

function ev13050703(paso, argumentos) {
	switch (paso) {
		case 1:
			document.getElementById('tdpersona').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif"></img><a class="botondeplanilla" >Nuevo</a>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(13000603, argumentos, false, true, '', 'ev13050703', 2);
		break;
		case 2:
			if ( argumentos == 'nada' ) {				
				document.getElementById('tdpersona').innerHTML = '<input type=text id="txtcliente" class="cajacredencial" idte=0></input><a class="botondeplanilla" >Nuevo</a>';
				arlFilas[0] = 0;
			} else {
				document.getElementById('tdpersona').innerHTML = '<table class="lstOperativa">'
															   + '<tr><td>' + argumentos[0][1] + '</td></tr>'															   
															   + '<tr><td><a class="botondeplanilla" >Nuevo</a></td></tr></table>';
				arlFilas[0] = argumentos[0][0];
			}
		break;
		case 3:
			document.getElementById('tdpersona').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif"></img><a class="botondeplanilla" >Nuevo</a>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(13000604, argumentos, false, true, '', 'ev13050703', 2);
		break;
	}
}

function ev13050704(paso, argumentos) {
	switch ( parseInt(document.getElementById(argumentos.getAttribute("idev")).getAttribute("asociado")) ) {
		case 0:
			document.getElementById(argumentos.getAttribute("idev")).setAttribute("asociado", 1);
			document.getElementById(argumentos.getAttribute("idev")).cells[0].innerHTML = argumentos.outerHTML + '<img src="imagenes/aprobado.png" margin-right: 50px;" width=32 height=32 />';
		break;
		case 1:
			document.getElementById(argumentos.getAttribute("idev")).setAttribute("asociado", 0);
			document.getElementById(argumentos.getAttribute("idev")).cells[0].innerHTML = argumentos.outerHTML;
		break;
	}
}

function ev13050710(paso, argumentos) {
	switch (paso) {
		case 1:	
			var Gestor1 = new Gestor();
			if ( arlFilas[0] == 0 ) { alert('El NIT descrito, no identifica a alguna persona'); return; }
			if ( arlFilas[1] == '' ) { alert('El nombre descrito, no es aceptable'); return; }
			if ( arlFilas[2] == '' ) { alert('La contraseña descrita, no es aceptable'); return; }			
			document.getElementById('lnkRegistrar').innerHTML = imgEsperaPeq;
			var strAsociados = '';
			for ( var i = 0; i <= document.getElementById("lstRoles").rows.length - 1; i ++ ) {
				if ( parseInt(document.getElementById("lstRoles").rows[i].getAttribute("asociado")) == 1  ) { strAsociados += document.getElementById("lstRoles").rows[i].getAttribute("id") + ','; }
			}
			var arlArgumentos = new Array();
			arlArgumentos.push(strAsociados); arlArgumentos.push(2);
			Gestor1.Registre("php/registre.php?q=" + strBaDa + ";13050711;" + arlFilas[0] + "," + arlFilas[1] + "," + arlFilas[2] + "," + arlFilas[3], true, '', 'ev13050710', arlArgumentos);			
		break;
		case 2:
			if ( argumentos[2] == 'nada' ) {
				alert('El usuario, no pudo ser registrado.');
			} else {
				var Gestor1 = new Gestor();
				argumentos[1] = 3;
				Gestor1.Registre("php/registre.php?q=mercavilla_codex;13050710;" + arlFilas[1] + "," + arlFilas[2] + "," + intIdLi, true, '', 'ev13050710', argumentos);
			}
		break;
		case 3:
			if ( argumentos[3] == 'nada' ) {
				alert('El usuario, no pudo ser registrado.');					
			} else {
				argumentos[1] = 4;
				var Gestor1 = new Gestor();
				Gestor1.Registre("php/registre.php?q=" + strBaDa + ";13050712;" + argumentos[2] + "," + argumentos[0], true, '', 'ev13050710', argumentos);				
			}
		break;
		case 4:
			if ( argumentos[4] == 'nada' ) { alert('No se pudo registrar los privilegios del usuario.'); } else {
				alert('El usuario se ha registrado con éxito');
				recargueaplicacion();				
			}
		break;
	}	
}

function ev130509(paso, argumentos) {
	switch (paso) {
		case 1:
			if ( !HayInternet() ) { alert('No está conectado.'); return; }
			document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(29, argumentos + '|' + hoy(), false, true, 'plaPlanilla', 'ev130509', 2);
			Gestor1.DatosDeConsulta(13050911, intReferenciado, false, true, '', 'ev13050911', 3);
			if ( matUsuario[4] > 4 ) { alert('Estimado usuario.\n\nEn Colombia, la tasa de interés más alto posible fijada por el Banco De La República, en enero de 2019, es de un valor de 28.74% Efectivo Anual\n\nLa tasa de interés moratorio es máximo de 26.74%.\n\nTenga cuidado de estas cifras y evite sanciones de parseInte de las autoridades.'); }
		break;		
		case 2:
			var arlTerceros = argumentos;	
			strHTMLFilas = '';
			arlTerceros.forEach(ev13050901);
			document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstplanilla">' + strHTMLColumnas + strHTMLFilas + '</table>';
			if ( ProceseValor(matUsuario[4]) > 4 ) {
				var Funcionario1 = new Funcionario();
				var Totales1 = new Totales();
				var strHTMLTotales = Funcionario1.ArrayATabla(Totales1.DetermineTotales(arlFilas, 130508, ProceseValor(matUsuario[4])), 'lstOperativa', 'tabOperativa');
					document.getElementById('lstTotales').innerHTML = strHTMLTotales
					+ '<div id="contralista"><img src="https://mercavilla.sistemasadministrativosdecolombia.comimagenes/cargando2.gif" style="width: 24px; height: 24px;"></div>';
			}
			arlTerceros.forEach(ev13050912);
			var idlista = document.getElementById('plaPlanilla').getAttribute('etiqueta');
			idlista = parseInt(idlista.substring(6));
			var Gestor4 = new Gestor();
			Gestor4.DatosDeConsulta(13050907, idlista, false, true, '', 'ev13050907', 2);
		break;
		case 3:
			if ( argumentos != 'nada' ) {
				var strNombresNuevos = 'Esta lista tiene ' + argumentos.length + ' clientes nuevos.\n\n' ;
				for ( var i = 0; i < argumentos.length; i ++ ) {
					strNombresNuevos += argumentos[i] + '\n';					
				}
				alert(strNombresNuevos);
			}
		break;
	}	
}

function ev13050912(item, index) {
	
}

function ev13050907(paso, argumentos) {
	switch (paso) {
		case 2:
			document.getElementById('contralista').innerHTML = '<input id="txtcontralista" type="text" placeholder="' + argumentos[0][1] + '"><a id="btncontralista" class="botondeplanilla" idus="' + argumentos[0][0] + '" onclick="registrecontralista(this, event)">Registrar</a>';
		break;
		case 3:
			document.getElementById('contralista').innerHTML = '<img src="https://mercavilla.sistemasadministrativosdecolombia.comimagenes/cargando2.gif" style="width: 24px; height: 24px;">';
			var idlista = document.getElementById('plaPlanilla').getAttribute('etiqueta');
			idlista = parseInt(idlista.substring(6));
			var Gestor4s = new Gestor();
			Gestor4s.DatosDeConsulta(13050907, idlista, false, true, '', 'ev13050907', 2);
		break;
	}	
}

function registrecontralista(sender, e) {
	var Gestor4t = new Gestor();
	if ( document.getElementById('txtcontralista').value == '' ) { alert = 'Por favor, escriba una contraseña.'; return; }
	Gestor4t.DatosDeConsulta(13050908, intIdLi + '|' + sender.getAttribute('idus') + '|' + document.getElementById('txtcontralista').value, false, true, '', 'ev13050907', 3);
}

function ev130589(sender) {
	var Gestor1 = new Gestor();
	Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 130589 + '|' + sender.getAttribute('idter') + '|0|0|0|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev130589', sender);
}


function ev13050901(item, index) {
	arlFila = item;
	arlFila.splice(0, 1);
	var strStyle = '';
	if ( matUsuario[4] > 4 ) {
		//if ( arlFila[6] == 0 ) {
			if (  DateDiff(arlFila[8], FechaDeMYSQL(Hoy())) < 1 ) { 
				var Gestorhs = new Gestor();
				//Gestorhs.DatosDeConsulta(32, item[0], false, true, '', 'ev32', item[0]);				
			}
		//}		
	}  
	strHTMLFilas += '<tr tag=' + item[0] + ' id="fila' + (index * 2 + 1) + '" clasedecliente="' + arlFila[9] + '" idmov=' + arlFila[16] + strStyle + ' >';		
	arlFila[7] = ProceseValor(arlFila[6]) + ProceseValor(arlFila[5]) + ProceseValor(arlFila[4]) + ProceseValor(arlFila[3]) - ProceseValor(arlFila[2]);
	for ( var i = 1; i <= arlFila.length; i ++ ) {
		var strmarcado = '';
		if ( item[17] != 0 ) { strmarcado='style="background-color: orange;"'; }
		if ( matUsuario[4] > 4 ) { strmarcado += ' onclick="ev130589(this);"'; }
		switch ( i ) {
			case 1:	
				if ( arlFila[10] == -5 ) {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillarosado" fila="' + (index + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';	
					} else {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillarosado" >' + arlFila[i] + '</a></td>';
					}					
				}				
				if ( arlFila[10] == -4 ) {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillamorado" fila="' + (index + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';	
					} else {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillamorado" >' + arlFila[i] + '</a></td>';
					}					
				}				
				if ( arlFila[10] == -3 ) {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillaamarillo" fila="' + (index + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';	
					} else {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillaamarillo" >' + arlFila[i] + '</a></td>';
					}					
				}
				if ( arlFila[10] == -2 ) {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillaazul" fila="' + (index + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';		
					} else {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillaazul" >' + arlFila[i] + '</a></td>';		
					}					
				}							
				if ( arlFila[10] == -1 ) {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillarojo" fila="' + (index + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';	
					} else {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillarojo" >' + arlFila[i] + '</a></td>';
					}					
				} 
				if ( arlFila[10] == 0 ) {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanilla2" fila="' + (index + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';		
					} else {
						strHTMLFilas += '<td id="td'+ item[0] + '"><a id="id' + arlFila[0] + '" class="botondeplanilla2" ' + strmarcado + ' idter="' + item[0] + '">' + (index + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanilla2" >' + arlFila[i] + '</a></td>';		
					}					
				}				
				break;
			case 2: case 3: case 4: case 5:	
				if ( arlFila[i] == 0 ) {
					strHTMLFilas += '<td style="text-align: right;"><input type="number" class="cajacredencial" id="' + item[0] + '|' + i + '" vence="' + arlFila[9].substring(0, 10) + '" fila="' + index + ' " placeholder="' + arlFila[i] +'" style="width: 115px;" onblur="ev13050902(1, this);" clasedecliente="' + arlFila[10] + '" ></input><a style="color: rgb(120,120,120); text-align: center; font-size: 24px; width: 100%; margin-top: 1px;">' + arlFila[i+9] + '</a></td>';
				} else {
					strHTMLFilas += '<td style="text-align: right;"><input type="number" class="cajacredencial" id="' + item[0] + '|' + i + '" vence="' + arlFila[9].substring(0, 10) + '" fila="' + index + ' " placeholder="' + arlFila[i] +'" style="width: 115px; background-color: rgb(23, 255, 191);" onblur="ev13050902(1, this);" clasedecliente="' + arlFila[10] + '" ></input><a style="color: rgb(120,120,120); text-align: center; font-size: 24px; width: 100%; margin-top: 1px">' + arlFila[i+9] + '</a></td>';
				}				
				break;	
			case 8: case 9:
				if ( arlFila[i] != '2015-05-05' ) {
					if ( i == 8 ) {
						arlFila[i] = DateDiff(arlFila[i], FechaDeMYSQL(Hoy()));
						strHTMLFilas += '<td style="text-align: center;"><a class="botondeplanilla2">' + arlFila[i] + '</a></td>';													
					} else {
						if ( Hoy() > Fecha(arlFila[i]) ) {
							strHTMLFilas += '<td><a class="botondeplanillarojo">' + arlFila[i].substring(0, 10) + '</a></td>';							
						} else {
							strHTMLFilas += '<td><a class="botondeplanilla2">' + arlFila[i].substring(0, 10) + '</a></td>';								
						}
					}					
				} else {
					strHTMLFilas += '<td>Vac&iacute;o</td>';					
				}
				break;			
			case 11:
				strHTMLFilas += '<td><input type="text" class="cajacredencial" id="' + item[0] + '|' + i + '" vence="' + arlFila[9].substring(0, 10) + '" fila="' + index + ' " placeholder="nota" style="width: 1px;" onblur="registreParaActualizacionDeCreditoDePersona(this, event);" clasedecliente="' + arlFila[10] + '" ></input></td>';
		}		
	}	
	if ( matUsuario[4] < 5 ) {
			strHTMLFilas += '</tr><tr id="fila' + (index * 2 + 2) + '"><td style="background-color: rgb(46, 100, 171); color: white;" colspan=8 ><div style="justify-content: space-around;">'
				+   '<a style="display: inline-block; vertical-align: 	middle;" href="tel:+57' + arlFila[15] + '" target="_blank"><img width=45 src="imagenes/phone.png" /></a>'
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >' + arlFila[6] + '</a>' 
				+   '<a class="botondeplanilla" id="co' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="ev13050906(0, this);" >Corregir</a>' 
				+   '<a class="botondeplanilla" id="cano' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="cambiarnombrealtercero(1, this);" >Editar</a>'
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >Datos</a>' 
				+   '<a class="botondeplanilla" id="murecr' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestreresumencreditode(1, this);">Resumen</a>'
				+   '<a class="botondeplanilla" id="nu' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte=0 onclick="ev13050903(1, this);">Nuevo</a>' 
				+   '<a class="botondeplanilla" id="el' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="ev13050905(1, ' + index + ');">Mover</a>'
				+   '<a class="botondeplanilla" id="sa' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(' + arlFila[0] + ');" >' + arlFila[7] + '</a>'				
				+   '</td></tr>';	
	} else {
		strHTMLFilas += '</tr><tr id="fila' + (index * 2 + 2) + '"><td style="background-color: rgb(46, 100, 171); color: white;" colspan=8 ><div style="justify-content: space-around;">'
				+   '<a style="display: inline-block; vertical-align: 	middle;" href="tel:+57' + arlFila[15] + '" target="_blank"><img width=45 src="imagenes/phone.png" /></a>'
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >' + arlFila[6] + '</a>' 
				+   '<a class="botondeplanilla" id="co' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="ev13050906(0, this);" >Corregir</a>' 
				+   '<a class="botondeplanilla" id="cano' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="cambiarnombrealtercero(1, this);" >Editar</a>'				
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >Datos</a>' 
				+   '<a class="botondeplanilla" id="murecr' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestreresumencreditode(1, this);">Resumen</a>'				
				+   '<a class="botondeplanilla" id="nu' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte=0 onclick="ev13050903(1, this);">Nuevo</a>' 
				+   '<a class="botondeplanilla" id="el' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="eliminecliente(1, this);">Eliminar</a>'
				+   '<a class="botondeplanilla" id="el' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="ev13050905(1, ' + index + ');">Mover</a>'
				+   '<a class="botondeplanilla" id="sa' + arlFila[0] + '" fila="' + (index*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1,this);" >' + arlFila[7] + '</a>' 
				+	'</div></td></tr>';	
	}
	arlFilas.push(arlFila);	
}

function ev1305090501(paso, argumentos){
	var arlId = argumentos.getAttribute('id').split("|");
	for ( var i = 2; i < 6; i ++) {
		if ( i != parseInt(arlId[1]) ) {
			if ( document.getElementById(arlId[0] + '|' + i).value != '' ) {
				document.getElementById(argumentos.getAttribute('id')).value = '';
				return true;
			}
		}
	}
}

function ev13050902(paso, argumentos) {
	switch (paso) {
		case 1:
			if ( ev1305090501(1, argumentos) ) { return; }
			if ( !HayInternet() ) { alert('No está conectado.'); argumentos.focus(); return; }				
			if ( argumentos.value == '' ) { return; }
			if ( ProceseValor(argumentos.value) == 0 ) { return false; }
			if ( !IsNumeric(argumentos.value) ) { return; }
			if ( argumentos.value == argumentos.getAttribute('placeholder') ) { strconsultaant = ''; }			
			//if ( !EsInsercionValida(argumentos) ) { argumentos.value = ''; return; }	
			if ( ProceseValor(argumentos.value) < 0 ) { argumentos.value = ''; argumentos.focus(); alert('Evite números negativos.'); return; }
			var arlId = argumentos.getAttribute('id').split("|");
			if ( parseInt(arlId[1]) == 2 && ProceseValor(argumentos.value) > ProceseValor(arlFilas[parseInt(argumentos.getAttribute('fila'))][7]) ) {
				alert('Evite registrar un abono superior al saldo de este cliente.');
				argumentos.value = '';
				argumentos.focus();
				return;
			}
			var arlArgumentos = new Array();
			arlArgumentos.push(2);
			arlArgumentos.push(argumentos.getAttribute('id'));
			arlArgumentos.push(argumentos.getAttribute('vence'));
			arlArgumentos.push(argumentos.getAttribute('fila'));
			arlArgumentos.push(argumentos.getAttribute('placeholder'));
			arlArgumentos.push(argumentos.getAttribute('style'));
			arlArgumentos.push(argumentos.getAttribute('onblur'));
			arlArgumentos.push(argumentos.getAttribute('clasedecliente'));
			arlArgumentos.push(argumentos.value);
			/*switch ( parseInt(arlArgumentos[7]) ) {
				case -1: case -2: case -3:
					if ( arlId[1] == 3 ) { argumentos.value = ''; argumentos.focus(); alert('No se puede regitrar préstamos en cuentas de difícil cobro.'); return; }
				break;				
			}*/
			arlArgumentos.push(904202);
			ev13050902(2, arlArgumentos);
		break;
		case 2:
			switch (parseInt(argumentos[9])) {
				case 0:
					alert('Ocurrió un fallo de conexión con el servidor. Inténtelo nuevamente por favor.');
					var arlId = argumentos[1].split("|");
					document.getElementById('lstplanilla').rows[parseInt(argumentos[3])*2 + 1].cells[parseInt(arlId[1])-1].innerHTML = '<input type="number" id="' + argumentos[1] + '" vence="' + argumentos[2] + '" class="cajacredencial" fila="' + parseInt(argumentos[3]) + '" placeholder="' + argumentos[4] + '" style="' + argumentos[5] + '" onblur="' + argumentos[6] + '" clasedecliente="' + argumentos[7] + '">' + argumentos[8] + '</input>';
				break;
				case 904201:
					alert('La actualización de la cartera, está temporalmente suspendida.');
					var arlId = argumentos[1].split("|");
					document.getElementById('lstplanilla').rows[parseInt(argumentos[3])*2 + 1].cells[parseInt(arlId[1])-1].innerHTML = '<input type="number" id="' + argumentos[1] + '" vence="' + argumentos[2] + '" class="cajacredencial" fila="' + parseInt(argumentos[3]) + '" placeholder="' + (ProceseValor(argumentos[4])+ProceseValor(argumentos[8])) + '" style="' + argumentos[5] + ' background-color: " onblur="' + argumentos[6] + '" clasedecliente="' + argumentos[7] + '">' + argumentos[8] + '</input>';
				break;
				case 904202:
					var Gestor1 = new Gestor();
					var arlId = argumentos[1].split("|");
					var IdEv = 0;
					var intSubCuenta = 137010;
					switch ( parseInt(arlId[1]) ) {
						case 2:
							IdEv = 137011;
							if ( parseInt(argumentos[7]) == -1 || parseInt(argumentos[7]) == -2 || parseInt(argumentos[7]) == -3 ) { 
								IdEv = 139006; 
								intSubCuenta = 139001; 
							}
						break;
						case 3:
							IdEv = 137010;
							if ( parseInt(argumentos[7]) == -1 || parseInt(argumentos[7]) == -2 || parseInt(argumentos[7]) == -3 ) {
								IdEv = 139001;
								intSubCuenta = 139001;
							}
						break;
						case 4:
							IdEv = 421005;
							if ( parseInt(argumentos[7]) == -1 || parseInt(argumentos[7]) == -2 || parseInt(argumentos[7]) == -3 ) { intSubCuenta = 139001; }
						break;
						case 5:
							IdEv = 421055;
							if ( parseInt(argumentos[7]) == -1 || parseInt(argumentos[7]) == -2 || parseInt(argumentos[7]) == -3 ) { intSubCuenta = 139001; }
						break;
						case 8:
						//queda para sistematizar las notas
						break;
					}
					Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + IdEv + '|' + arlId[0] + '|' + argumentos[8] + '|0|' + intSubCuenta + '|||' + hoy() + '|' + FechaDeMYSQL(DateAdd(Hoy(), 30)) + '|' + matUsuario[0], false, true, '', 'ev13050902', argumentos);
				break;				
			}		
		break;
		case 3:
			var arlArgumentos = new Array();
			var arlId = argumentos[1].split("|");			
			var intFila = parseInt(argumentos[3]);
			arlFilas[intFila][arlId[1]] = ProceseValor(argumentos[8]) + ProceseValor(argumentos[4]);
			arlFilas[intFila][7] =  ProceseValor(arlFilas[intFila][6]) + ProceseValor(arlFilas[intFila][5]) + ProceseValor(arlFilas[intFila][4]) + ProceseValor(arlFilas[intFila][3]) - ProceseValor(arlFilas[intFila][2]);
			document.getElementById('lstplanilla').rows[parseInt(argumentos[3])*2 + 1].cells[parseInt(arlId[1])-1].innerHTML = '<input type="number" id="' + argumentos[1] + '" vence="' + argumentos[2] + '" class="cajacredencial" fila="' + parseInt(argumentos[3]) + '" placeholder="' + argumentos[4] + '" style="' + argumentos[5] + '" onblur="' + argumentos[6] + '" clasedecliente="' + argumentos[7] + '"></input>';			
			document.getElementById('sa' + arlFilas[intFila][0]).innerText = arlFilas[intFila][7];
			document.getElementById(argumentos[1]).style.backgroundColor = ColorRGB(255, 191, 23);
			document.getElementById(argumentos[1]).setAttribute('placeholder', arlFilas[intFila][arlId[1]]);
			document.getElementById(argumentos[1]).value = '';			
			if ( matUsuario[4] > 4 ) {
				var Funcionario1 = new Funcionario();
				var Totales1 = new Totales();
				var strHTMLTotales = Funcionario1.ArrayATabla(Totales1.DetermineTotales(arlFilas, 130508), 'lstOperativa', 'tabOperativa');
				document.getElementById('lstTotales').innerHTML = strHTMLTotales;			
			}
			//Gestor1 = new Gestor();
			//Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 100003 + '|' + arlId[0] + '|' + arlFilas[intFila][7] + '|0|0|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev13050903', argumentos);			
		break;
		case 4:
			
		break;
	}
}

function ev13050903(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }	
	decidasicerrarplanilla(0, 0);
	for ( var i = 0; i < arlFilas.length; i ++ ) {
		if ( arlFilas[i][0] == argumentos.getAttribute('id') ) {
			alert('El cliente que intenta agregar a la lista, se halla en la posición ' + (i+1));
			return;
		}
	}		
	var fila = 0;
	var idtercero = 0;
	var no = 0;
	if ( IsNumeric(argumentos.getAttribute('id')) ) {
		var arlArgumentos = new Array();
		arlArgumentos.push('');	arlArgumentos.push('');	arlArgumentos.push('');	arlArgumentos.push('');	arlArgumentos.push('');
		arlArgumentos = ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;idadministrativo|planillasdetalles|idarticulo|" + argumentos.getAttribute('id') + '||;false', false,  '', 'ev100000', arlArgumentos); 		
		if ( arlArgumentos.length > 0 ) { 			
			alert('El cliente elegido, está asignado a la lista ' + arlArgumentos[0] ); 
			return; 
		}		
		fila = prompt('¿En qué lugar de la lista deberá ubicarse el cliente?', 1);
		fila = parseInt(ProceseValor(fila)-1);
		if ( fila < 0 ) { return; }
		if ( fila >= arlFilas.length ) { fila = arlFilas.length; }
		idtercero = parseInt(argumentos.getAttribute('id'));
	} else {
		if ( document.getElementById(argumentos.id) ) {
			fila = (parseInt(argumentos.getAttribute('fila')) - 2)/2;
			idtercero = argumentos.getAttribute('idte');
			no = argumentos.innerText;		
		} else {
			return;
		}
	}	
	var booEsNuevo = false;	
	if ( idtercero == 0 ) {
		booEsNuevo = true;
		var nit = prompt('Escriba el número de identificación', '');
		if ( nit.trim() == '' ) { return; }
		no = prompt('Escriba el nombre del cliente', '');
		if ( no.trim() == '' ) { return; }
		var dir = prompt('Escriba la dirección del cliente', '');
		var tel = prompt('Escriba el teléfono del cliente', '');		
	}
	var Gestor1 = new Gestor();	
	var intIdNuevoRegistro = idtercero;
	var arlFila = new Array();
	if ( booEsNuevo ) {
		intIdNuevoRegistro = Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 3 + ';' + nit + "|" + no + "|" + dir + "|" + tel);	
		if ( intIdNuevoRegistro == 0 ) { return; }
		if ( Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 4 + ';' + nit + "|" + no + "|" + dir + "|" + tel) == 0) { return; }
		strconsultaant = '';
		//si la siguiente linea devuelve cero, hace fallar el ingreso del tercero en la lista. Debe restaurarse el auto_increment en la tabla terceros
		var intOcurrencia = Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 130503) + 1;
		if ( Gestor1.RegistreOcurrencia(130503, intOcurrencia, matUsuario[0], intIdNuevoRegistro, -1 * matUsuario[0], 0, 0, 0, hoy(), hoy(), no, '', 130503, intOcurrencia ) == 0 ) { return; }
		for ( var i=0; i<=9; i ++ ) { arlFila.push(0); }
		arlFila[0] = intIdNuevoRegistro;
		arlFila[1] = no;
		arlFila[8] = '2015-01-01';
		arlFila[9] = '2015-01-01';
		arlFila[10] = 0;
	} else {
		arlFila = Gestor1.DatosDeConsulta(13050903, idtercero + '|' + hoy())[0];		
		arlFila[0] = idtercero;
		//arlFila[2] = ProceseValor(arlFila[2]) + ProceseValor(arlFila[3]) - ProceseValor(arlFila[4]);
		if ( arlFila[6] == 0 ) {		
			var arlSaldoMoroso = Gestor1.DatosDeConsulta(7, arlFila[0]);
			if ( arlSaldoMoroso.length != 0 ) { arlFila[6] = arlSaldoMoroso[0][0]; }
		}		
		arlFila[7] = ProceseValor(arlFila[6]) + ProceseValor(arlFila[5]) + ProceseValor(arlFila[4]) + ProceseValor(arlFila[3]) - ProceseValor(arlFila[2]);		
		if ( arlFila[10] == -1 ) { strHTMLFilas += ' style="background-color: rgb(46, 100, 171); color: white;"'; }		
	}
	var lviFilaNueva = document.getElementById('lstplanilla').insertRow((fila * 2) + 1);	
	lviFilaNueva.setAttribute('tag', arlFila[0]);
	lviFilaNueva.setAttribute('clasedecliente', '');
	strHTMLFilas = '';
	for ( var i = 1; i <= arlFila.length; i ++ ) {		
		switch ( i ) {
			case 1:
				if ( arlFila[10] == -1 ) {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td><a id="id' + arlFila[0] + '" class="botondeplanilla2" >' + (fila + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillarojo" fila="' + (fila + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';	
					} else {
						strHTMLFilas += '<td><a id="id' + arlFila[0] + '" class="botondeplanilla2" >' + (fila + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanillarojo" >' + arlFila[i] + '</a></td>';
					}					
				} else {
					if ( matUsuario[4] > 4 ) {
						strHTMLFilas += '<td><a id="id' + arlFila[0] + '" class="botondeplanilla2" >' + (fila + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanilla2" fila="' + (fila + 1) + '" clasedecliente="' + arlFila[10] + '" onclick="ev13050904(1, this);">' + arlFila[i] + '</a></td>';		
					} else {
						strHTMLFilas += '<td><a id="id' + arlFila[0] + '" class="botondeplanilla2" >' + (fila + 1) + '</a><a id="no' + arlFila[0] + '" class="botondeplanilla2" >' + arlFila[i] + '</a></td>';		
					}					
				}				
				break;
			case 2: case 3: case 4: case 5:	
				strHTMLFilas += '<td><input type="number" class="cajacredencial" id="' + arlFila[0] + '|' + i + '" vence="' + arlFila[9].substring(0, 10) + '" fila="' + fila + ' " placeholder="' + arlFila[i] +'" style="width: 60px;" onblur="ev13050902(1, this);" clasedecliente="' + arlFila[10] + '" ></input></td>';
				break;	
			case 8: case 9:
				if ( arlFila[i] != '2015-05-05' ) {
					if ( i == 8 ) {
						arlFila[i] = DateDiff(arlFila[i], FechaDeMYSQL(Hoy()));						
						strHTMLFilas += '<td style="text-align: center;"><a class="botondeplanilla2">' + arlFila[i] + '</a></td>';													
					} else {
						if ( Hoy() > Fecha(arlFila[i]) ) {
							strHTMLFilas += '<td><a class="botondeplanillarojo">' + arlFila[i].substring(0, 10) + '</a></td>';							
						} else {
							strHTMLFilas += '<td><a class="botondeplanilla2">' + arlFila[i].substring(0, 10) + '</a></td>';								
						}
					}					
				} else {
					strHTMLFilas += '<td>Vac&iacute;o</td>';					
				}
				break;			
			case 11:
				strHTMLFilas += '<td><input type="text" class="cajacredencial" id="' + arlFila[0] + '|' + i + '" vence="' + arlFila[9].substring(0, 10) + '" fila="' + fila + ' " placeholder="nota" style="width: 60px;" onblur="registreParaActualizacionDeCreditoDePersona(this, event);" clasedecliente="' + arlFila[10] + '" ></input></td>';
		}		
	}	
	lviFilaNueva.innerHTML = strHTMLFilas;
	var lviFilaNueva2 = document.getElementById('lstplanilla').insertRow((fila * 2) + 2);
	lviFilaNueva2.setAttribute('id', 'fila' + (fila * 2 + 2));
	if ( matUsuario[4] < 5 ) { 
		lviFilaNueva2.innerHTML = '<td style="background-color: rgb(46, 100, 171); color: white;" colspan=8 ><div style="justify-content: space-around;">'				
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >' + arlFila[6] + '</a>' 
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >Datos</a>' 
				+   '<a class="botondeplanilla" id="murecr' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestreresumencreditode(1, this);">Resumen</a>'
				+   '<a class="botondeplanilla" id="nu' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte=0 onclick="ev13050903(1, this);">Nuevo</a>' 
				+   '<a class="botondeplanilla" id="sa' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(' + arlFila[0] + ');" >' + arlFila[7] + '</a>' 
				+   '</td>';	
	} else {
		lviFilaNueva2.innerHTML = '<td style="background-color: rgb(46, 100, 171); color: white;" colspan=8 ><div style="justify-content: space-around;">'
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >' + arlFila[6] + '</a>' 
				+   '<a class="botondeplanilla" id="cano' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="cambiarnombrealtercero(1, this);" >Editar</a>'				
				+   '<a class="botondeplanilla" id="muda' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1, this);" >Datos</a>' 
				+   '<a class="botondeplanilla" id="murecr' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestreresumencreditode(1, this);">Resumen</a>'
				+   '<a class="botondeplanilla" id="nu' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte=0 onclick="ev13050903(1, this);">Nuevo</a>' 
				+   '<a class="botondeplanilla" id="el' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="eliminecliente(1, this);">Eliminar</a>'
				+   '<a class="botondeplanilla" id="sa' + arlFila[0] + '" fila="' + (fila*2 + 2) + '" idte="' + arlFila[0] + '" onclick="muestredatosde(1,this);" >' + arlFila[7] + '</a>' 
				+	'</div></td>';	
	}
	strHTMLFilas = document.getElementById('lstplanilla').innerHTML;
	arlFilas.splice(fila, 0, arlFila);	
	var strRegistre = -1 * matUsuario[0] + '|130004|'+ intReferenciado + '|';
	for (var i = 0; i < arlFilas.length; i ++ ) {
    	if ( i != 0 ) {
    		strRegistre += ',' + arlFilas[i][0];
    	} else  {
    		strRegistre += arlFilas[i][0];
    	}    	
    }
	var Gestor1 = new Gestor();	
    var intPriReg = Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 6 + ';' + strRegistre);	
    Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 5 + ';' + intReferenciado + '|' + intPriReg);
    Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 7 + ';' + intReferenciado + '|' + intPriReg + '|' + (-1 * matUsuario[0]));
    if ( matUsuario[4] > 4 ) {
		var Funcionario1 = new Funcionario();
		var Totales1 = new Totales();
		var strHTMLTotales = Funcionario1.ArrayATabla(Totales1.DetermineTotales(arlFilas, 130508), 'lstOperativa', 'tabOperativa');
		document.getElementById('lstTotales').innerHTML = strHTMLTotales;	
	}
	var intAsignacion = 1;
	for ( var i = 0; i < arlFilas.length; i ++ ) {
		if ( document.getElementById('id' + arlFilas[i][0]) ) { 
			document.getElementById('id' + arlFilas[i][0]).innerText = intAsignacion;
			document.getElementById('no' + arlFilas[i][0]).setAttribute('fila', intAsignacion);
			document.getElementById(arlFilas[i][0] + '|' + 2).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 3).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 4).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 5).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 11).setAttribute('fila', i);
			document.getElementById('muda' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));			
			document.getElementById('murecr' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));
			document.getElementById('sa' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));
			document.getElementById('nu' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));
			document.getElementById('el' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));	
			document.getElementById('cano' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));			
			intAsignacion += 1;
		}		 
	}
}

function ev13050904(paso, argumentos) {
	switch (paso) {
		case 1:
			if ( !HayInternet() ) { alert('No está conectado.'); argumentos.focus(); return; }
			if ( confirm('¿Seguro que desea reclasificar la cuenta?') == false ) { return; }			
			var arlArgumentos = new Array();
			arlArgumentos.push(2);
			arlArgumentos.push(argumentos.getAttribute('id'));
			arlArgumentos.push(argumentos.getAttribute('fila'));
			arlArgumentos.push(argumentos.getAttribute('clasedecliente'));
			arlArgumentos.push(argumentos.innerText);
			arlArgumentos.push(arlFilas[parseInt(arlArgumentos[2]) - 1][0]);
			document.getElementById('lstplanilla').rows[(parseInt(arlArgumentos[2])-1)*2 + 1].cells[0].innerHTML = '<a id="' + arlArgumentos[5] + '" class="botondeplanilla2">' + arlArgumentos[2] + '</a><img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></img><br>'
			var Gestor1 = new Gestor();
			var intValor =parseInt(prompt('Escriba 0 para cuenta normal; 1 o 2 para grados de difícil cobro', ''));
			if ( !IsNumeric(intValor) ) { return; }
			if ( intValor == arlArgumentos[3] ) { return; }
			if ( intValor > 5 || intValor < 0 ) { return; }
			if ( intValor != 0 ) { intValor = -1 * intValor; }
			arlArgumentos[3] = intValor;
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 130510 + '|' + arlArgumentos[5] + '|' + intValor + '|0|0|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev13050904', arlArgumentos);			
		break;
		case 2:
			var strClase = '';
			switch ( parseInt(argumentos[3]) ) {
				case 0:
					strClase = 'botondeplanilla2';
				break;
				case -1:
					strClase = 'botondeplanillarojo';
				break;
				case -2:
					strClase = 'botondeplanillaazul';
				break;
				case -3:
					strClase = 'botondeplanillaamarillo';					
				break;
				case -4:
					strClase = 'botondeplanillamorado';
				break;
				case -5:
					strClase = 'botondeplanillarosado';
				break;
			}			
			document.getElementById('lstplanilla').rows[(parseInt(argumentos[2])-1)*2 + 1].cells[0].innerHTML = '<a id="' + argumentos[5] + '" class="botondeplanilla2">' + argumentos[2] + '</a>'
																										+ '<a id="' + argumentos[1] + '" class="' + strClase + '" fila="' + argumentos[2] + '" clasedecliente="' + argumentos[3] + '" onclick="ev13050904(1, this);">' + argumentos[4] + '</a>';
			arlFilas[parseInt(argumentos[2]) - 1][10] = argumentos[3];
			document.getElementById(argumentos[5] + '|' + 2).setAttribute('clasedecliente', argumentos[3]);
			document.getElementById(argumentos[5] + '|' + 3).setAttribute('clasedecliente', argumentos[3]);
			document.getElementById(argumentos[5] + '|' + 4).setAttribute('clasedecliente', argumentos[3]);
			document.getElementById(argumentos[5] + '|' + 5).setAttribute('clasedecliente', argumentos[3]);
		break;
	}
}

function ev13050905(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	var intNuLu = ProceseValor(prompt('Escriba el nuevo lugar del cliente'));
	if ( intNuLu == 0 ) { return; }
	if ( ProceseValor(intNuLu) == argumentos ) { return; }	
	var arlFila = arlFilas[argumentos];
	arlFilas.splice(intNuLu, 0, arlFila);
	if ( intNuLu < argumentos ) {
		arlFilas.splice(argumentos + 1, 1);
	} else {
		arlFilas.splice(argumentos, 1);
	}	
	var strRegistre = -1 * matUsuario[0] + '|130004|'+ intReferenciado + '|';
	for (var i = 0; i < arlFilas.length; i ++ ) {
    	if ( i != 0 ) {
    		strRegistre += ',' + arlFilas[i][0];
    	} else  {
    		strRegistre += arlFilas[i][0];
    	}    	
    }
	var Gestor1 = new Gestor();	
    var intPriReg = Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 6 + ';' + strRegistre);
	Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 5 + ';' + intReferenciado + '|' + intPriReg);
    recargueaplicacion();
}

function ev13050906(paso, argumentos) {
	switch (paso) {
		case 0:
			argumentosauxiliares = argumentos;
			if ( matUsuario[4] > 4 ) { ev13050906(1, argumentosauxiliares); return; }
			if ( !HayInternet() ) { alert('No está conectado.'); argumentos.focus(); return; }			
			var Gestor1 = new Gestor();							
			Gestor1.DatosDeConsulta(13050906, argumentos.getAttribute('idte'), false, true, '', 'ev13050906', 1);			
			break;
		case 1:
			if ( matUsuario[4] < 5 ) { 
				if ( DateDiff(argumentos, FechaDeMYSQLConHora(new Date()), 'minutos') > 5 ) { alert('Ha pasado el tiempo máximo para corregir datos.'); return; } 
			}			
			if ( confirm('¿Seguro que desea eliminar las anotaciones actuales?') == false ) { return; }
			var Gestor1 = new Gestor();				
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|130509|' + argumentosauxiliares.getAttribute('idte') + '|0|0|0|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev13050906', 2);
		break;
		case 2:
			if ( IsNumeric(argumentos) ) {
				recargueaplicacion();
			} else {
				alert('No se pudo ejecutar el módulo de corrección.')
			}
		break;
	}
}

function muestretabla(paso, argumentos1) {	
	switch ( paso ) {
		case 1:	
			ConsulteYResponda("php/creetabla.php?q="+ strBaDa + ';' + argumentos1[0].getAttribute('tabla'), true, '', 'muestretabla', argumentos1);						
			argumentos1.push(argumentos1[0].outerHTML);
			document.getElementById(argumentos1[3]).rows[parseInt(argumentos1[1])].cells[parseInt(argumentos1[2])].innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></img><br>';				
		break;
		case 2:
			if ( strconsultaant == "php/creetabla.php?q="+ strBaDa + ';' + argumentos1[0].getAttribute('tabla') ) { strconsultaant = ''; }
			if ( argumentos1[3] == 'nada' ) {			
				document.getElementById(argumentos1[3]).rows[parseInt(argumentos1[1])].cells[parseInt(argumentos1[2])].innerHTML = argumentos1[4];
			} else {				
				var arlTabla = argumentos1[5].split(";");
				var strTabla = '<table class="lstCoincidencias">';	
				var intHasta = 1;
				switch ( argumentos1[0].getAttribute('tabla') ) {
					case 'retefuentes':
						intHasta = 2;
					break;
				}
				for ( var i = 0; i < arlTabla.length; i ++ ) {
					var arlTablaFila = arlTabla[i].split('|');					
					var a = argumentos1[0];					
					a.setAttribute('Tag', arlTablaFila[0]);										
					a.innerText = arlTablaFila[1];
					strTabla += '<tr Tag=' + arlTablaFila[0] + '>';
					for ( var j = 1; j <= intHasta; j ++ ) { strTabla += '<td>' + arlTablaFila[j] + '</td>'; }
					var ahora =  Date.now();
					if ( arlVariablesTemporales.length != 0 ) {	if (ahora = arlVariablesTemporales[arlVariablesTemporales.length - 1][0] ) { ahora += 1; } }					
					arlVariablesTemporales.push([ahora, a.outerHTML, arlTablaFila[0]]);
					strTabla += '<td><a tag="' + ahora + '" class="botondeplanilla" onclick="actualiceArrayFilas(this, ' + argumentos1[1] + ', ' + argumentos1[2] + ', \'' + argumentos1[3] + '\');">Usar</a></td></tr>';
				}
				strTabla += '</tabla';
				document.getElementById(argumentos1[3]).rows[parseInt(argumentos1[1])].cells[parseInt(argumentos1[2])].innerHTML = strTabla;				
			}
		break;
	}
}

function actualiceArrayFilas(sender, fila, columna, tabla) { 
	var intItemContenedor = 0;	
	if ( sender.tagName == 'INPUT' ) { 
		if ( sender.value == '' ) { return; }
		if ( sender.getAttribute('type') == 'text' ) {
			arlFilas[fila-1][columna] = sender.value;	
		} else {
			arlFilas[fila-1][columna] = 0; 
			if ( IsNumeric(sender.value) ) { 
				arlFilas[fila-1][columna] = parseFloat(sender.value);
				return;
			}
		}
	}
	for ( var i = 0; i < arlVariablesTemporales.length; i ++ ) {
		if ( sender.getAttribute('tag') == arlVariablesTemporales[i][0] ) {
			arlFilas[fila-1][1] = parseInt(arlVariablesTemporales[i][2]);
			document.getElementById(tabla).rows[parseInt(fila)].cells[parseInt(columna)].innerHTML = arlVariablesTemporales[i][1];
			arlVariablesTemporales.splice(i, 1);			
			return;
		}
	}	
}

function reorganiceparaajustedeinventario(paso, argumentos1) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }		
	var Gestor1 = new Gestor();	
	var booPisaronEnter = false;
	if ( paso == '3' ) {
		booPisaronEnter = true;
		paso = '1';
	}
	switch (paso) {
		case '1': 
			strHTMLFilas = '';
			document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
			if ( booPisaronEnter ) {
				Gestor1.DatosDeConsulta(22, argumentos1, false, true, 'plaPlanilla', 'reorganiceparaajustedeinventario', '2');
				return;
			}
			if ( !IsNumeric(argumentos1) ) {
				Gestor1.DatosDeConsulta(21, argumentos1, false, true, 'plaPlanilla', 'reorganiceparaajustedeinventario', '2');
			} else {								
				Gestor1.DatosDeConsulta(23, argumentos1, false, true, 'plaPlanilla', 'reorganiceparaajustedeinventario', '2');		
			}			
		break;
		case '2':			
			arlFilas = argumentos1
			for ( var i = 0; i < arlFilas.length; i ++ ) {
				arlFilas[i][4] = -1*arlFilas[i][2];
				arlFilas[i][6] = arlFilas[i][4] * arlFilas[i][5];				
				strHTMLFilas += '<tr tag=' + arlFilas[i][0] + ' id="fila' + (i+1) + '">';
				var arlFila = arlFilas[i];
				for ( var j = 0; j < arlFila.length; j ++) {
					switch (j) {						
						case 2:
							strHTMLFilas += '<td>' + arlFila[j] + '</td>';
						break;
						case 3: case 5: case 6: case 7: case 8:
							strHTMLFilas += '<td style="text-align: right;">' + NumeroFormateado(arlFila[j], 0) + '</td>';
						break;
						case 4: 			
							strHTMLFilas += '<td id="' + arlFila[1] + '-' + j + '" style="text-align: center;"><input type="number" id="' + arlFila[1] + "-" + j + '" tag="' + j + '" class="cajacredencial" fila="' + i + '" idarticulo="' + arlFila[1] + '" placeholder=0 style="width: 120px;" onblur="registreajustedeinventario(1, this);" ></input></td>';
						break;
					}
				}					
			}
			booEnCarga = false;
			document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstPlanilla" tag="' + intTipo + '">' + strHTMLColumnas + strHTMLFilas + '</table>';						
		break;
	}	
}

function registreajustedeinventario(paso, argumentos) {
	switch (paso) {
		case 1:		
			if ( argumentos.value == '' || argumentos.value == 0 ) { return; }
			var Gestor1 = new Gestor();
			document.getElementById('lstPlanilla').rows[parseInt(argumentos.getAttribute('fila')) + 1].cells[parseInt(argumentos.getAttribute('tag')) - 2].innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></img><br>';
			Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 140005, true, argumentos.getAttribute('id'), 'registreajustedeinventario', '2|' + argumentos.getAttribute('id') + '|' + argumentos.getAttribute('tag') + '|' + argumentos.value + '|' + argumentos.placeholder + '|' + argumentos.getAttribute('idarticulo') + '|' + argumentos.getAttribute('fila')) ;			
		break;
		case '2':			
			var arlArgumentos = argumentos.split("|");
			var Gestor1 = new Gestor();			
			var IdAd = parseInt(arlArgumentos[6]) + 1;
			Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 14 + ';' + (-1*matUsuario[0])  + '|' + IdAd + '|' + arlArgumentos[4] + '|' + arlArgumentos[2], true, arlArgumentos[0], 'registreajustedeinventario', 'conteo|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]);
			Gestor1.RegistreOcurrencia(140005, IdAd, matUsuario[0], 1, -1*matUsuario[0], 0, 0, 0, hoy(), hoy(), 'SP-' + IdAd, 'Conteo: ' + arlArgumentos[2], 140005, IdAd, true, '', '', '');
			//if ( strBaDa == 'mercavilla_freyaar') { Gestor1.Registre("php/registre.php?q=mercavilla_freyaarca;'" + 14 + ';' + (-1*matUsuario[0])  + '|' + arlArgumentos[6] + '|' + arlArgumentos[4] + '|' + arlArgumentos[2], true, arlArgumentos[0], 'registreajustedeinventario', 'conteo|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]); }
			//if ( strBaDa == 'mercavilla_freyaarca') { Gestor1.Registre("php/registre.php?q=mercavilla_freyaar;'" + 14 + ';' + (-1*matUsuario[0])  + '|' + arlArgumentos[6] + '|' + arlArgumentos[4] + '|' + arlArgumentos[2], true, arlArgumentos[0], 'registreajustedeinventario', 'conteo|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]); }			
		break;
		case '3':
			var arlArgumentos = argumentos.split("|");
            document.getElementById(arlArgumentos[1]).innerHTML = '<input type="number" id="' + arlArgumentos[1] + '" tag="' + arlArgumentos[2] + '" class="cajacredencial" fila="' + parseInt(arlArgumentos[6]) + '" placeholder="' + arlArgumentos[3] + '" idarticulo="' + arlArgumentos[5] + '" style="width: 120px; background-color: rgb(215, 228, 255);" onblur="registreajustedeinventario(1, this);"></input>';			
	}
}

function reorganiceparaactualizaciondepreciosenlista(paso, argumentos1) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }		
	var Gestor1 = new Gestor();	
	var booPisaronEnter = false;
	if ( paso == '3' ) {
		booPisaronEnter = true;
		paso = '1';
	}
	switch (paso) {
		case '1': 
			strHTMLFilas = '';
			document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
			if ( booPisaronEnter ) {
				Gestor1.DatosDeConsulta(19, argumentos1, false, true, 'plaPlanilla', 'reorganiceparaactualizaciondepreciosenlista', '2');
				return;
			}
			if ( !IsNumeric(argumentos1) ) {
				Gestor1.DatosDeConsulta(20, argumentos1, false, true, 'plaPlanilla', 'reorganiceparaactualizaciondepreciosenlista', '2');
			} else {								
				Gestor1.DatosDeConsulta(17, argumentos1, false, true, 'plaPlanilla', 'reorganiceparaactualizaciondepreciosenlista', '2');		
			}			
		break;
		case '2':			
			arlFilas = argumentos1
			for ( var i = 0; i < arlFilas.length; i ++ ) {
				strHTMLFilas += '<tr tag=' + arlFilas[i][0] + ' id="fila' + (i+1) + '">';
				var arlFila = arlFilas[i];
				for ( var j = 0; j < arlFila.length; j ++) {
					switch (j) {
						case 0:
							strHTMLFilas += '<td style="text-align: right;">' + (i+1) + '</td>';
						break;
						case 2:
							strHTMLFilas += '<td>' + arlFila[j] + '</td>';
						break;
						case 3: case 4: case 5: case 6:
							strHTMLFilas += '<td id="' + arlFila[1] + '-' + j +'" style="text-align: center;"><input type="number" id="' + arlFila[1] + "-" + j + '" tag="' + j + '" class="cajacredencial" fila="' + i + '" idarticulo="' + arlFila[1] + '" placeholder="' + arlFila[j] +'" style="width: 120px;" onblur="registreactualizaciondeprecio(1, this);" ></input></td>';
						break;
						case 7:
							arlFila[j] = DateDiff(arlFila[j], FechaDeMYSQL(Hoy()));						
							strHTMLFilas += '<td style="text-align: center;"><a class="botondeplanilla2">' + arlFila[j] + '</a></td>';
							//strHTMLFilas += '<td><a class="botondeplanilla" onclick="muestrehistorialactualizaciondeprecios(1, ' + arlFila[1] + ')">Historial</a></td>'
					}
				}					
			}
			booEnCarga = false;
			document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstPlanilla" tag="' + intTipo + '">' + strHTMLColumnas + strHTMLFilas + '</table>';						
		break;
	}	
}

function registreactualizaciondeprecio(paso, argumentos1) {
	switch (paso) {
		case 1:
			if ( argumentos1.value == '' || argumentos1.value == 0 ) { return; }
			var Gestor1 = new Gestor();
			document.getElementById('lstPlanilla').rows[parseInt(argumentos1.getAttribute('fila')) + 1].cells[parseInt(argumentos1.getAttribute('tag')) - 1].innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando2.gif" width=32 height=32></img><br>';
			Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 140002, true, argumentos1.getAttribute('id'), 'registreactualizaciondeprecio', '2|' + argumentos1.getAttribute('id') + '|' + argumentos1.getAttribute('tag') + '|' + argumentos1.value + '|' + argumentos1.placeholder + '|' + argumentos1.getAttribute('idarticulo') + '|' + argumentos1.getAttribute('fila')) ;			
		break;
		case '2':
			ConsulteYResponda("borreanterior");
			var arlArgumentos = argumentos1.split("|");
			var Gestor1 = new Gestor();
			var strCampo = '';
			switch (arlArgumentos[1]) {
				case '3':
					strCampo = 'precioa';
				break;
				case '4':
					strCampo = 'preciob';
				break;
				case '5':
					strCampo = 'precioc';
				break;
				case '6':
					strCampo = 'preciod';
				break;
			}
			var IdAd = parseInt(arlArgumentos[6]) + 1;
			Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 12 + ';' + arlArgumentos[4] + '|' + strCampo + '|' + arlArgumentos[2], true, arlArgumentos[0], 'registreactualizaciondeprecio', 'actualizacion|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]);
			Gestor1.RegistreOcurrencia(140002, IdAd, matUsuario[0], parseInt(arlArgumentos[4]), -1*matUsuario[0], 0, 0, 0, hoy(), hoy(), 'SP-' + IdAd, 'Precio nuevo: ' + arlArgumentos[2], 140003, IdAd, true, '', '', '');
			if ( strBaDa == 'mercavilla_freyaar') { 
				Gestor1.Registre("php/registre.php?q=mercavilla_freyaarca;" + 12 + ';' + arlArgumentos[4] + '|' + strCampo + '|' + arlArgumentos[2]  + '|' + arlArgumentos[3], true, arlArgumentos[0], 'registreactualizaciondeprecio', 'actualizacion|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]); 
				Gestor1.Registre("php/registre.php?q=mercavilla_campofruver;" + 12 + ';' + arlArgumentos[4] + '|' + strCampo + '|' + arlArgumentos[2]  + '|' + arlArgumentos[3], true, arlArgumentos[0], 'registreactualizaciondeprecio', 'actualizacion|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]); 
			}
			if ( strBaDa == 'mercavilla_freyaarca') { 
				Gestor1.Registre("php/registre.php?q=mercavilla_freyaar;" + 12 + ';' + arlArgumentos[4] + '|' + strCampo + '|' + arlArgumentos[2]  + '|' + arlArgumentos[3], true, arlArgumentos[0], 'registreactualizaciondeprecio', 'actualizacion|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]); 
				Gestor1.Registre("php/registre.php?q=mercavilla_campofruver;" + 12 + ';' + arlArgumentos[4] + '|' + strCampo + '|' + arlArgumentos[2]  + '|' + arlArgumentos[3], true, arlArgumentos[0], 'registreactualizaciondeprecio', 'actualizacion|' + arlArgumentos[0] + '|' + arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5]); 
			}			
		break;
	}
}

function ev413594(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	switch (paso) {
		case 1:
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(413594, hoy(), false, true, '', 'ev413594', 2);		
			arlFilas.length = 0;
			arlFilas.push(0);
			arlFilas.push(0);
			arlFilas.push(hoy());
			arlFilas.push(FechaDeMYSQL(DateAdd(Hoy(), 730)));
			arlFilas.push(1);
			arlFilas.push(1);
			arlFilas.push('');
			document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstplanilla"><tr><td>Datos</td><td>Valores</td></tr>'
						  + '<tr><td>N&uacute;mero de resoluci&oacute;n</td><td id="nure" style="text-align: center;"><input type="number" class="cajastandar" id="txtnure" placeholder="187600000000" style="width: 80%;" onblur="ev41359402(1, this)"></input></td></tr>'
						  + '<tr><td>Equipo</td><td id="eq"  style="text-align: center;"><img style="margin-top: 20px;" src="imagenes/cargando.gif" width=150 height=200></img></td></tr>'
						  + '<tr><td>Fecha de expedici&oacute;n</td><td id="feex"  style="text-align: center;"><input type="number" class="cajastandar" id="txtfeexdi" placeholder="Día" style="width: 10%;" onblur="ev41359402(1, this)"></input><input type="number" class="cajastandar" id="txtfeexme" placeholder="Mes" style="width: 10%;" onblur="ev41359402(1, this)"></input><input type="number" class="cajastandar" id="txtfeexan" placeholder="Año" style="width: 10%;" onblur="ev41359402(1, this)"></input></td></tr>'
						  + '<tr><td>Fecha de vencimiento</td><td id="feve" style="text-align: center;"><input type="number" class="cajastandar" id="txtfevedi" placeholder="Día" style="width: 10%;" onblur="ev41359402(1, this)"></input><input type="number" class="cajastandar" id="txtfeveme" placeholder="Mes" style="width: 10%;" onblur="ev41359402(1, this)"></input><input type="number" class="cajastandar" id="txtfevean" placeholder="Año" style="width: 10%;" onblur="ev41359402(1, this)"></input></td></tr>'
						  + '<tr><td>Consecutivo inicial</td><td id="coin" style="text-align: center;"><input type="number" class="cajastandar" id="txtcoin" placeholder="1" style="width: 20%;" onblur="ev41359402(1, this)"></input></td></tr>'
						  + '<tr><td>Consecutivo final</td><td id="cofi" style="text-align: center;"><input type="number" class="cajastandar" id="txtcofi" placeholder="1" style="width: 20%;" onblur="ev41359402(1, this)"></input></td></tr>'
						  + '<tr><td>Texto definitivo</td><td id="tede" style="text-align: center;"><textarea class="cajastandar" id="txttede" rows="6" cols="40" style="width: 80%;"></textarea> </img></td></tr>'
						  + '</table>';			
			document.getElementById('txtfeexdi').value = DiaDe(arlFilas[2]);
			document.getElementById('txtfeexme').value = MesDe(arlFilas[2]);
			document.getElementById('txtfeexan').value = AñoDe(arlFilas[2]);
			document.getElementById('txtfevedi').value = DiaDe(arlFilas[3]);
			document.getElementById('txtfeveme').value = MesDe(arlFilas[3]);
			document.getElementById('txtfevean').value = AñoDe(arlFilas[3]);								
		break;
		case 2:
			if ( argumentos == 'nada' ) {
				document.getElementById('plaPlanilla').innerHTML = '';
				alert('No se pudo obtener información sobre las cajas');
				return;
			} else {
				var strHTMLCajas = '<table class="lstOperativa" id="lstcajas"><tr><td></td><td>Caja</td><td>Prefijo</td><td span=2>Autorizado</td><td>Usar</td></tr>';
				for ( var i = 0; i < argumentos.length; i ++ ) {
					argumentos[i][0] = i + 1;
					strHTMLCajas += '<tr><td style="text-align: right;">' + (i+1) + '</td>'
										+ '<td style="text-align: center;">' + argumentos[i][1] + '</td>'
										+ '<td style="text-align: center;">' + argumentos[i][2] + '</td>'
										+ '<td style="text-align: right;">' + argumentos[i][3] + '</td>'
										+ '<td style="text-align: right;">' + argumentos[i][4] + '</td>'
										+ '<td id="caja' + (i+1) + '" style="text-align: left;"><a tag="' + (i+1) + '" class="botondeplanilla"  no="' +  argumentos[i][1] + '" pr="' +  argumentos[i][2] + '" in="' +  argumentos[i][3] + '" fi="' +  argumentos[i][4] + '" onclick="ev41359401(1, this);">Usar</a></td></tr>';
				}
				strHTMLCajas += '</table>';
				document.getElementById('eq').innerHTML = strHTMLCajas;
			}
		break;		
	}		
}

function ev41359401(paso, argumentos) {
	document.getElementById('eq').innerHTML = '<a id="aelegido" class="botondeplanilla2" tag="' + argumentos.getAttribute('tag') + '" pr="' + argumentos.getAttribute('pr') + '">' + argumentos.getAttribute("no") + '</a><a class="botondeplanilla" onclick="ev413594(1, 0);">Cambiar</a>';
	document.getElementById('aelegido').setAttribute('tag', argumentos.getAttribute('tag'));
}

function ev41359402(paso, argumentos) {
	var strMes = '';	
	switch (document.getElementById('txtfeexme').value) {
		case '1': strMes = 'enero';	break;
		case '2': strMes = 'febrero'; break;
		case '3': strMes = 'marzo';	break;
		case '4': strMes = 'abril';	break;
		case '5': strMes = 'mayo'; break;
		case '6': strMes = 'junio';	break;
		case '7': strMes = 'julio';	break;
		case '8': strMes = 'agosto'; break;
		case '9': strMes = 'septiembre'; break;
		case '10': strMes = 'octubre'; break;
		case '11': strMes = 'noviembre'; break;
		case '12': strMes = 'diciembre'; break;		
	}
	var strMesVe = '';
	switch (document.getElementById('txtfeveme').value) {
		case '1': strMesVe = 'enero';	break;
		case '2': strMesVe = 'febrero'; break;
		case '3': strMesVe = 'marzo';	break;
		case '4': strMesVe = 'abril';	break;
		case '5': strMesVe = 'mayo'; break;
		case '6': strMesVe = 'junio';	break;
		case '7': strMesVe = 'julio';	break;
		case '8': strMesVe = 'agosto'; break;
		case '9': strMesVe = 'septiembre'; break;
		case '10': strMesVe = 'octubre'; break;
		case '11': strMesVe = 'noviembre'; break;
		case '12': strMesVe = 'diciembre'; break;		
	}	
	arlFilas[0] = document.getElementById('txtnure').value;
	arlFilas[1] = document.getElementById('aelegido').getAttribute('tag');
	arlFilas[2] = document.getElementById('txtfeexan').value + '-' + document.getElementById('txtfeexme').value + '-' + document.getElementById('txtfeexdi').value;
	arlFilas[3] = document.getElementById('txtfevean').value + '-' + document.getElementById('txtfeveme').value + '-' + document.getElementById('txtfevedi').value;
	arlFilas[4] = document.getElementById('txtcoin').value;
	arlFilas[5] = document.getElementById('txtcofi').value;
	document.getElementById('txttede').value = 'Resolucion de Facturacion Numero ' + document.getElementById('txtnure').value
											 + ' del ' + document.getElementById('txtfeexdi').value + ' de ' + strMes + ' de ' + document.getElementById('txtfeexan').value + ' al '  + document.getElementById('txtfevedi').value + ' de ' + strMesVe + ' de ' + document.getElementById('txtfevean').value
											 + ' para los consecutivos ' + document.getElementById('txtcoin').value + ' al ' + document.getElementById('txtcofi').value
											 + ' con el prefijo ' + document.getElementById('aelegido').getAttribute('pr');
											 	arlFilas[6] = document.getElementById('txttede').value;
	arlFilas[6] = document.getElementById('txttede').value;
}

function ev41359403(paso, argumentos) {
	switch (paso) {
		case 1:
			if ( arlFilas[0] === 0 ) { alert('Por favor, escriba el número de la resolución de facturación.'); return; }
			if ( arlFilas[1] === 0 ) { alert('Por favor, elija una caja de la lista.'); return; }	
			if ( !IsDate(Fecha(arlFilas[2])) ) {alert('Por favor, verifique que la fecha de expedición sea una fecha correcta.'); return; }
			if ( !IsDate(Fecha(arlFilas[3])) ) {alert('Por favor, verifique que la fecha de expedición sea una fecha correcta.'); return; }
			if ( arlFilas[4] <= 0 ) { alert('Por favor, escriba un consecutivo inicial válido'); return; }
			if ( arlFilas[5] <= 0 ) { alert('Por favor, escriba un consecutivo final válido'); return; }
			if ( arlFilas[6] === '' ) { alert('Por favor, escriba un texto definitivo.'); return; }
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 413594 + '|' + arlFilas[1] + '|' + arlFilas[4] + '|' + arlFilas[5] + '|' + arlFilas[0] + '|' + arlFilas[6] + '||' + arlFilas[2] + '|' + arlFilas[3] + '|' + matUsuario[0], false, true, '', 'ev41359403', 2);	
			document.getElementById('lnkRegistrar').innerHTML = '<img id="imgBoton1" src="imagenes/cargando2.gif" style="padding-top: 30px; margin-right: 50px;" width=64 height=64 alt="" />';	
		break;
		case 2:
			switch (argumentos) {
				case 'nada':
					alert('La resolución, no pudo ser registrada');
					document.getElementById('lnkRegistrar').innerHTML = '<a class="link" style="margin-right: 50px; margin-top: 20px;" onclick="lnkRegistrar_Click();">Registrar</a>';
				break;
				default:
					alert('La resolución, ha sido registrada con éxito.');
						recargueaplicacion();										
				break;
			}			
		break;
	}	
}

function ev414016(paso, argumentos) {
	
}

function ev414019(paso, argumentos) {
	switch ( paso ) {
		case 1:
			if ( dwArticulos.length == 0 ) { ConsulteYResponda("php/creetabla.php?q=" + strBaDa + ";articulos", false, '', 'creetabla', 'articulos'); }
			//strHTMLColumnas = '<tr><td>Ref</td><td>Producto</td><td>Nota</td><td>Can</td><td>Precio</td></tr>';			
			strHTMLColumnas = '<tr><td>Producto</td><td>Can</td><td>Precio</td></tr>';			
			arlFilas.length = 0;
			strHTMLFilas = '';
			for ( var i = 0; i < dwArticulos.length; i ++ ) {
				var arlArticulo = new Array();
				arlArticulo.push(dwArticulos[i][0]); arlArticulo.push(dwArticulos[i][1]); arlArticulo.push(0); arlArticulo.push(ProceseValor(dwArticulos[i][5])); arlArticulo.push(0);
				arlFilas.push(arlArticulo);
				//strHTMLFilas += '<tr><td style="font-size: 32px;">' + dwArticulos[i][3] + '</td><td style="font-size: 32px;">' + dwArticulos[i][1] + '</td><td style="font-size: 32px;"><input type="text" id="txtnota' + i + '" class="cajacredencial" fila=' + i + ' style="width: 200px;" onblur="ev41401901(1, this);"></input> </td><td style="font-size: 32px;"><table><tr><td><img fila=' + i + ' src="imagenes/restar.png" onclick="ev41401902(1, this);" /></td><td><input type="number" id="txtcan' + i + '" class="cajacredencial" fila=' + i + ' style="width: 60px;" onblur="ev41401901(1, this);"></input></td><td><img  fila=' + i + ' src="imagenes/adicionar.png" onclick="ev41401902(1, this);"" /></td></tr></table></td><td style="font-size: 32px;">' + dwArticulos[i][5] + '</td></tr>';				
				//La linea comentada equivale a la siguiente, pero tiene más campos
				strHTMLFilas += '<tr><td style="font-size: 32px;">' + dwArticulos[i][1] + '</td><td style="font-size: 32px;"><table><tr><td><img fila=' + i + ' src="imagenes/restar.png" onclick="ev41401902(1, this);" /></td><td><input type="number" id="txtcan' + i + '" class="cajacredencial" fila=' + i + ' style="width: 60px;" onblur="ev41401901(1, this);"></input></td><td><img  fila=' + i + ' src="imagenes/adicionar.png" onclick="ev41401902(1, this);"" /></td></tr></table></td><td style="font-size: 32px;">' + dwArticulos[i][5] + '</td></tr>';				
			}
			var Gestor1 = new Gestor();
			document.getElementById('plaPlanilla').innerHTML = '<table class="lstOperativa" id="lstplanilla">' + strHTMLColumnas + strHTMLFilas + '</table>';
			for ( var i = 0; i < dwArticulos.length; i ++ ) {
				Gestor1.DatosDeConsulta(414019, intReferenciado + '|' + arlFilas[i][0], false, true, '', 'ev41401902', i);				
			}			
		break;
		case 2:
			var intFila = parseInt(argumentos[0][0]);
			arlFilas[intFila][2] = ProceseValor(argumentos[0][1]);
			arlFilas[intFila][3] = ProceseValor(argumentos[0][2]);
			//document.getElementById('txtcan' + intFila).value = arlFilas[intFila][1];
			//document.getElementById('txtnota' + intFila).value = arlFilas[intFila][2];
			document.getElementById('txtcan' + intFila).setAttribute('placeholder', arlFilas[intFila][2])
			//document.getElementById('txtnota' + intFila).setAttribute('placeholder', arlFilas[intFila][3]);
			var Funcionario1 = new Funcionario();
			var Totales1 = new Totales();
			document.getElementById('lstTotales').innerHTML = Funcionario1.ArrayATabla(Totales1.DetermineTotales(arlFilas, 414019), 'lstOperativa', 'tabOperativa');
		break;
	}
}

function ev41401901(paso, argumentos) {
	switch ( paso ) {
		case 1:
			if ( argumentos.value == '' ) { return; }
			argumentos.setAttribute("placeholder", argumentos.value);
			var intFila = parseInt(argumentos.getAttribute('fila'));
			var Gestor1 = new Gestor();
			arlFilas[intFila][2] = ProceseValor(document.getElementById('txtcan' + intFila).value);
//			arlFilas[intFila][2] = document.getElementById('txtnota' + intFila).value;		
			argumentos.value = '';
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 414019 + '|' + intReferenciado + '|' + arlFilas[intFila][0] + '|' + arlFilas[intFila][2] + '|'+ dwArticulos[intFila][5] + '||' + arlFilas[intFila][3] + '|' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev41401901', argumentos);
		break;
		case 2:	
			argumentos.style.backgroundColor = ColorRGB(150, 250, 150); 
			var Funcionario1 = new Funcionario();
			var Totales1 = new Totales();
			document.getElementById('lstTotales').innerHTML = Funcionario1.ArrayATabla(Totales1.DetermineTotales(arlFilas, 414019), 'lstOperativa', 'tabOperativa');
		break;
	}	
}

function ev41401902(paso, argumentos){
	var intFila = parseInt(argumentos.getAttribute('fila'));
	var douCantidad = ProceseValor(document.getElementById('txtcan' + intFila).getAttribute("placeholder"));
	var strSource = argumentos.getAttribute("src");
	if ( strSource.indexOf('imagenes/adicionar') != -1 ) {
		douCantidad = douCantidad + 1;
	} else {		
		douCantidad = douCantidad - 1;
		if ( douCantidad < 0 ) { douCantidad = douCantidad + 1; }
	}
	document.getElementById('txtcan' + intFila).value = douCantidad;
	document.getElementById('txtcan' + intFila).style.backgroundColor = ColorRGB(240, 240, 240);
	ev41401901(1, document.getElementById('txtcan' + intFila));
}

function ev414020(paso, argumentos) {
	switch ( paso ) {
		case 1:
			var Gestor1 = new Gestor();
			var arlArgumentos = []; arlArgumentos.push(1);
			Gestor1.DatosDeConsulta(414020, intReferenciado, false, true, '', 'ev414020', arlArgumentos);
		break;
		case 2:
			var elementos = argumentos[1];
			var strt = '<table class="lstOperativa" id="lstplanilla">';
			if ( elementos.length > 0 ) { strt += '<tr><td>Articulo</><td>Cant</td><td>Valor</td><td>Costo</td><td>Precio</td></tr>'; }
			for (var i = 0; i < elementos.length-1; i ++ ) {
				var stratri = ' type="number" eoid=0 pdid=0 arid=' + elementos[i][2] + ' placeholder=0 onblur="ev41402002(1, this);"';
				var strstyl = ' style="max-width: 180px;" class="cajacredencial"';
				strt += '<tr id="tr' + i + '"' + stratri + '>'
					  +	'	<td>' + elementos[i][3] + '</td>'
					  + '	<td><input id="ca' + i + '" ti="ca"' + stratri + strstyl + '/></td>'
					  + '	<td><input id="va' + i + '" ti="va"' + stratri + strstyl + '/></td>'
					  +	'	<td style="text-align: right;">0</td>'					  
					  + '	<td><input id="pr' + i + '" ti="pr"' + stratri + strstyl + '/></td>'
					  + '</tr>';
			}
			strt += '</table>';
			document.getElementById('plaPlanilla').innerHTML = strt;
			var Gestor1 = new Gestor();						
			Gestor1.DatosDeConsulta(414021, intReferenciado, false, true, '', 'ev414020', argumentos);
		break;
		case 3:
			var Gestor1 = new Gestor();
			if ( argumentos[2] == 0 ) {
				argumentos[0] = 2; argumentos.shift();
				Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 414020 + '|' + intReferenciado + '|0|0|10|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev414020', argumentos);
			} else {
				for ( var i = 1; i < document.getElementById('plaPlanilla').getElementsByTagName('tbody')[0].rows.length-1; i ++ ){
					document.getElementById('tr' + i).setAttribute('eoid', argumentos[2][0]);
					document.getElementById('ca' + i).setAttribute('eoid', argumentos[2][0]);
					document.getElementById('va' + i).setAttribute('eoid', argumentos[2][0]);
					document.getElementById('pr' + i).setAttribute('eoid', argumentos[2][0]);
				}
				Gestor1.DatosDeConsulta(41402001, argumentos[2][0], false, true, '', 'ev414020', argumentos);
			}			
		break;		
		case 4:
			for ( var i = 0; i < argumentos[3].length; i ++ ) {
				for ( var j = 0; document.getElementById('plaPlanilla').getElementsByTagName('tbody')[0].rows.length; j ++ ) {
					if ( document.getElementById('tr' + j).getAttribute('idar') == argumentos[3][i][1] ) {
						document.getElementById('tr' + j).setAttribute('pdid', argumentos[3][i][0]);
						document.getElementById('ca' + j).setAttribute('pdid', argumentos[3][i][0]);
						document.getElementById('va' + j).setAttribute('pdid', argumentos[3][i][0]);
						document.getElementById('pr' + j).setAttribute('pdid', argumentos[3][i][0]);
					}
				}
			}
		break;
	}
}

function ev41402002(paso, argumentos) {
	switch ( paso ) {
		case 1:
			var Gestor1 = new Gestor();
			var arlArgs = []; arlArgs.push(0); arlArgs.push(argumentos);
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 41402002 + '|' + argumentos.getAttribute('pdid') + '|' + argumentos.value + '|' + argumentos.getAttribute('idar') + '|' + argumentos.getAttribute('eoid') + '|' + argumentos.getAttribute('ti') + '||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev41402002', arlArgs);
		break;
		case 2:

		break;
	}
}

function cambiarnombrealtercero(paso, argumentos) {
	switch ( paso ) {
		case 1:
			if ( !HayInternet() ) { alert('No está conectado.'); return; }
			if ( matUsuario[4] > 5 ) {
				var idtercero = argumentos.getAttribute('idte');
				var fila = argumentos.getAttribute('fila');
				var no = prompt('Escriba el nombre nuevo del cliente', document.getElementById('no' + idtercero).innerText);
				if ( no.length < 5 ) { alert('El nombre asignado, no es aceptable.'); return; }
				var Gestor1 = new Gestor();
				Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 16 + ';' + idtercero + ',' + no, true, '', 'cambiarnombrealtercero', idtercero);		
			} else {
				cambiarnombrealtercero(2, argumentos.getAttribute('idte'));
			}			
		break;
		case 2:
			if ( matUsuario[4] > 4 ) { alert('El Nombre fue cambiado correctamente.'); }
			if ( confirm('¿Desea cambiar más datos de la persona?') == false ) { return; }
			var Gestor1 = new Gestor();
			var arlDatos = Gestor1.DatosDeConsulta(12, argumentos);			
			var tel = prompt('Escriba el nuevo teléfono del cliente.', arlDatos[0][1]);
			var dir = prompt('Escriba la nueva dirección del cliente.', arlDatos[0][2]);
			Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 17 + ';' + argumentos + ',' + dir + ',' + tel, true, '', 'cambiardatosaltercero', '2|||');
			break;
	}		
}

function imprimacambio(fila) {		
	var ventimp=window.open(' ','popimpr');
	//document.getElementById('fila' + fila).innerHTML + '<br>' + document.getElementById('fila' + (fila + 1)).innerHTML
	strHTMLImpresion = '<!DOCTYPE html>'
					 + '	<body>'
					 + '		<table>'
					 + document.getElementById('fila' + fila).outerHTML + document.getElementById('fila' + (fila + 1)).outerHTML
					 + '		</table'
					 + '	</body>'
					 + '</html>';
	ventimp.document.write(strHTMLImpresion);
	ventimp.document.close();
	ventimp.print();
	ventimp.close();
}

function eliminecliente(paso, argumentos) {	
	if ( matUsuario[4] < 6 ) { return; }
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	var idtercero = argumentos.getAttribute('idte');
	var fila = argumentos.getAttribute('fila');
	var eliminetotal = 0;
	if ( confirm('¿Seguro que desea eliminar al cliente de la lista?') == false ) { return; }
	var Gestor1 = new Gestor();	
	Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 8 + ';' + idtercero + '|' + intReferenciado);	
	Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 9 + ';' + idtercero + '|' + intReferenciado + '|' + (-1 * matUsuario[0]));
	var arlArgs = []; arlArgs.push(0); arlArgs.push(argumentos);
	if ( confirm('¿Desea eliminar TODO EL HISTORIAL del cliente?') == true ) { Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|' + 130599 + '|' + idtercero + '|0|0|0|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'ev130599', arlArgs); }
	document.getElementById('lstplanilla').deleteRow(fila);
	document.getElementById('lstplanilla').deleteRow(fila - 1);
	arlFilas.splice((fila - 2)/2, 1);
	var intAsignacion = 1;
	for ( var i = 0; i < arlFilas.length; i ++ ) {
		if ( document.getElementById('id' + arlFilas[i][0]) ) {
			document.getElementById('id' + arlFilas[i][0]).innerText = intAsignacion;
			document.getElementById('no' + arlFilas[i][0]).setAttribute('fila', intAsignacion);
			document.getElementById(arlFilas[i][0] + '|' + 2).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 3).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 4).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 5).setAttribute('fila', i);
			document.getElementById(arlFilas[i][0] + '|' + 11).setAttribute('fila', i);
			document.getElementById('muda' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));			
			document.getElementById('murecr' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));
			document.getElementById('sa' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));
			document.getElementById('nu' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));
			document.getElementById('el' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));	
			document.getElementById('cano' + arlFilas[i][0]).setAttribute('fila', (i*2 + 2));			
			intAsignacion += 1;
		}			 
	}
	if ( matUsuario[4] > 4 ) {
		var Funcionario1 = new Funcionario();
		var Totales1 = new Totales();
		var strHTMLTotales = Funcionario1.ArrayATabla(Totales1.DetermineTotales(arlFilas, 130508), 'lstOperativa', 'tabOperativa');
		document.getElementById('lstTotales').innerHTML = strHTMLTotales;	
	}
}

function imprSelec(elemento) {
	var ficha=document.getElementById(elemento);
	var ventimp=window.open(' ','popimpr');
	ventimp.document.write(ficha.innerHTML);
	ventimp.document.close();
	ventimp.print();
	ventimp.close();
}

function muestredatosde(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	var idtercero = argumentos.getAttribute('idte');	
	var Gestor1 = new Gestor();
	var arlDatos = Gestor1.DatosDeConsulta(12, idtercero);
	alert(arlDatos[0][0] + '\n' + arlDatos[0][1] + '\n' + arlDatos[0][2]);
}

function muestreresumencreditode(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	var idtercero = argumentos.getAttribute('idte');
	var fila = argumentos.getAttribute('fila');	
	var Gestor1 = new Gestor();	
	var arlResumen = Gestor1.DatosDeConsulta(13, idtercero);	
	var douSaldo = 0;
	if ( arlResumen.length != 0 ) {		
		var Funcionario1 = new Funcionario();
		var strHTML = '<td style="text-align: center;" colspan=8>' + Funcionario1.ArrayATabla(arlResumen, 'lstCoincidencias', 'resumen');		
		strHTMLAnterior = document.getElementById('fila' + fila).innerHTML;
		strHTML += '<br /><a class="boton" onclick="carguehtmlanterior(' + fila + ');">Quitar</a></td>';
		document.getElementById('fila' +  fila).innerHTML = strHTML;
	} else {
		alert('No se halló registros de movimientos para el cliente seleccionado.');
	}
}

function carguehtmlanterior(fila) {
	document.getElementById('fila' + fila).innerHTML = strHTMLAnterior;
	document.getElementById('fila' + (fila-1)).scrollIntoView();
}

function registreParaActualizacionDeCreditoDePersona(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }	
	if ( !EsInsercionValida(sender) ) { return; }	
	if ( ProceseValor(sender.value) < 0 ) { return; }
	if ( movimientosdecarteradesautorizados() ) { 
		alert('El sistema de actualización de cartera está temporalmente deshabilidado.');
		return;
	}
	var arlId = sender.getAttribute('id').split("|");	
	strInsercionAnterior = sender.getAttribute('id') + sender.value;
	var arlId = sender.getAttribute('id').split("|");
	if (arlId[1] == 3 ){
		if ( ProceseValor(sender.value) > arlFilas[parseInt(sender.getAttribute('fila'))][5] ) {
			alert('No se puede abonar un valor superior al de la deuda del tercero');
			return;
		}		
	}		
	var Gestor1 = new Gestor();
	var intOcurrencia = 0;
	var arlId = sender.getAttribute("id").split("|");
	var intRegistrosExitosos = 0;
	var intSubCuentaDeLaCuenta = 130505;
	if ( sender.getAttribute('clasedecliente') == -1 ) { intSubCuentaDeLaCuenta = 139001; }	
	if ( arlId[1] == 3 ) {
			intOcurrencia = Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 130506) + 1;			
			if ( Gestor1.RegistreOcurrencia(130506, intOcurrencia, matUsuario[0], arlId[0], -1 * matUsuario[0], sender.value, 0, 0, hoy(), sender.getAttribute('vence'), '', '', 130508, intOcurrencia) != 0 ) { intRegistrosExitosos += 1; }			
			if ( Gestor1.RegistreMovimiento(130506, intOcurrencia, 130508, intOcurrencia, intSubCuentaDeLaCuenta, arlId[0], 1, sender.value) != 0 ) { intRegistrosExitosos += 1; }
			intOcurrenciaIngreso = Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 110505) + 1;			
			if ( Gestor1.RegistreOcurrencia(110505, intOcurrenciaIngreso, matUsuario[0], arlId[0], -1 * matUsuario[0], sender.value, 0, 0, hoy(), hoy(), '', '', 130508, intOcurrencia) != 0 ) { intRegistrosExitosos += 1; }			
			if ( Gestor1.RegistreMovimiento(110505, intOcurrenciaIngreso, 130508, intOcurrencia, 110505, -1 * matUsuario[0], 0, sender.value) != 0 ) { intRegistrosExitosos += 1; }
	}
	if ( arlId[1] == 4 ) {
			intOcurrencia = Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 130505) + 1;
			if ( Gestor1.RegistreOcurrencia(130505, intOcurrencia, matUsuario[0], arlId[0], -1 * matUsuario[0], sender.value, 0, 0, hoy(), FechaDeMYSQL(DateAdd(Hoy(), 30)), '', '', 130508, intOcurrencia) != 0 ) { intRegistrosExitosos += 1; }
			document.getElementById('lstplanilla').rows[parseInt(sender.getAttribute('fila')) * 2 + 1].cells[6].innerHTML = '<a class="botondeplanilla2">' + FechaDeMYSQL(DateAdd(Hoy(), 30)) + '</a>';
			if ( Gestor1.RegistreMovimiento(130505, intOcurrencia, 130508, intOcurrencia, intSubCuentaDeLaCuenta, arlId[0], 0, sender.value) != 0 ) { intRegistrosExitosos += 1; }	
			intOcurrenciaEgreso = Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 110506) + 1;			
			if ( Gestor1.RegistreOcurrencia(110506, intOcurrenciaEgreso, matUsuario[0], arlId[0], -1 * matUsuario[0], sender.value, 0, 0, hoy(), hoy(), '', '', 130505, intOcurrencia) != 0 ) { intRegistrosExitosos += 1; }			
			if ( Gestor1.RegistreMovimiento(110506, intOcurrenciaEgreso, 130505, intOcurrencia, 110505, -1 * matUsuario[0], 1, sender.value) != 0 ) { intRegistrosExitosos += 1; }
	}
	if ( arlId[1] == 8 ) {
			intOcurrencia = Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 421005) + 1;
			if ( Gestor1.RegistreOcurrencia(421005, intOcurrencia, matUsuario[0], arlId[0], -1 * matUsuario[0], sender.value, 0, 0, hoy(), FechaDeMYSQL(DateAdd(Hoy(), 30)), '', '', 421005, intOcurrencia) != 0 ) { intRegistrosExitosos += 1; }
			document.getElementById('lstplanilla').rows[parseInt(sender.getAttribute('fila')) * 2 + 1].cells[6].innerHTML = '<a class="botondeplanilla2">' + FechaDeMYSQL(DateAdd(Hoy(), 30)) + '</a>';
			if ( Gestor1.RegistreMovimiento(421005, intOcurrencia, 421005, intOcurrencia, intSubCuentaDeLaCuenta, arlId[0], 0, sender.value) != 0 ) { intRegistrosExitosos += 1; }	
			intOcurrenciaEgreso = Gestor1.UltimaOcurrenciaDe(-1 * matUsuario[0], 110506) + 1;			
			if ( Gestor1.RegistreOcurrencia(110506, intOcurrenciaEgreso, matUsuario[0], arlId[0], -1 * matUsuario[0], sender.value, 0, 0, hoy(), hoy(), '', '', 421005, intOcurrencia) != 0 ) { intRegistrosExitosos += 1; }			
			if ( Gestor1.RegistreMovimiento(110506, intOcurrenciaEgreso, 421005, intOcurrencia, 110505, -1 * matUsuario[0], 1, sender.value) != 0 ) { intRegistrosExitosos += 1; }
	}	
	if ( intRegistrosExitosos == 4 ) { 
		var intFila =  parseInt(sender.getAttribute('fila'));
		arlFilas[intFila][arlId[1]] = ProceseValor(sender.value) + ProceseValor(sender.getAttribute('placeholder'));
		arlFilas[intFila][5] =  arlFilas[intFila][2] - arlFilas[intFila][3] + ProceseValor(arlFilas[intFila][4]) + ProceseValor(arlFilas[intFila][8]);
		document.getElementById('lstplanilla').rows[intFila * 2 + 1].cells[4].innerText = arlFilas[intFila][5];
		sender.style.backgroundColor = ColorRGB(150, 250, 150);
		sender.setAttribute('placeholder', arlFilas[intFila][arlId[1]]);
		sender.value = '';
		if ( matUsuario[4] > 4 ) {
			var Funcionario1 = new Funcionario();
			var Totales1 = new Totales();
			var strHTMLTotales = Funcionario1.ArrayATabla(Totales1.DetermineTotales(arlFilas, 130508), 'lstOperativa', 'tabOperativa');
			document.getElementById('lstTotales').innerHTML = strHTMLTotales;	
		}
	} else {
		sender.style.backgroundColor = ColorRGB(250, 150, 150); 		
	}
}

function movimientosdecarteradesautorizados() {	
	var booRetorno = false;
	var Gestor1 = new Gestor();
	var matRespuesta = Gestor1.DatosDeConsulta(15, 'esdificilentender');
	if ( matRespuesta.length == 0 ) { return true; }
	if ( matRespuesta[0][0] == '904201' ) { booRetorno = true; }
	if ( booRetorno ) {
		var arlCajas = document.getElementsByClassName("cajacredencial");
		for ( var i = 0; i < arlCajas.length; i ++ ) { 
			arlCajas[i].style.visibility = "hidden"; 
		}	
	}	
	return booRetorno;	
}