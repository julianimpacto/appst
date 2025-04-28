var secEventos = '';
var secReferenciado = '';
var secDetalle = '';

var strSecOperativa = '';
var strTablaEventosPredeterminados = '';
var strSecOpciones = '';

var arlDecisiones = new Array();

var strReferenciadoValorAnterior = '';

var booNoEntreAReferenciadoClic = false;
// Create the event
var myVar = setInterval(tmrAtentoCierreDeLista, 10000);

var douCantidad = 1;

function tmrAtentoCierreDeLista() {
	if ( intActividadPrincipal == 0 ) { return; }
	switch ( intActividadPrincipal ) {
		/*case 5611:
			if ( document.getElementById('txtEventos').getAttribute('tag') == '414019' ) {			
					if ( intReferenciado != 0 ) { decidasicerrarplanilla(1, 41401905);	}
			}	
		break;*/
		case 6412:
			if ( matUsuario[4] < 6 ) {
				if ( document.getElementById('txtEventos').getAttribute('tag') == '130509' ) {			
					if ( intReferenciado != 0 ) { decidasicerrarplanilla(1, 31);	}
				}		
			}		
		break;
		default:
			clearInterval(myVar);
		break;		
	}
}

function decidasicerrarplanilla(paso, argumentos) {
	switch (paso) {
		case 1:
			var Gestor1 = new Gestor();
			strconsultaant = '';
			Gestor1.DatosDeConsulta(argumentos, intReferenciado, false, true, '', 'decidasicerrarplanilla', 2);
			break;
		case 2:
			if ( argumentos == 904201 ) { 
				intReferenciado = 0;
				secReferenciado = '';
				recargueaplicacion();
			}
		break;
	}
}

function ev130520(argumentos){		
	var seccion = argumentos[1];
    matUsuario = argumentos[5][0];  	
	if ( argumentos[5][0][5] == 0 ) { 
		alert('Ocurrió una excepción con la validación del usuario');
		MuestreFormularioDeAutenticacion();
		return; 
	}
    var strHTMLCajas  = '        <input type="text" class="cajastandar" id="txtEventos" placeholder="Evento" onfocus="txtEventos_Onfocus(this, event);" onKeyDown="txtEventos_Keypress(this, event);">'
                 + '        <input type="text" class="cajastandar" id="txtReferenciado" placeholder="Referenciado" onfocus="txtReferenciado_Onfocus(this, event);" onKeyUp="txtReferenciado_Keypress(this, event);" disabled>'
                 + '        <input type="text" class="cajastandar" id="txtDetalle" placeholder="Detalle" onfocus="txtDetalle_Onfocus(this, event);" onKeyDown="txtDetalle_Keypress(this, event);" disabled>';
    strSecOperativa = '<section class="seccion"; id="secCajas">'
               	 +  strHTMLCajas
                 + '</section>'
                 + '<section class="seccion"; id="secEventos">'
                 + '    <div id="lstEventosPredeterminados" style="width: 70%;">'
                 + '        <table id="lstEventos0">'
                 + '            <tr>'                 
				 + '                <img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img>'
                 + '            </tr>'
                 + '        </table>'
                 + '    </div>'
                 + '    <div id="lstEventosCoincidencia" style="width: 70%;">'
                 + '        <table id="lstEventos1">'                
                 + '        </table>'
                 + '    </div>'
                 + '</section>'
                 + '<section class="seccion"; id="secReferenciado">'
                 + '    <div id="lstReferenciado" style="width: 70%; margin-left: auto; margin-right: auto">'
                 + '    </div>'
                 + '</section>'
                 + '<section class="seccion"; id="secDetalle">'
                 + '    <div id="lstDetalle" style="width: 70%; margin-left: auto;">'
                 + '    </div>'
                 + '</section>'              
                 + '<section class="seccion"; id=secPlanilla style="min-height: 300px; border-bottom:1px solid rgb(20, 20, 20);">'
                 + '    <a id="plaPlanilla" tag="0">'
                 + '        <table id="lstPlanilla"></table>'
                 + '    </a>'
                 + '</section>'
                 + '<div id="lnkRegistrar" style="text-align: right;"><a class="link" style="margin-right: 50px; margin-top: 20px;" onclick="lnkRegistrar_Click();">Registrar</a></div>'
                 + '<section class="seccion"; id="secTotales" style="margin-top: 40px;">'
                 + '    <div id="lstTotales">'
                 + '    </div>'
                 + '</section>'
                 + '<section class="seccion"; id="secTareas" style="margin-top: 40px;">'
                 + '    <div id="lstTareas">'
                 + '        <table class="lstCoincidencias" id="tareas"></table>'
                 + '    </div>'
                 + '</section>';    
    var strBotonesAdicionales = '';
    switch ( intActividadPrincipal ) {    	
		case 5611:
			solGestorGen.CreeTabla('articulos');
		break;
    }
    document.body.innerHTML = '<section class="seccion"; id="secEmergente"></section>'
                            + '<section class="seccion"; id="secTitulo" style="margin-top: 10px; min-height: 260px;""><img src="data:image/jpg;base64,' + strLogo + '" alt="" style="margin-right: 10px; margin-left: auto; float: left; " height=256px;/><img src="imagenes/solteclogo.png" alt="" style="margin-right: auto; float: right; margin-left: 10px;" /></section>'
                            + '<section class="seccion"; id="secContenido">'
                            + '     <a class="lblimportante" >' + strDispositivo + '<br />Soltec Tiendas 5.1.' + intVersion + '</a>'
                            + '     <section class="seccion"; id="secMenu" style="text-align: left;">'
                            + '         <img src="imagenes/operativa.png" alt="" style="padding-top: 30px; margin-right: 25px;" onclick="carguesecoperativa();"/>'
                            + '         <img src="imagenes/informes.png" alt="" style="padding-top: 30px;  margin-right: 25px;" onclick="carguesecinformes();"/>'
                            + '         <img src="imagenes/opciones.png" alt="" style="padding-top: 30px;  margin-right: 25px;" onclick="carguesecopciones();"/>'                           
                            + '         <img src="imagenes/reiniciar.png" alt="" style="padding-top: 30px;  margin-left: auto;" onclick="recargueaplicacion();"/>'
                            + '     </section>'     
                            + '     <section class="seccion"; id="secOperativa">' + strSecOperativa + '</section>'
                            + '     <section class="seccion"; id="secInformes">' + strSecInformes + '</section>'
                            + '     <section class="seccion"; id="secOpciones">' + strSecOpciones + '</section>'
                            + '</section>'
                            + '<div class="modal-dialog" id="modalLogin" onclick="desaparezcamodal();"></div>';
//                          + '<footer id="fooSoltec">SACC&reg 2018  - Colombia - +57 318 560 9936</footer>';
	ConsulteYResponda("php/cargueeventos.php?q=" + strBaDa + ";" +  matUsuario[0] + ";''", true, 'lstEventosPredeterminados', 'cargueeventos', ''); 	
    solGestorGen.CreeTabla('eventos');
    solGestorGen.CreeTabla('sipltiev');	
}

