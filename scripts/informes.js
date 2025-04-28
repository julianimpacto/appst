var strSecInformes = '';
var datDesde = hoy();
var datHasta = hoy();
var ColumnasEsNumero = new Array();
var ColumnasJustificaciones = new Array();
var FilasEtiquetas = new Array();
var ColumnasAmplitudes = new Array();

function preparesecinformes() {
	 strSecInformes = '<section class="seccion"; id="secCajas">'
               	 + '        <input type="text" class="cajastandar" id="txtInEventos" placeholder="Evento" onfocus="txtInEventos_Onfocus(this, event);" onKeyDown="txtInEventos_Keypress(this, event);">'
                 + '        <input type="text" class="cajastandar" id="txtInTerminal" placeholder="Terminal" onfocus="txtInTerminal_Onfocus(this, event);" onKeyDown="txtInTerminal_Keypress(this, event);" >'
                 + '        <input type="text" class="cajastandar" id="txtInReferenciado" placeholder="Referenciado" tagreferenciado=0 onfocus="txtInReferenciado_Onfocus(this, event);" onKeyDown="txtInReferenciado_Keypress(this, event);" >'
                 + '		<a style="font-size: 20px; color: rgb(41, 100, 171);">Desde</a><input type="number" class="cajastandar" id="txtDesdeDia" placeholder="Día" style="width: 10%;" onblur="actualicefechas(1, this);"></input><input type="number" class="cajastandar" id="txtDesdeMes" placeholder="Mes" style="width: 10%;" onblur="actualicefechas(1, this);"></input><input type="number" class="cajastandar" id="txtDesdeAño" placeholder="Año" style="width: 10%;" onblur="actualicefechas(1, this);"></input>'
                 + '		<a style="font-size: 20px; color: rgb(41, 100, 171);">Hasta</a><input type="number" class="cajastandar" id="txtHastaDia" placeholder="Día" style="width: 10%;" onblur="actualicefechas(1, this);"></input><input type="number" class="cajastandar" id="txtHastaMes" placeholder="Mes" style="width: 10%;" onblur="actualicefechas(1, this);"></input><input type="number" class="cajastandar" id="txtHastaAño" placeholder="Año" style="width: 10%;" onblur="actualicefechas(1, this);"></input>'                 
                 + '</section>'
                 + '<div id="lnkInActualizar" style="text-align: right;"><a class="link" style="margin-right: 50px; margin-top: 20px;" onclick="lnkInActualizar_Click(1, 0);" tag=0>Actualizar</a></div>'
                 + '<section class="seccion"; id="secEventos">'
                 + '    <div id="lstInEventosCoincidencia" style="width: 70%;">'
                 + '    </div>'
                 + '</section>'
                 + '<section class="seccion"; id="secTerminal">'
                 + '    <div id="lstInTerminal" style="width: 70%; margin-left: auto; margin-right: auto">'
                 + '    </div>'
                 + '</section>'
                 + '<section class="seccion"; id="secReferenciado">'
                 + '    <div id="lstInReferenciado" style="width: 70%; margin-left: auto;">'
                 + '    </div>'
                 + '</section>'              
                 + '<section class="seccion"; id=secPlanilla style="min-height: 300px; border-bottom:1px solid rgb(20, 20, 20);">'
                 + '    <a id="inplanilla" >'
                 + '        <table id="lstPlanilla"></table>'
                 + '    </a>'
                 + '</section>'                 
                 + '<section class="seccion"; id="secTotales" style="margin-top: 40px;">'
                 + '    <div id="lstInTotales">'
                 + '    </div>'
                 + '</section>'
                 + '<section class="seccion"; id="secTareas" style="margin-top: 40px;">'
                 + '    <div id="lstInTareas">'
                 + '        <table class="lstInCoincidencias" id="tareas"></table>'
                 + '    </div>'
                 + '</section>';    
}

function txtInEventos_Keypress(sender, e){
    if (sender.value.length > 1) {      
        document.getElementById('lstInEventosCoincidencia').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>';
        ConsulteYResponda("php/coincidenciasdeinformes.php?q=" + strBaDa + ";" +  sender.value + ';eventos;ev;30;lstInEventos;', true,  'lstInEventosCoincidencia', 'coincidenciasde', '');
    }
}

