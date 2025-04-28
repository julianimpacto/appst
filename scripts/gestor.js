var strFallo = '';
var booCanceleConsulta = false;
var strcomandoant = '';
var intconsultassimultaneas = 0;
var consultas = [];


function Gestor () {    
}

Gestor.prototype.CreeTabla = function(tabla, rellenar, datos) {
    var rellenar = rellenar || false;
    if ( !rellenar ) {
        ConsulteYResponda("php/creetabla.php?q=" + strBaDa + ";" +  tabla, true, '', 'creetabla', tabla);
        switch ( tabla ) {
            case 'eventos':
                dwEventos.length = 0;
                break;
        }
    } else {
        var dwTabla = new Array();
        dwTabla.length = 0;
        var Filas = datos.split(";");
        for ( var i = 0; i < Filas.length; i ++ ) {
            dwTabla.push(Filas[i].split("|"));                   
        }
        if ( dwTabla.length > 0 )  { dwTabla[0][0] = dwTabla[0][0].replace("\u0005", ""); }
        switch ( tabla ) {
            case 'eventos':
                dwEventos = dwTabla;        
                break;
            case 'sipltiev':
                dwSiPlTiEv = dwTabla;
            break;
            case 'articulos':
                dwArticulos = dwTabla;
            break;
            default:
                return dwTabla;
        }
    }
};

Gestor.prototype.DatosDeConsulta = function(codconsulta, consulta, devuelvanombredecolumnas, asincrono, seccion, tarea, argumentos){
    var devuelvanombredecolumnas = devuelvanombredecolumnas || false;
    var asincrono = asincrono || false;
    var seccion = seccion || '';
    var tarea = tarea || 'datosdeconsulta';    
    strFallo = '';
    booCanceleConsulta = false;
    var arlRetorno = new Array();
    arlRetorno.length = 0;
    if (consulta == '') { return arlRetorno; }
    arlRetorno = ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";" + codconsulta + ";" + consulta + ";" + devuelvanombredecolumnas, asincrono, seccion, tarea, argumentos);
    return arlRetorno;
};

Gestor.prototype.DatosDeInforme = function(codconsulta, consulta, devuelvanombredecolumnas, asincrono, seccion, tarea, argumentos){
    var devuelvanombredecolumnas = devuelvanombredecolumnas || false;
    var asincrono = asincrono || false;
    var seccion = seccion || '';
    var tarea = tarea || 'datosdeconsulta';    
    strFallo = '';
    booCanceleConsulta = false;
    var arlRetorno = new Array();
    arlRetorno.length = 0;
    if (consulta == '') { return arlRetorno; }
    arlRetorno = ConsulteYResponda("php/datosdeinformes.php?q=" + strBaDa + ";" + codconsulta + ";" + consulta + ";" + devuelvanombredecolumnas, asincrono, seccion, tarea, argumentos);
    return arlRetorno;
};