function carguesecinformes() {
	if ( document.getElementById('secOperativa').innerHTML != '' ) { strSecOperativa = document.getElementById('secOperativa').innerHTML; }
	if ( document.getElementById('secOpciones').innerHTML != '' ) { strSecOpciones = document.getElementById('secOpciones').innerHTML; }
	if ( document.getElementById('secInformes').innerHTML != '' ) { return; }
	document.getElementById('secOperativa').innerHTML = '';
	document.getElementById('secOpciones').innerHTML = '';
	if ( strSecInformes != '' ) {
		document.getElementById('secInformes').innerHTML = strSecInformes;
		return;
	} else {
		preparesecinformes();
	}
	document.getElementById('secInformes').innerHTML = strSecInformes;
	var arlHoy = hoy().split('-');
	document.getElementById('txtDesdeDia').value = parseInt(arlHoy[2]);
	document.getElementById('txtDesdeMes').value = parseInt(arlHoy[1]);
	document.getElementById('txtDesdeAño').value = parseInt(arlHoy[0]);
	document.getElementById('txtHastaDia').value = parseInt(arlHoy[2]);
	document.getElementById('txtHastaMes').value = parseInt(arlHoy[1]);
	document.getElementById('txtHastaAño').value = parseInt(arlHoy[0]);
}

function carguesecoperativa() {
	if ( document.getElementById('secInformes').innerHTML != '' ) { strSecInformes = document.getElementById('secInformes').innerHTML; }
	if ( document.getElementById('secOpciones').innerHTML != '' ) { strSecOpciones = document.getElementById('secOpciones').innerHTML; }
	if ( document.getElementById('secOperativa').innerHTML != '' ) { return; }
	document.getElementById('secInformes').innerHTML = '';
	document.getElementById('secOpciones').innerHTML = '';
	if ( strSecOperativa != '' ) {
		document.getElementById('secOperativa').innerHTML = strSecOperativa;
		return
	}
	strSecInformes = '';
	strDatos = '';
	for ( var i = 0; i <= 3; i ++ ) { strDatos += matUsuario[i] + ';'; }
	UsuarioDeterminado(strDatos, '');
}

function carguebotonadicional(valor, argumentos) {
	if ( valor === null || valor == 'nada' || valor == '' || valor == '904201' ) {
		document.getElementById('imgBoton1').setAttribute('src', 'imagenes/bloqueado.png');
		document.getElementById('imgBoton1').setAttribute('onclick', 'desbloqueecartera(1);');
		document.getElementById('td' + argumentos[0].getAttribute('tag')).setAttribute('onclick', '');
	} else {
		document.getElementById('imgBoton1').setAttribute('src', 'imagenes/desbloqueado.png');
		document.getElementById('imgBoton1').setAttribute('onclick', 'bloqueecartera(1);');
		document.getElementById('td' + argumentos[0].getAttribute('tag')).setAttribute('onclick', 'lstReferenciado_Click(this, event);');
	}
}