function lstInEventos_Click(sender, e){ 
    document.getElementById('lnkInActualizar').setAttribute("tag", sender.getAttribute("tag"));
    document.getElementById('txtInEventos').value = sender.innerText;
    document.getElementById('txtInEventos').setAttribute('Tag', sender.getAttribute('Tag'));    
    document.getElementById('txtInEventos').setAttribute('tagplanilla', sender.getAttribute('IdPlTi'));
    document.getElementById('txtInReferenciado').setAttribute('tag', sender.getAttribute('TagReferenciado'));    
    document.getElementById('lstPlanilla').setAttribute('tag', 0);
    secEventos = document.getElementById('secEventos').innerHTML;   
    document.getElementById('secEventos').innerHTML = '';    
    document.getElementById('txtInReferenciado').focus();
}

function lnkInActualizar_Click(paso, argumentos) {
    switch (paso) {
        case 1:
            document.getElementById('inplanilla').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img>';
            if ( document.getElementById('txtInEventos').getAttribute('Tag') == 0 ) { return; }
            var Consulta = '';
            var strCondicionesExtras = 'AND eo.idterminal=' + (-1*matUsuario[0]) + ' ';    
            if ( document.getElementById('txtInTerminal').getAttribute('Tag' != 0 )) { strCondicionesExtras += 'AND eo.idterminal=' + document.getElementById('txtInTerminal').getAttribute('Tag'); }
            strCondicionesExtras += "AND eo.fecha1 BETWEEN '" + datDesde + "' AND '" + datHasta + "' ";
            if ( document.getElementById('txtInReferenciado').getAttribute('tagreferenciado') != 0 ) { 
                switch ( document.getElementById('txtInEventos').getAttribute('tag') ) {
                    case '140002':
                        strCondicionesExtras += " AND ka.idarticulo=" + document.getElementById('txtInEventos').getAttribute('tag') + " ";
                    break;
                    default:
                        strCondicionesExtras += " AND eo.idtercero=" + document.getElementById('txtInEventos').getAttribute('tag') + " ";
                }
            }    
            var Gestor1 = new Gestor();
            switch ( document.getElementById('txtInEventos').getAttribute('Tag') ) {
                case '140002':                    
                    var argumentos = [document.getElementById('txtInEventos').getAttribute('Tag'), strCondicionesExtras].toString();
                    Gestor1.DatosDeInforme(140002, argumentos, false, true, '', 'actualizarinforme', 2);
                break;
                case '421055':                    
                    var argumentos = [datDesde, datHasta, parseInt(document.getElementById('txtInReferenciado').value)].toString();
                    Gestor1.DatosDeInforme(421055, argumentos, false, true, '', 'actualizarinforme', 2);
                break;
                case '101305':
                    var argumentos = [datDesde, datHasta, matUsuario[0]].toString();
                    Gestor1.DatosDeInforme(101305, argumentos, false, true, '', 'actualizarinforme', 2);
                break;
            }
        break;
        case 2:
            var Funcionario1 = new Funcionario();
            if ( argumentos == 'nada' ) {
                document.getElementById('inplanilla').innerHTML = '<img style="margin-top: 80px;" src="imagenes/noencontrado.png" width=256 height=256></img>';
                return;
            }
            switch ( document.getElementById("txtInEventos").getAttribute("tag") ) {
                case '101305aa':
                    var strRetorno = '<table class="lstOperativa" id="lstResumen"><tbody>';
                    strRetorno += '<tr><th style="background-color: rgb(41, 100, 171); color: white;">Fecha</th><th style="background-color: rgb(41, 100, 171); color: white;">Cantidad</th><th style="background-color: rgb(41, 100, 171); color: white;">Articulo</th><th style="background-color: rgb(41, 100, 171); color: white;">Precio</th><th style="background-color: rgb(41, 100, 171); color: white;">SubTotal</th></tr>';
                    for (var i = 0; i < argumentos.length; i ++) {
                        var arlFila = argumentos[i];
                        strRetorno += '<tr idte="' + arlFila[1] + '" idev="' + arlFila[2] + '" idad="' + arlFila[3] + '" onclick="carguedocumento(this, event);">';
                        strRetorno += '<td>' + arlFila[0] + '</td>';
                        strRetorno += '<td style="text-align: right;">' + NumeroFormateado(arlFila[5], 0) + '</td>';
                        strRetorno += '<td>' + arlFila[4] + '</td>';
                        strRetorno += '<td style="text-align: right;">' + NumeroFormateado(arlFila[7], 0) + '</td>';
                        strRetorno += '<td style="text-align: right;">' + NumeroFormateado(arlFila[6], 0) + '</td>';
                    }
                    document.getElementById('inplanilla').innerHTML = strRetorno + '</body></table>';
                break;
                 case '101305':
                    var strRetorno = '<table class="lstOperativa" id="lstResumen"><tbody>';
                    strRetorno += '<tr><th style="background-color: rgb(41, 100, 171); color: white;">Fecha</th><th style="background-color: rgb(41, 100, 171); color: white;">Evento</th><th style="background-color: rgb(41, 100, 171); color: white;">Usuario</th><th style="background-color: rgb(41, 100, 171); color: white;">Monto</th><th style="background-color: rgb(41, 100, 171); color: white;">Saldo</th></tr>';
                    for (var i = 0; i < argumentos.length; i ++) {
                        var arlFila = argumentos[i];
                        strRetorno += '<tr idte="' + arlFila[1] + '" idev="' + arlFila[2] + '" idad="' + arlFila[3] + '" onclick="carguedocumento(this, event);">';
                        strRetorno += '<td>' + arlFila[0] + '</td>';
                        strRetorno += '<td>' + arlFila[4] + '</td>';
                        strRetorno += '<td>' + arlFila[7] + '</td>';
                        strRetorno += '<td style="text-align: right;">' + NumeroFormateado(arlFila[9], 0) + '</td>';                        
                        strRetorno += '<td style="text-align: right;">' + NumeroFormateado(arlFila[10], 0) + '</td>';                        
                    }
                    document.getElementById('inplanilla').innerHTML = strRetorno + '</body></table>';
                break;
                case '421055':
                    document.getElementById('inplanilla').innerHTML = Funcionario1.ArrayATabla(argumentos, 'lstCoincidencias', 'lstInPlanilla');
                    return;
                break;
                default:
                    for ( var i = 0; i < argumentos.length; i ++ ) {
                        var fila = argumentos[i];
                        fila.splice(0, 0, i+1);            
                        fila[4] = DateDiff(fila[4], hoy());
                        argumentos[i] = fila;
                    }
                    document.getElementById('inplanilla').innerHTML = Funcionario1.ArrayATabla(argumentos, 'lstCoincidencias', 'lstInPlanilla');
            }            
        break;
    }    
}