Gestor.prototype.Registre = function(comando, asincrono, seccion, trabajo, argumentos) {    
    if (comando == 'borreanterior' ) { strcomandoant = ''; return; }
    var asincrono = asincrono || false;
    var seccion = seccion || '';
    var trabajo = trabajo || '';
    var argumentos = argumentos || '';
    if ( comando == strcomandoant ) { return; }
    strcomandoant = comando;
    var xmlhttp4 = new XMLHttpRequest();
//    xmlhttp4.addEventListener("load", DatosRecibidos, false);
    xmlhttp4.open("POST", comando, asincrono);
    xmlhttp4.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp4.setRequestHeader("Content-Length", comando.length);
    var intIdRegistrado = 0;
    xmlhttp4.setRequestHeader("Connection", "close");    
    xmlhttp4.onreadystatechange = function () {
        if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {            
            if (xmlhttp4.responseText == 'nada') {
                switch (trabajo) {
                    case 'ev101':
                        argumentos.push(xmlhttp4.responseText);
                        ev101(2, argumentos);
                    break;
                    case 'registreactualizaciondeprecio':
                        var arlArgumentos = argumentos.split("|");
                        document.getElementById(seccion).innerHTML = '<input type="number" id="' + seccion + '" tag="' + arlArgumentos[2] + '" class="cajacredencial" fila="' + parseInt(arlArgumentos[6]) + '" placeholder="' + arlArgumentos[4] + '" idarticulo="' + arlArgumentos[5] + '" style="width: 120px; background-color: rgb(255, 215, 215);" onblur="registreactualizaciondeprecio(1, this);" >' + arlArgumentos[3] + '</input>';
                        break;
                    case 'valideyregistrearticulodatos':                       
                        valideyregistrearticulodatos(argumentos, xmlhttp4.responseText);                        
                        break;
                    case 'registreajustedeinventario':
                        var arlArgumentos = argumentos.split("|");
                        document.getElementById(seccion).innerHTML = '<input type="number" id="' + seccion + '" tag="' + arlArgumentos[2] + '" class="cajacredencial" fila="' + parseInt(arlArgumentos[6]) + '" placeholder="' + arlArgumentos[4] + '" idarticulo="' + arlArgumentos[5] + '" style="width: 120px; background-color: rgb(255, 215, 215);" onblur="registreactualizaciondeprecio(1, this);" >' + arlArgumentos[3] + '</input>';
                        break;
                    case 'cambiarnombrealtercero':
                        alert('El nuevo nombre, no pudo ser registrado.');
                        break;
                    case 'cambiardatosaltercero':
                        alert('Los nuevos datos, no pudieron ser registrado.');
                    break;
                    case 'ev13050310':
                        ev13050310(2, xmlhttp4.responseText);
                    break;
                    case 'ev13050710':
                        argumentos.push(xmlhttp4.responseText);
                        ev13050710(argumentos[1], argumentos);
                    break;                  
                }
            } else {                 
                intIdRegistrado = parseInt(xmlhttp4.responseText.trim()); 
                switch (trabajo) {
                    case 'ev101':
                        argumentos.push(xmlhttp4.responseText);
                        ev101(2, argumentos);
                    break;
                    case 'desbloqueecartera':
                        desbloqueecartera(argumentos);                        
                        break;
                    case 'bloqueecartera':
                        bloqueecartera(argumentos);                        
                        break;
                    case 'registreactualizaciondeprecio':
                        var arlArgumentos = argumentos.split("|");
                        document.getElementById(seccion).innerHTML = '<input type="number" id="' + seccion + '" tag="' + arlArgumentos[2] + '" class="cajacredencial" fila="' + parseInt(arlArgumentos[6]) + '" placeholder="' + arlArgumentos[3] + '" idarticulo="' + arlArgumentos[5] + '" style="width: 120px; background-color: rgb(215, 228, 255);" onblur="registreactualizaciondeprecio(1, this);"></input>';
                        break;
                    case 'valideyregistrearticulodatos':                       
                        valideyregistrearticulodatos(argumentos, xmlhttp4.responseText);                        
                        break;
                   case 'registreajustedeinventario':                       
                        //var arlArgumentos = argumentos.split("|");
                        //document.getElementById(seccion).innerHTML = '<input type="number" id="' + seccion + '" tag="' + arlArgumentos[2] + '" class="cajacredencial" fila="' + parseInt(arlArgumentos[6]) + '" placeholder="' + arlArgumentos[3] + '" idarticulo="' + arlArgumentos[5] + '" style="width: 120px; background-color: rgb(215, 228, 255);" onblur="registreajustedeinventario(1, this);"></input>';
                        registreajustedeinventario('3', argumentos);
                        break;
                    case 'cambiarnombrealtercero':                      
                        cambiarnombrealtercero(2, argumentos);
                        break;
                    case 'cambiardatosaltercero':                       
                        alert('Los nuevos datos, fueron registrados con éxito.');
                    break;
                    case 'ev13050310':
                        ev13050310(2, xmlhttp4.responseText);
                    break;
                    case 'ev13050710':
                        argumentos.push(xmlhttp4.responseText);
                        ev13050710(argumentos[1], argumentos);
                    break;
                }
            }            
        }
    }
    xmlhttp4.send(null);
    return intIdRegistrado;
}