function desbloqueecartera(paso, argumentos) {	
	booNoEntreAReferenciadoClic = true;
	if ( matUsuario[4] < 6 ) { return; }
	var paso = paso || 1;
	var argumentos = argumentos || 0;	
	switch ( paso ) {
		case 1:
			//document.getElementById('cmd' + argumentos.Tag).innerHTML = '<img src="imagenes/cargando2.gi" />';
			var Gestor1 = new Gestor();
			var arlArgumentos = new Array();
			arlArgumentos.push(argumentos);
			arlArgumentos.push(2);
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|904202|' + argumentos.getAttribute('Tag') + '|0|0|0|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'desbloqueecartera', arlArgumentos);
			break;
		case 2:
			if ( argumentos[2] == 'nada' ) {				
				alert('NO se pudo activar la lista.');
				return;
			} else {
				document.getElementById('tda' + argumentos[0].getAttribute('Tag')).innerHTML = '<a Tag="' + argumentos[0].getAttribute('Tag') + '" class="botondeplanilla" onclick="bloqueecartera(1, this);">Activa</a>';
				document.getElementById('td' + argumentos[0].getAttribute('tag')).setAttribute('onclick', 'lstReferenciado_Click(this, event);');
			}
		break;
	}	
}

function bloqueecartera(paso, argumentos) {	
	booNoEntreAReferenciadoClic = true;
	if ( matUsuario[4] < 6 ) { return; }
	var paso = paso || 1;
	var argumentos = argumentos || 0;	
	switch ( paso ) {
		case 1:
			//document.getElementById('cmd' + argumentos.Tag).innerHTML = '<img src="imagenes/cargando2.gi" />';
			var Gestor1 = new Gestor();
			var arlArgumentos = new Array();
			arlArgumentos.push(argumentos);
			arlArgumentos.push(2);
			Gestor1.DatosDeConsulta(30, -1*matUsuario[0] + '|904201|' + argumentos.getAttribute('Tag') + '|0|0|0|||' + hoy() + '|' + hoy() + '|' + matUsuario[0], false, true, '', 'bloqueecartera', arlArgumentos);				
		break;
		case 2:
			if ( argumentos[2] == 'nada' ) {				
				alert('NO se pudo suspender la lista.');
				return;
			} else {
				document.getElementById('tda' + argumentos[0].getAttribute('Tag')).innerHTML = '<a Tag="' + argumentos[0].getAttribute('Tag') + '" class="botondeplanilla" onclick="desbloqueecartera(1, this);">Suspendida</a>';;
				document.getElementById('td' + argumentos[0].getAttribute('tag')).setAttribute('onclick', '');
			}
		break;
	}	
}

function lstEventos_Click(sender, e){	
	CargueElEvento(sender, e);
}

function txtEventos_Onfocus(sender, e) {	
//	sender.value = '';
	document.getElementById('secEventos').innerHTML = secEventos;
	document.getElementById('lstEventosCoincidencia').innerHTML = '<table id="lstEventos1"></table>';
}

function txtEventos_Textchanged(sender, e){
	if (sender.value.length > 1) {		
		document.getElementById('lstEventosCoincidencia').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
		ConsulteYResponda("php/coincidenciasde.php?q=" + strBaDa + ";" +  sender.value + ';eventos;ev;30;lstEventos1;', true,  'lstEventosCoincidencia', 'coincidenciasde', '');
	}
}

function CargueElEvento(sender, e){
	//tratamiento a reportes
	switch (sender.getAttribute('Tag')){
		case '101305':
			PrepareCuadrosDeLaVentana(sender, e);
			CargueSeñalado();
			return;
			//Estas opciones no deberían establecerce desde el fron sino desde el back para evitar a los curiosos mironsillos.
			//document.getElementById('txtReferenciado').removeAttribute("onfocus"); para que el cliente no puede busca a otras personas
			//document.getElementById('txtReferenciado').removeAttribute("onkeyup"); para que el cliente no puede busca a otras personas
		break;
		case '130006':
			PrepareCuadrosDeLaVentana(sender, e);
			CargueSeñalado();
			return;
		break;
		case '130503': case '130507':
			PrepareCuadrosDeLaVentana(sender, e);
			CargueSeñalado();
			return;
		break;
		case '140003':
			PrepareCuadrosDeLaVentana(sender, e);
			CargueSeñalado();
			return;
		break;
		case '140009': case '140005':
			PrepareCuadrosDeLaVentana(sender, e);
			secReferenciado = document.getElementById('secReferenciado').innerHTML;
			arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, 'zxywv');
			document.getElementById('plaPlanilla').innerHTML = '';
			return;
		break;
		case '413594':
			PrepareCuadrosDeLaVentana(sender, e);
			CargueSeñalado();
		break;
		/*case '414019':
			PrepareCuadrosDeLaVentana(sender, e);
			CargueSeñalado();
		break;*/
		default:
	}	
	PrepareCuadrosDeLaVentana(sender, e);	
}