function carguedocumento(sender, e) {
    document.getElementById('modalLogin').setAttribute('style', 'display: block;');
    document.getElementById('modalLogin').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img>';
    var argumentos = sender.getAttribute("idte") + "|" + sender.getAttribute("idev") + "|" + sender.getAttribute("idad");
    var Gestor1 = new Gestor();
    Gestor1.DatosDeConsulta(111, argumentos, false, true, '', '111', 2);
}

function muestredocumento(paso, argumentos) {
    document.getElementById('modalLogin').innerHTML = argumentos;
}

function actualicefechas(paso, argumentos) {
	switch (argumentos.getAttribute("id")) {
		case 'txtDesdeDia': case 'txtDesdeMes': case 'txtDesdeAño':
			var Temp = document.getElementById('txtDesdeAño').value + '-' + document.getElementById('txtDesdeMes').value + '-' + document.getElementById('txtDesdeDia').value;					
			if ( isDate(Temp) ) { datDesde = Temp; } else {}						
		break;
		case 'txtHastaDia': case 'txtHastaMes': case 'txtHastaAño':
			var Temp = document.getElementById('txtHastaAño').value + '-' + document.getElementById('txtHastaMes').value + '-' + document.getElementById('txtHastaDia').value;					
			if ( isDate(Temp) ) { datHasta = Temp } else { alert('Ha escrito una fecha con error.'); return; }			
		break;		
	}
}