Gestor.prototype.RegistreOcurrencia = function (idevento, idadministrativo, idusuario, idreferenciado, idterminal, valor1, valor2, valor3, fecha1, fecha2, nota1, nota2, ideventocausante, idadministrativocausante, asincrono, seccion, trabajo, argumentos){
    var asincrono = asincrono || false;
    var seccion = seccion || '';
    var trabajo = trabajo || '';
    var argumentos = argumentos || '';
    var Gestor1 = new Gestor();    
    return Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 2 + ';' + idevento + '|' + idadministrativo + '|' + idusuario + '|' + idreferenciado + '|' + idterminal 
                                                + '|' + valor1 + '|' + valor2 + '|' + valor3 + '|' + fecha1 + '|' + fecha2 + '|' + nota1 + '|' + nota2 + '|' + ideventocausante + '|' + idadministrativocausante, asincrono, seccion, trabajo, argumentos);
}

Gestor.prototype.RegistreMovimiento = function (idevento, idadministrativo, ideventocausante, idadministrativocausante, subcuenta, auxiliar, escredito, valor) {
    valor = parseFloat(valor);
    var Gestor1 = new Gestor();        
    if ( valor == 0 ) { return; }
    var booEsSubCuentaDelCredito = Gestor1.DatosDeConsulta(10, subcuenta)[0][0];
    var douSald = 0;
    var arlSal = Gestor1.DatosDeConsulta(11, subcuenta + '|' + auxiliar);
    if ( arlSal.length != 0 ) { douSald = parseFloat(arlSal[0][0]); }
    /*if ( booEsSubCuentaDelCredito == 1) {
        if ( escredito == 0 ) { valor = -1 * parseFloat(valor); }        
     } else {
        if ( escredito == 1 ) { valor = -1 * parseFloat(valor); }        
    }*/
    if ( booEsSubCuentaDelCredito == 1 ) { 
        if ( !escredito ) {
            douSald = douSald - valor;
        } else {
            douSald += valor;
        }
    } else {
        if ( escredito == 1 ) {
            douSald = douSald - valor;            
        } else {
            douSald += valor;
        }
    }      
    return Gestor1.Registre("php/registre.php?q=" + strBaDa + ';' + 1 + ';' + idevento + "|" + idadministrativo + "|" + ideventocausante + "|" + idadministrativocausante 
                                           + "|" + subcuenta + "|" + auxiliar + "|" + escredito + "|" + valor + "|" + douSald + "|" + -1 * matUsuario[0]);
}

Gestor.prototype.UltimaOcurrenciaDe = function (idterminal, idevento, asincrono, seccion, trabajo, argumentos) {
    var asincrono = asincrono || false;
    var seccion = seccion || '';
    var trabajo = trabajo || '';
    var argumentos = argumentos || '';
    var intRetorno = 0;
    var Gestor1 = new Gestor();
    var arlRetorno = Gestor1.DatosDeConsulta(9, idterminal + '|' + idevento, false, asincrono, seccion, trabajo, argumentos);
    if ( asincrono ) { return; }
    if ( arlRetorno.length > 0 ) { return parseInt(arlRetorno[0][0]); }
    return intRetorno;      
}

var strconsultaant = '';