function PrepareCuadrosDeLaVentana(sender, e) {
	document.getElementById('txtEventos').setAttribute('Tag', sender.getAttribute('Tag'));
	document.getElementById('txtEventos').value = document.getElementById('td' + sender.getAttribute('Tag')).innerText;
	document.getElementById('txtEventos').setAttribute('tagplanilla', sender.getAttribute('IdPlTi'));
	document.getElementById('txtReferenciado').setAttribute('tag', sender.getAttribute('TagReferenciado'));
	document.getElementById('txtDetalle').setAttribute('tag', sender.getAttribute('TagDetalle'));
	document.getElementById('lstPlanilla').setAttribute('tag', '0');
	secEventos = document.getElementById('secEventos').innerHTML;	
	document.getElementById('secEventos').innerHTML = '';
	document.getElementById('txtReferenciado').removeAttribute("disabled");
	document.getElementById('txtReferenciado').focus();
	//document.dispatchEvent(myEvent);
}

function txtEventos_Keypress(sender, e){
	var keyascii =(e.keyCode ? e.keyCode : e.which);
	if (keyascii == 13) {
		
	} else {
		var strLetra = String.fromCharCode(e.which);
		txtEventos_Textchanged(sender, e);
	}
}

function lstReferenciado_Click(sender, e){
	if ( booNoEntreAReferenciadoClic ) { booNoEntreAReferenciadoClic = false; return; }
	if ( document.getElementById('tda' + sender.getAttribute('tag')).innerText == 'Suspendida' ) { return; }
	//document.getElementById('txtReferenciado').value = document.getElementById('td' + sender.getAttribute('Tag')).innerText;
	document.getElementById('txtReferenciado').value = sender.innerText;
	intReferenciado = sender.getAttribute('tag');		
	CargueSeñalado(document.getElementById('txtReferenciado'), sender);	
	document.getElementById('secReferenciado').innerHTML = '';
	document.getElementById('txtDetalle').removeAttribute("disabled");
	document.getElementById('txtDetalle').focus();
}

function txtReferenciado_Onfocus(sender, e) {
//	sender.value = '';	
	if (secReferenciado == '') { return; }
	document.getElementById('secReferenciado').innerHTML = secReferenciado;
}

function txtReferenciado_Textchanged(sender, e) {
	switch ( document.getElementById('txtEventos').getAttribute('tag') ) {
		case '1':			
			var arlArgumentos = new Array();
			arlArgumentos.push('lstReferenciado');
			arlArgumentos.push('lstCoincidencias');
			arlArgumentos.push(false);	
			arlArgumentos.push('tabla');
			arlArgumentos.push('ev100000');
			arlArgumentos.push('onclick="lstReferenciado_Click(this, event);"');
			var strTexto = sender.value;
			if ( strTexto.length >= 3 ) {
				ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;|sistemacontabilidadcriteriosauxiliares|tabla|-" + strTexto + '|tabla|;true', true,  '', 'ev100000', arlArgumentos); 
				return;
			}			
		break;
		case '140009': case '140005':
		break;
		default:
		document.getElementById('lstReferenciado').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
	}
	var strTag = sender.getAttribute('tag');
	strTag = strTag.toLowerCase();
	switch (strTag) {
		//tener en cuenta qeu el preente switch, se puede cambiar por datos descargados en un array que contenga sipltaas
		case 'eventosocurrencias':
			switch (document.getElementById('txtEventos').getAttribute('Tag')) {
				case '130509': //está en modo actualización de creditos en lista
					ConsulteYResponda("php/coincidenciasde.php?q=" + strBaDa + ";" +  sender.value + ';' + sender.getAttribute('Tag') + '2;nota2;' + matUsuario[0] + ';lstReferenciado; AND idevento=130004 ', true,  'lstReferenciado', 'coincidenciasde', '');
					return;
			}
		break;
		case 'li': case 'terceros':
			ConsulteYResponda("php/coincidenciasde.php?q=" + strBaDa + ";" +  sender.value + ';' + sender.getAttribute('Tag') + ';no;30;lstReferenciado; ', true,  'lstReferenciado', 'coincidenciasde', '');
			//carguelistas('1');
		break;
		case 'articulos':
			switch (document.getElementById('txtEventos').getAttribute('tag') ) {
				case '140009': case '140005': case '140010':
					intReferenciado = 1;
					CargueSeñalado(document.getElementById('txtReferenciado'), sender.value);
				break;
				case '140002': case '700500':
					ConsulteYResponda("php/coincidenciasde.php?q=" + strBaDa + ";" +  sender.value + ';' + sender.getAttribute('Tag').toLowerCase() + ';no;30;lstReferenciado; ', true,  'lstReferenciado', 'coincidenciasde', '');
				break;
			}
		break;			
		default:
		break;
	}
	//ConsulteYResponda("php/coincidenciasde.php?q=" + strBaDa + ";" +  sender.value + ';eventos;ev;30;lstReferenciado', true,  'lstReferenciado', 'coincidenciasde', '');	
}

function carguelistas(paso, texto) {
	switch (paso) {
		case '1':
			var Gestor1 = new Gestor();
			Gestor1.DatosDeConsulta(16, texto, false, true, 'lstReferenciado', 'carguelistas', '2');
		break;
		case '2':

		break;
	}	
}

function txtReferenciado_Keypress(sender, e){
	var keyascii =(e.keyCode ? e.keyCode : e.which);
	if (keyascii == 13) {	
		if ( sender.value == '' ) { return; }
		CargueSeñalado(sender, e.key);
	} else {
		if ( sender.value.length < 3 ) { return; }
		txtReferenciado_Textchanged(sender, e.key);
		//txtReferenciado_Textchanged(sender, String.fromCharCode(e.which).toLowerCase());
	}
	//if ( enpc ) { sender.value += String.fromCharCode(e.which).toLowerCase(); }
}

function CargueSeñalado(sender, argumentos){	
	switch (document.getElementById('plaPlanilla').getAttribute('tag'))	{
		case '0': 
			switch (document.getElementById('txtEventos').getAttribute('Tag')) {
				case '1':
					document.getElementById('txtDetalle').setAttribute('Tag', argumentos.getAttribute('tabla'));					
					document.getElementById('txtDetalle').setAttribute('onfocus', 'txtDetalle_Onfocus(this, event);');
					document.getElementById('txtDetalle').setAttribute('onkeydown', 'txtDetalle_Keypress(this, event);');
				break;
				case '101305':
					intReferenciado = matUsuario[0];
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);
				break;
				case '130006':				
					intReferenciado = 0;
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);					
				break;
				case '130502': case '130509': case '140005': 
				case '140001': case '140007': case '143500': 
				case '143501': case '143502': case '143503': case 413504:
				case '143596': case '143599': case '413500':
				case '413501': case '413596': case '413597': 
				case '413598': case '413599': case '417500': 
				case '414019': case '414020':
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);
				break;	
				case '130503': case '130507':
					intReferenciado = 0;
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);					
				break;
				case '140003':
					document.getElementById('txtReferenciado').setAttribute('value', 'Artículo Nuevo');
					intReferenciado = 0;
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);				
				break;
				case '140009': case '140005': case '140010':
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, argumentos);
				break;
				case '140002':
					document.getElementById('plaPlanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
					var Gestor1 = new Gestor();
					if ( argumentos == 'Enter' ) { 
						Gestor1.DatosDeConsulta(27, sender.value, false, true, '', 'reorganiceparaarticulosdatos', 1); 
					} else {
						Gestor1.DatosDeConsulta(24, intReferenciado, false, true, '', 'reorganiceparaarticulosdatos', 1); 
					}					
				break;
				case '413594':
					document.getElementById('txtReferenciado').setAttribute('value', 'Resolución Nueva');
					intReferenciado = 0;
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);					
				break;
				case '700500':					
					secReferenciado = document.getElementById('secReferenciado').innerHTML;
					arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);
				break;	
			}
			break;		
		break;
		case '130006':
			if ( argumentos == 'Enter') {				
				ev13000603(1, sender.value);
			} else {
				ev13000603(3, argumentos.getAttribute("tag"));
			}			
		break;
		case '130507':
			if ( argumentos == 'Enter') {				
				ev13050703(1, sender.value);
			} else {
				ev13050703(3, argumentos.getAttribute("tag"));
			}			
		break;
		case '140003':
			//intReferenciado = parseInt(sender.value).substring(2));
			secReferenciado = document.getElementById('secReferenciado').innerHTML;
			arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);
		break;
		case '140009':
			if ( argumentos == "Enter" ) { 
				reorganiceparaactualizaciondepreciosenlista('3', sender.value); 
				return;
			}
			secReferenciado = document.getElementById('secReferenciado').innerHTML;
			if ( !IsNumeric(argumentos) ) {	reorganiceparaactualizaciondepreciosenlista('1', argumentos); }						
		break;		
		case '140005':
			if ( argumentos == "Enter" ) { 
				reorganiceparaajustedeinventario('3', sender.value); 
				return;
			}
			secReferenciado = document.getElementById('secReferenciado').innerHTML;
			if ( !IsNumeric(argumentos) ) {	reorganiceparaajustedeinventario('1', argumentos); }						
		break;
		case '414019': case '414020':
			arlDecisiones = Funcionario1.EnlisteEnEmplanillados(document.getElementById('tareas'), document.getElementById('txtEventos').getAttribute('Tag'), intReferenciado, arlDecisiones);
			//ev414019(1, argumentos);
		break;
	}
}

function lstDetalle_Click(sender, e){
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	switch ( document.getElementById('txtEventos').getAttribute('Tag') ) {
		case '130509':			
			break;
	}
	//document.getElementById('txtDetalle').value = document.getElementById('td' + sender.getAttribute('Tag')).innerText;	
	document.getElementById('txtDetalle').value = sender.innerText;	
	//secDetalle = document.getElementById('secDetalle').innerHTML;
	document.getElementById('secDetalle').innerHTML = '';		
}