function ConsulteYResponda(consulta, asincrono, seccion, trabajo, argumentos) {
    if (consulta == 'borreanterior' ) { strconsultaant = ''; return; }
    if (strconsultaant == consulta) { return; }
    strconsultaant = consulta;
    if ( asincrono ) {
        if ( intconsultassimultaneas > 10 ) {
            var consultanueva = [];
            consultanueva.push(consulta);
            consultanueva.push(asincrono);
            consultanueva.push(seccion);
            consultanueva.push(trabajo);
            consultanueva.push(argumentos);
            consultas.push(consultanueva);
            console.log("Más de 10 consultas simultáneas: " + intconsultassimultaneas + ". Guardadas: " + consultas.length);
            return;
        } else { 
            intconsultassimultaneas +=1;
            console.log("Consultas Simultáneas: " + intconsultassimultaneas);
        }
    }
    var xmlhttp4 = new XMLHttpRequest();
 //   xmlhttp4.addEventListener("load", DatosRecibidos, false);
    xmlhttp4.open("POST", consulta, asincrono);
    xmlhttp4.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp4.setRequestHeader("Content-Length", consulta.length);
    var arlRetornable = new Array();
    arlRetornable.length = 0;
    xmlhttp4.setRequestHeader("Connection", "close");    
    xmlhttp4.onreadystatechange = function () {
        if ( xmlhttp4.status == 500 ) {
            if ( asincrono ) {
                var consultanueva = [];
                consultanueva.push(consulta);
                consultanueva.push(asincrono);
                consultanueva.push(seccion);
                consultanueva.push(trabajo);
                consultanueva.push(argumentos);
                consultas.push(consultanueva);
                console.log("Reenviando rechazada, quedan: " + intconsultassimultaneas + ". Guardadas: " + consultas.length);
                return;
            }
        }        
        if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) { 
            if ( asincrono ) { 
                intconsultassimultaneas = intconsultassimultaneas - 1; 
                console.log("Se resolvió una consulta y quedan: " + intconsultassimultaneas + ". Por enviar: " + consultas.length);
                if ( intconsultassimultaneas < 2 ) { 
                    //if ( !esperando ) {
                        if ( consultas.length > 0 ) { 
                            //esperando = true;
                            //console.log("Orden de esperar: " + intconsultassimultaneas);
                            //var espere = setTimeout(lanceconsultas, 1000); 
                            lanceconsultas();
                        }
                    //}                    
                }
            }                      
            if (xmlhttp4.responseText == 'nada') {
                switch (trabajo) {
                    case '111':
                        document.getElementById('modalLogin').setAttribute('style', 'display: none;');                        
                    break;
                    case 'datosdeconsulta':
                    //nada                         
                        break;
                    case 'autentiqueusuario': case 'ev13050501':
                        MuestreFormularioDeAutenticacion(); //general.js
                        break;
                    case 'autentiquecliente':
                        document.getElementById(seccion).innerText = 'Error: Id de cliente no hallado';
                        break;
                    case 'determineusuario':
                        document.getElementById(seccion).innerText = 'Error: Usuario no determinado';
                        break;
                    case 'cargueeventos':
                        document.getElementById(seccion).innerHTML = '';
                        break;
                    case 'coincidenciasde':
                        document.getElementById(secion).innerHTML = '';
                        break;                        
                    case 'carguebotonadicional':
                        carguebotonadicional(xmlhttp4.responseText, argumentos);
                        break;
                    case 'desbloqueecartera':
                        argumentos.push(xmlhttp4.responseText);
                        desbloqueecartera(2, argumentos);
                        break;
                    case 'bloqueecartera':
                        argumentos.push(xmlhttp4.responseText);
                        bloqueecartera(2, argumentos);
                        break;
                    case 'carguelistas':
                        document.getElementById(seccion).innerHTML = '<img style="margin-top: 20px;" src="imagenes/noencontrado.png" width=256 height=256></img><br>';
                        break;
                    case 'regorganiceparaactualizaciondepreciosenlista': case 'reorganiceparaajustedeinventario':
                        document.getElementById(seccion).innerHTML = '<img style="margin-top: 20px;" src="imagenes/noencontrado.png" width=256 height=256></img><br>';
                        break;  
                    case 'registreactualizaciondeprecio':
                        var arlArgumentos = argumentos.split("|");                                    
                        registreactualizaciondeprecio(arlArgumentos[0], arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5] + '|' + arlArgumentos[6] + '|' + 0);                        
                        break;
                    case 'registreajustedeinventario':
                        var arlArgumentos = argumentos.split("|");                                    
                        registreajustedeinventario(arlArgumentos[0], arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5] + '|' + arlArgumentos[6] + '|' + 0);                                                
                        break;
                    case 'muestretabla':
                        argumentos.push('nada');
                        muestretabla(2, argumentos);
                        break;
                    case 'reviserecibos':
                        arlRetornable = 0;
                    break;
                    case 'valideyregistrearticulodatos':                       
                        valideyregistrearticulodatos(argumentos, xmlhttp4.responseText);                        
                        break;
                    case 'actualizarinforme':
                        lnkInActualizar_Click(argumentos, xmlhttp4.responseText);
                        break;
                    case 'determinea':
                        document.getElementById(seccion).innerHTML = xmlhttp4.responseText;
                        break;
                    case 'ev100000':
                        argumentos.push(xmlhttp4.responseText);
                        switch ( argumentos[4] ) {
                            case 'ev130520':
                                alert('Ocurrió una excepción con la validación del usuario');
                                MuestreFormularioDeAutenticacion();
                                return; 
                            break;
                            case 'ev13050702':
                                ev13050702(2, argumentos);
                            break;
                            case 'cargueeventos':
                                cargueeventos(2, argumentos);
                            break;
                        }
                    break;
                    case 'ev13000603':
                        ev13000603(2, xmlhttp4.responseText);
                    break;
                    case 'ev13000606':
                        ev13000606(argumentos, xmlhttp4.responseText);
                    break;
                    case 'ev13000610':
                        ev13000610(argumentos, xmlhttp4.responseText);
                    break;          
                    case 'ev130007':
                        ev130007(argumentos, xmlhttp4.responseText);
                    break;                  
                    case 'ev13050703':
                        ev13050703(2, xmlhttp4.responseText);
                    break;
                    case 'ev13050710':
                        ev13050710(2, xmlhttp4.responseText);
                    break;
                    case 'ev130509':
                        document.getElementById(seccion).innerHTML = '<img style="margin-top: 20px;" src="imagenes/noencontrado.png" width=256 height=256></img><br>';
                    break;                   
                    case 'ev13050911':
                        ev130509(argumentos, xmlhttp4.responseText);
                    break;
                    case 'creditodesautorizados':
                        switch (seccion) {
                            case 'ev13050902':
                                argumentos.push(0);
                                ev13050902(2, argumentos);
                            break;
                        }
                    break;
                    case 'ev13050902':
                        alert('No se pudo registrar los cambios');
                        document.getElementById('lstPlanilla').rows[parseInt(argumentos[3])*2 + 1].cells[parseInt(arlId[1])].innerHTML = '<input type="number" id="' + argumentos[1] + '" vence="' + argumentos[2] + '" class="cajacredencial" fila="' + parseInt(argumentos[3]) + '" placeholder="' + argumentos[4] + '" style="' + argumentos[5] + '" onblur="' + argumentos[6] + '" clasedecliente="' + argumentos[7] + '">' + argumentos[8] + '</input>';
                    break;
                    case 'ev13050904':
                        ev13050904(2, argumentos);
                    break;
                    case 'ev13050906':
                        ev13050906(argumentos, xmlhttp4.responseText);
                    break;                  
                    case 'ev413594':
                        ev413594(argumentos, xmlhttp4.responseText);
                    break;
                    case 'ev41359403':
                        ev41359403(argumentos, xmlhttp4.responseText);
                    break;
                    case 'ev414020':
                        argumentos[0] += 1;
                        argumentos.push(0);
                        ev414020(argumentos[0], argumentos);
                    break;
                }
            } else {
                switch (trabajo) {
                    case '111':
                        muestredocumento(1, xmlhttp4.responseText);
                    break;
                    case 'datosdeconsulta':                        
                        arlRetornable = solGestorGen.CreeTabla('', true, xmlhttp4.responseText);
                        return arlRetornable;                        
                    case 'autentiqueusuario':                   
                        UsuarioAutenticado(xmlhttp4.responseText, seccion);
                        break;
                    case 'autentiquecliente': case "ev13050501":
                        ClienteAutenticado(xmlhttp4.responseText, seccion);             
                        break;
                    case 'determineusuario':
                        UsuarioDeterminado(xmlhttp4.responseText, seccion);
                        break;
                    case 'cargueeventos':
                        document.getElementById(seccion).innerHTML = xmlhttp4.responseText;
                        break;
                    case 'coincidenciasde':
                        document.getElementById(seccion).innerHTML = xmlhttp4.responseText;
                        if ( matUsuario[4] < 5 ) {                            
                            if ( document.getElementById("nuco") ) { document.getElementById("nuco").innerText = ""; }    
                        }                        
                        break;
                    case 'creetabla':
                        solGestorGen.CreeTabla(argumentos, true, xmlhttp4.responseText);
                        break;
                    case 'carguebotonadicional':
                        carguebotonadicional(xmlhttp4.responseText);
                        break;
                    case 'desbloqueecartera':
                        argumentos.push(xmlhttp4.responseText);
                        desbloqueecartera(2, argumentos);
                        break;
                    case 'bloqueecartera':
                        argumentos.push(xmlhttp4.responseText);
                        bloqueecartera(2, argumentos);
                        break;
                    case 'carguelistas':
                        carguelistas(argumentos, xmlhttp4.responseText);
                        break;
                    case 'reorganiceparaactualizaciondepreciosenlista':
                        reorganiceparaactualizaciondepreciosenlista(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                        break;
                    case 'reorganiceparaajustedeinventario':
                        reorganiceparaajustedeinventario(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                        break;
                    case 'registreactualizaciondeprecio':
                        var arlArgumentos = argumentos.split("|");                                    
                        registreactualizaciondeprecio(arlArgumentos[0], arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5] + '|' + arlArgumentos[6] + '|' + xmlhttp4.responseText);                        
                        break;
                    case 'registreajustedeinventario':
                        var arlArgumentos = argumentos.split("|");                                    
                        registreajustedeinventario(arlArgumentos[0], arlArgumentos[1] + '|' + arlArgumentos[2] + '|' + arlArgumentos[3] + '|' + arlArgumentos[4] + '|' + arlArgumentos[5] + '|' + arlArgumentos[6] + '|' + xmlhttp4.responseText);                                                
                        break;                    
                    case 'muestretabla':
                        argumentos.push(xmlhttp4.responseText);
                        muestretabla(2, argumentos);
                        break;
                    case 'valideyregistrearticulodatos':
                        valideyregistrearticulodatos(argumentos, xmlhttp4.responseText);                        
                        break;
                    case 'actualizarinforme':
                        lnkInActualizar_Click(argumentos,solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                        break;
                    case 'reorganiceparaarticulosdatos':
                        reorganiceparaarticulosdatos('1', solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                        break;
                    case 'determinea':
                        document.getElementById(seccion).innerHTML = xmlhttp4.responseText;
                        break;
                    case 'verifiqueversion':                        
                        intVersionActualizada = parseInt(xmlhttp4.responseText);
                        if ( intVersionActualizada > intVersion || !IsNumeric(xmlhttp4.responseText) ) { 
                            alert("La versión más reciente de esta app es la número " + xmlhttp4.responseText + " y su dispositivo ha cargado la " + intVersion + ". Le recomdamos forzar la actualización de su navegador."); 
                            document.getElementById("lblversion").innerText += " Obsoleta";
                        }
                    break;
                    case 'reviserecibos':
                        var conteo = xmlhttp4.responseText.split(";");
                        var cuantos = 0;
                        for ( var i = 0; i < conteo.length; i ++ ) {
                            if ( conteo[i] == '1' ) { cuantos += 1; }
                        }
                        arlRetornable = cuantos;
                    break;
                    case 'ev100000':                        
                        arlRetornable = solGestorGen.CreeTabla('', true, xmlhttp4.responseText);
                        argumentos.push(arlRetornable)
                        switch ( argumentos[4] ) {
                            case 'ev1':
                                ev1(2, argumentos);
                            break;
                            case 'ev100000':
                                ev100000(1, argumentos);
                            break;
                            case 'ev130520':
                                ev130520(argumentos);
                            break;
                            case 'ev13050504':
                                ev13050504(2, argumentos);
                            break;
                            case 'ev13050702':
                                ev13050702(2, argumentos);
                            break;
                            case 'cargueeventos':                               
                                cargueeventos(2, argumentos);
                            break;
                        }
                    break;
                    case 'ev32':
                        if ( xmlhttp4.responseText == '1' ) {
                            document.getElementById('td' + argumentos).innerHTML += '<img src="imagenes/advertencia.gif" width=64 height=64 />';
                        }
                    break;
                    case 'ev13000603':
                        ev13000603(2, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;
                    case 'ev13000606':
                        ev13000606(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;
                    case 'ev13000610':
                        ev13000610(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;
                    case 'ev130007':
                        ev130007(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;                  
                    case 'ev13050703':
                        ev13050703(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;
                    case 'ev13050710':
                        ev13050710(2, xmlhttp4.responseText);
                    break;
                    
                    case 'ev130509':
                        ev130509(2, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;
                    case 'ev13050907':
                        ev13050907(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;                    
                    case 'ev13050911':
                        ev130509(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;
                    case 'creditodesautorizados':
                        switch (seccion) {
                            case 'ev13050902':
                                argumentos.push(parseInt(xmlhttp4.responseText));
                                ev13050902(2, argumentos);
                            break;
                        }
                    break;
                    case 'ev13050902':
                        if ( !IsNumeric(xmlhttp4.responseText) ){ return; }
                        ev13050902(3, argumentos);
                    break;
                    case 'ev13050904':
                        argumentos[3] = xmlhttp4.responseText;
                        ev13050904(2, argumentos);
                    break;
                    case 'ev130589':
                        
                        if ( xmlhttp4.responseText == '0' ) { 
                            argumentos.style.backgroundColor = ColorRGB(250, 250, 250);
                        } else {
                            argumentos.style.backgroundColor = ColorRGB(242, 179, 41);
                        }                         
                    break;
                    case 'ev13050906':
                        ev13050906(argumentos, xmlhttp4.responseText);
                    break;
                    case 'decidasicerrarplanilla':
                        decidasicerrarplanilla(2, xmlhttp4.responseText);
                    break;
                    case 'ev413594':
                        ev413594(argumentos, solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                    break;
                    case 'ev41359403':
                        ev41359403(argumentos, xmlhttp4.responseText);
                    break;
                    case 'ev41401901':
                        ev41401901(2, argumentos);
                    break;
                    case 'ev41401902':
                        ev414019(2, solGestorGen.CreeTabla('', true, argumentos + '|' + xmlhttp4.responseText));
                    break;
                    case 'ev414020':
                        switch ( argumentos[0] ) {
                            case 1: case 2: case 3:
                                argumentos.push(solGestorGen.CreeTabla('', true, xmlhttp4.responseText));
                                argumentos[0] += 1;
                                ev414020(argumentos[0], argumentos);
                            break;                            
                        }
                    break;
                }
            }            
        }
    }
    xmlhttp4.send(null);
    return arlRetornable;
}

function lanceconsultas() {    
    var j = consultas.length;
    if (j > 10 ) { j = 10; }
    for ( var i = 0; i < j; i ++ ) {        
        var consultanueva = consultas[0];        
        ConsulteYResponda(consultanueva[0], consultanueva[1], consultanueva[2], consultanueva[3], consultanueva[4]);
        consultas.shift();        
    }
    //esperando = false;
}