function txtDetalle_Onfocus(sender, e) {
	sender.value = '';
	document.getElementById('lstDetalle').innerHTML = '';	
}

function txtDetalle_Textchanged(sender, e){	
	//var strTexto = sender.value + e.key;	
	var strTexto = sender.value;
	if ( strTexto.indexOf("'") != -1 ) {
		alert("No debe haber comillas en esta caja de texto");
		return;
	}
	if ( strTexto == '.' ) {
		sender.value = '0.';
		sender.select(strTexto.length, 0);
	}	
	if ( IsNumeric(strTexto) ) { return; }
	if ( strTexto.substr(0, 1) == '+' || strTexto.substr(0, 1) == '-' ) { return; }
	var arlArgumentos = new Array();
	arlArgumentos.push('lstDetalle'); //seccion y nombre de la tabla
	arlArgumentos.push('lstCoincidencias'); //clase
	arlArgumentos.push(false); //muestre nombre de las columnas					
	switch ( document.getElementById('txtEventos').getAttribute("tag") ) {		
		case '1':
			if ( strTexto.length > 2 ) { 			
				arlArgumentos.push('no');
				arlArgumentos.push('ev100000');
				arlArgumentos.push('onclick="ev1(1, this);"');
				if ( strTexto.length > 3 ) {					
					document.getElementById('lstDetalle').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
					ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;id,no|terceros|no|-" + strTexto + '|no|30;true', true,  '', 'ev100000', arlArgumentos); 
					return;					
				}
			}
		break;
		case '130509':		
		if ( strTexto.length > 2 ) {
				arlArgumentos.push('no');
				arlArgumentos.push('ev100000');
				arlArgumentos.push('onclick="ev13050903(1, this);"');
				if ( strTexto.length > 3 ) {					
					document.getElementById('lstDetalle').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
					ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;id,no|terceros|no|-" + strTexto + '|no|30;true', true,  '', 'ev100000', arlArgumentos); 
					return;
				}
			}
		break;
		case '414016':			
			if ( strTexto.length > 0 ) { 			
				arlArgumentos.push('no,referencia,precioa');
				arlArgumentos.push('ev100000');
				arlArgumentos.push('onclick=""');
				if ( strTexto.length <= 3 ) {					
					ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;||referencia|" + strTexto + '|no|30;true', true,  '', 'ev100000', arlArgumentos); 
					return;
				} else {					
					document.getElementById('lstDetalle').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
					ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;||no|-" + strTexto + '|no|30;true', true,  '', 'ev100000', arlArgumentos); 
					return;
				}
			}
		break;
	}			
}

function txtDetalle_Keypress(sender, e){
	var keyascii =(e.keyCode ? e.keyCode : e.which);
	switch( keyascii ) {
		case 8:
			document.getElementById('lstDetalle').innerHTML = '';
		break;
		case 13:
			var douXCantidad = ProceseValor(sender.value);		
			if ( douXCantidad != 0 ) { douCantidad = douxCantidad; }		
			sender.value = '';
		break;
		default:
			txtDetalle_Textchanged(sender, e);
		break;
	}	
}

function ev100000(paso, argumentos) {
	var Funcionario1 = new Funcionario();
	document.getElementById(argumentos[0]).innerHTML = Funcionario1.ArrayATablaEspecial(argumentos[6], argumentos[1], argumentos[0], false, argumentos[3], argumentos[5]);
}

function lstTareas_Click(sender, argumentos) {	
	if ( booNoEntreAReferenciadoClic ) { booNoEntreAReferenciadoClic = false; return; }
	intReferenciado =  parseInt(sender.getAttribute('tag').substring(6));
 	document.getElementById('txtEventos').setAttribute('tag',parseInt(sender.getAttribute('tag').substring(0, 6)));
	document.getElementById('txtEventos').value = sender.cells[0].innerText;
	for ( var i = 0; i < document.getElementById('tareas').rows.length; i ++ ) {
		document.getElementById('tareas').rows[i].cells[0].setAttribute('style', 'color: rgb(180, 180, 180);');	
		document.getElementById('tareas').rows[i].cells[1].setAttribute('style', 'color: rgb(180, 180, 180);');	
	}
	sender.cells[0].setAttribute('style', 'color: rgb(255, 255, 255);');
	sender.cells[1].setAttribute('style', 'color: rgb(255, 255, 255);');
	if ( sender.getAttribute('tag') != document.getElementById('plaPlanilla').getAttribute('etiqueta') ) {
	 	plaPlanilla.EtiquetePlanilla(sender.getAttribute('tag'), argumentos); 
	} else {
		switch ( sender.getAttribute('tag').substring(0, 6) ) {
			case '101305': ev101305(1, 0); break;
			case '130006': ev130006(1, 0);break;
			case '130503': reorganiceparatercerosdatos(1, 0); break;			
			case '140002': reorganiceparaarticulosdatos('2', intReferenciado); break;
			case '140009': reorganiceparaactualizaciondepreciosenlista('1', argumentos); break;
			case '140005': case '140010': reorganiceparaajustedeinventario('1', argumentos); break;
			case '413594': ev413594(1, argumentos);	break;
			case '414019': ev414019(1, argumentos);	break;			
			case '414020': ev414020(1, argumentos); break;
		}
	}	
}

function lnkRegistrar_Click() {
	switch ( parseInt(document.getElementById('txtEventos').getAttribute('Tag')) ) {		
		case 140002: case 140003:
			valideyregistrearticulodatos(1, intReferenciado);
		break;
		case 413594:
			ev41359403(1, '');
		break;
		case 130006:
			ev13000610(1, '');
		break;
		case 130503:
			ev13050310(1, '');
		break;
		case 130507:
			ev13050710(1, '');
		break;
		case 414019:
			ev41401920(1, '');
		break;
	}
}

function ev41401920(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	var funcionario1 = new Funcionario();
	var arlVistaPreva = [];
	for (var i=0; i < arlFilas.length; i++ ) {
		if ( arlFilas[i][2] != 0 ) { 
			var arlFilita = [];
			arlFilita.push(arlFilas[i][2]);arlFilita.push(arlFilas[i][1]);arlFilita.push(arlFilas[i][3]);arlFilita.push(arlFilas[i][4]);
			arlVistaPreva.push(arlFilita); }
	}
	var strVistaPrevia = '<!DOCTYPE html><html><head><style type="text/css">.lstOperativa {margin:0px;padding:0px;width:100%;border:1px solid rgb(41, 100, 171);-moz-border-radius-bottomleft:0px;-webkit-border-bottom-left-radius:0px;border-bottom-left-radius:0px;-moz-border-radius-bottomright:0px;webkit-border-bottom-right-radius:0px;border-bottom-right-radius:0px;-moz-border-radius-topright:0px;-webkit-border-top-right-radius:0px;border-top-right-radius:0px;-moz-border-radius-topleft:0px;-webkit-border-top-left-radius:0px;border-top-left-radius:0px;animation-name: aparicion;animation-duration: 0.5s;}	.lstOperativa table{display: block;width:100%;margin:0px;padding:0px;animation-name: estiramiento;animation-duration: 2s;}.lstOperativa tr:last-child td:last-child {-moz-border-radius-bottomright:0px;-webkit-border-bottom-right-radius:0px;border-bottom-right-radius:0px;}	.lstOperativa table tr:first-child td:first-child {-moz-border-radius-topleft:0px;-webkit-border-top-left-radius:0px;border-top-left-radius:0px;}.lstOperativa table tr:first-child td:last-child {-moz-border-radius-topright:0px;	-webkit-border-top-right-radius:0px;border-top-right-radius:0px;}.lstOperativa tr:last-child td:first-child{-moz-border-radius-bottomleft:0px;-webkit-border-bottom-left-radius:0px;border-bottom-left-radius:0px;}/*.lstOperativa tr:hover td{	background-color:#2c6fb7;}*/.lstOperativa td{vertical-align:middle;	background-color: rgb(240, 240, 240);border:1px solid rgb(46,100, 171);	border-width:0px 1px 1px 0px;text-align:left;padding:8px;font-size:12px;font-family:Arial;font-weight:normal;color: rgb(0, 0, 0);}.lstOperativa tr:last-child td{border-width:0px 1px 0px 0px;}.lstOperativa tr td:last-child{border-width:0px 0px 1px 0px;	}</style></head>'
					   + '<body onbeforeunload="return VerificarSalida();"> '
					   + '<section id="secEmergente"><div>Orden de pedido</dixv><br>'
					   + '<div>Fecha: ' + hoy() + '</div><br>'
					   + '<div>Realizó: ' + matUsuario[2] + '</div><br>'
					   + '<div>Para: ' + document.getElementById('txtReferenciado').value + '</div>'
	                   + funcionario1.ArrayATabla(arlVistaPreva, 'lstOperativa', 'tabOperativa')
					   + document.getElementById('secTotales').innerHTML+ '</section>'
					   + '</body></html>';
	document.getElementById('secEmergente').innerHTML=strVistaPrevia;
	var ficha = document.getElementById('secEmergente');
	var ventimp = window.open(' ', 'popimpr');
	ventimp.document.write( ficha.innerHTML );
	ventimp.document.close();
	//ventimp.print();
	//ventimp.close();
	document.getElementById('secEmergente').innerHTML='';
}


function valideyregistrearticulodatos(paso, argumentos) {
	if ( !HayInternet() ) { alert('No está conectado.'); return; }
	switch ( paso ) {
		case 1:
			if ( arlFilas[1][1].trim().length < 4 || arlFilas[1][1].trim().length == 'nada' ) {
				alert('El nombre del artículo no es aceptable');
				return;		
			}		
			var Gestor1 = new Gestor();			
			document.getElementById('lnkRegistrar').innerHTML = '<img id="imgBoton1" src="imagenes/cargando2.gif" style="padding-top: 30px; margin-right: 50px;" width=64 height=64 alt="" />';		
			if ( intReferenciado == 0 ) {
				Gestor1.DatosDeConsulta(18, arlFilas[0][1], false, true, '', 'valideyregistrearticulodatos', 2);
			} else {
				Gestor1.DatosDeConsulta(26, arlFilas[0][1] + "|" + intReferenciado, false, true, '', 'valideyregistrearticulodatos', 2);
			}			
		break;
		case 2:
			if ( argumentos == 'nada') {
				var arlDatos = new Array();
				for ( var i = 0; i < arlFilas.length; i ++ ) { arlDatos.push(arlFilas[i][1]); }
				var Gestor1 = new Gestor();
				if ( intReferenciado == 0 ) {
					Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 13 + ';' + arlDatos.toString(), true, '', 'valideyregistrearticulodatos', 3);
				} else {
					arlDatos.push(intReferenciado);
					Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 15 + ';' + arlDatos.toString(), true, '', 'valideyregistrearticulodatos', 3);
				}				
				Gestor1.UltimaOcurrenciaDe(-1*matUsuario, parseInt(document.getElementById('txtEventos')), true, '', 'valideyregistrearticulodatos', 4);
			} else {
				if ( intReferenciado == 0 ) { alert('El artículo que intenta registrar tiene la misma referencia que ' + argumentos); }				
			}
			document.getElementById('lnkRegistrar').innerHTML = '<a class="link" style="margin-right: 50px; margin-top: 20px;" onclick="lnkRegistrar_Click();">Registrar</a>';		
		break;
		case 3:			
			if ( argumentos == 'nada' ) { alert('El artículo, no pudo ser registrado');				
			} else {
				var arlDatos = new Array();
				for ( var i = 0; i < arlFilas.length; i ++ ) { arlDatos.push(arlFilas[i][1]); }
				var Gestor1 = new Gestor();
				if ( intReferenciado == 0 ) {
					if ( strBaDa == 'mercavilla_freyaar' ) { Gestor1.Registre("php/registre.php?q=mercavilla_freyaarca;" + 13 + ';' + arlDatos.toString(), true, '', '', 0); }
					if ( strBaDa == 'mercavilla_freyaarca' ) { Gestor1.Registre("php/registre.php?q=mercavilla_freyaar;" + 13 + ';' + arlDatos.toString(), true, '', '', 0); }
				} else {
					arlDatos.push(intReferenciado);
					if ( strBaDa == 'mercavilla_freyaar' ) { Gestor1.Registre("php/registre.php?q=mercavilla_freyaarca;" + 15 + ';' + arlDatos.toString(), true, '', '', 0); }
					if ( strBaDa == 'mercavilla_freyaarca' ) { Gestor1.Registre("php/registre.php?q=mercavilla_freyaar;" + 15 + ';' + arlDatos.toString(), true, '', '', 0); }
				}				
				alert('El artículo se ha registrado con éxito');
				recargueaplicacion();
			}
			document.getElementById('lnkRegistrar').innerHTML = '<a class="link" style="margin-right: 50px; margin-top: 20px;" onclick="lnkRegistrar_Click();">Registrar</a>';		
		break;
		case 4:
			var ocurrencia = 1;
			if ( argumentos != 'nada' ) { ocurrencia = parseInt(argumentos) + 1; }
			var Gestor1 = new Gestor();
			Gestor1.RegistreOcurrencia(parseInt(document.getElementById('txtEventos')), ocurrencia, matUsuario[0], 0, -1*matUsuario[0], 0, 0, 0, hoy(), hoy(), 'SP-' + ocurrencia, arlFilas[1][1], parseInt(document.getElementById('txtEventos')), ocurrencia, true, '', '', '');
		break;
	}
}

function eliminartarea(paso, argumentos) {
	switch ( paso ) {
		case 1:
			var strArgs = argumentos.toString();
			switch ( parseInt(strArgs.substring(0, 6)) ) {
				case 414019:
					if ( confirm('¿Seguro que desea ocultar el pedido?') == false ) { return; }
					for ( var i = 0; i < document.getElementById('tareas').rows.length; i ++ ) {
						if ( document.getElementById('tareas').rows[i].getAttribute('id') == 'ta' + argumentos ) { document.getElementById('tareas').deleteRow(i); }
					}										
					document.getElementById('lstplanilla').innerHTML = '';
					if ( document.getElementById('tareas').rows.length > 0 ) { lstTareas_Click(document.getElementById('tareas').rows[0], ''); }
					booNoEntreAReferenciadoClic = true;
				break;
			}			
		break;
	}
}

function recargueaplicacion() {
	var arlArgumentos = new Array();
	arlArgumentos.push(''); arlArgumentos.push('secContenido'); arlArgumentos.push(''); arlArgumentos.push(''); arlArgumentos.push('');
	var arlA = new Array(); arlA.push(matUsuario); arlArgumentos.push(arlA);
	ev130520(arlArgumentos);
}

function reviserecibos(sender, e) {
	var Gestor1 = new Gestor();
	sender.innerHTML = Gestor1.DatosDeConsulta(2901, sender.getAttribute("Tag"), false, false, '', 'reviserecibos', 0);
}