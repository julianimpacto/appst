var strDispositivo = '';
var intVersion = 222;
var intVersionActualizada = 0;
var escliente = false;
function MuestreFormularioDeAutenticacion() {    
  ConsulteYResponda("php/datosdeconsulta.php?q=mercavilla_Comunes;28;;", true, 'lblMensaje', 'verifiqueversion', '');    
  EstoyEnPC();    
  strDispositivo = '<img style="background-color: rgb(41,100,171);" src="imagenes/android.png"></img>';
  if ( enpc ) { 
    strDispositivo = '<img style="background-color: rgb(41,100,171);" src="imagenes/windows.png"></img>'; 
//    var intAlturaVentana = window.innerHeight;
    document.getElementsByTagName("body")[0].style = 'max-width: 1100px; margin: auto; border-radius:5px; border:4px solid #2E64AB; min-height: ' + window.innerHeight +'px;';
    document.getElementById('fooSoltec').style = 'max-width: 1100px;';
  }
  document.getElementById("secTitulo").innerHTML = '  <canvas id="canvas" height="256px" width="256px" onclick="animelogo();"></canvas>';
  document.getElementById("secContenido").innerHTML = '<section>'                             
                      + '  <div>'                                            
                      + '     <a id="lblversion" class="lblimportante" style="margin-bottom: 50px;">' + strDispositivo + '<br />Soltec Tiendas 5.1.' + intVersion + '</a>'
                      + '     <input type="text" class="cajacredencial" id="txtUsuario" placeholder="Usuario" onfocus="VacieTexto(this.id);" onKeyPress="txtUsuario_Keypress(this, event);" ><br />'
                      + '     <input type="password" class="cajacredencial" id="txtContrasena" placeholder="Contraseña" onfocus="VacieTexto(this.id);" onKeyPress="txtContrasena_Keypress(this, event);" ><br>'
                      //+ '     <a class="boton" id="fb" onclick="ingresar();">Ingresar con Facebook</a>'
                      + '     <div id="divLogo">'
                      + '       <img style="margin-top: 20px;" src="imagenes/seguridad.png"></img><br>'
                      //+ '       <a class="lbldesvaneciente" id="lblMensaje">Escriba sus credenciales</a>'
                      + '     </div>'
                      + '   <br /><a class="boton" id="cmdUsuario" onclick="AutentiqueUsuario();">Ingresar</a><a class="boton" id="fb" onclick="ingresar();" style="margin-left: auto;">Facebook</a>'                      
                      + '  </div>'
                      + ' </section>';
    document.getElementById("txtUsuario").focus();  
    if (!(window.File)) { alert('La API File no está soportada');}   
    animelogo(); 
}

function EstoyEnPC() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/windows phone/i.test(userAgent)) { enpc = false; }
  if (/android/i.test(userAgent)) { enpc = false; }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) { enpc = false; }
}

function AutentiqueUsuario() {
  var strContrasena = document.getElementById("txtContrasena").value;
  matUsuario[2] = document.getElementById("txtUsuario").value;
  document.getElementById('divLogo').innerHTML = '<img style="margin-top: 20px;" src="imagenes/cargando.gif" width=300 height=400></img><br>'
                                               + '<a class="lbldesvaneciente" id="lblMensaje">Verificando su informaci&oacute;n</a>';    
  var strUsuario = matUsuario[2];    
  if ( IsNumeric(document.getElementById('txtUsuario').value) ) {
    ConsulteYResponda("php/datosdeconsulta.php?q=mercavilla_codex;13050501;" + strUsuario + "|" + strContrasena, true, 'lblMensaje', 'ev13050501', '');
    escliente = true;
    return;
  }
  if ( intVersionActualizada > intVersion ) { alert("Versión obsoleta"); return; }
    if (strContrasena.length == 0 || strUsuario.length == 0) {
      MuestreFormularioDeAutenticacion();
      return;
    }
    ConsulteYResponda("php/autentiqueusuario.php?q=;" + strUsuario + ";" + strContrasena, true, 'lblMensaje', 'autentiqueusuario', '');
}

function txtUsuario_Keypress(sender, e) {
  var keyascii =(e.keyCode ? e.keyCode : e.which);
  if (keyascii == 13 ) { document.getElementById("txtContrasena").focus(); }
}

function txtContrasena_Keypress(sender, e) {
  var keyascii =(e.keyCode ? e.keyCode : e.which);
  if (keyascii == 13 ) {AutentiqueUsuario(); }
}

function UsuarioAutenticado(idli, seccion){ 
    document.getElementById(seccion).innerText = 'Determinando cliente';
    ConsulteYResponda("php/autentiquecliente.php?q=" + idli , true, 'lblMensaje', 'autentiquecliente', '');
}

function ClienteAutenticado(argumentos, seccion){
    var matDatos = argumentos.split("|");
    if ( Fecha(matDatos[1]) < Hoy() ) { 
        document.getElementById("divLogo").innerHTML = '<img style="margin-top: 20px;" src="imagenes/desautorizado.png" ></img><br>'
                                                     + '<a class="lbldesvaneciente" id="lblMensaje">Su suscripción, ha vencido</a>';
        return;
    }
    strBaDa = matDatos[2];
  var strURL = document.URL;
  if ( strURL.indexOf('localhost') != -1 ) { strBaDa = 'codex'; }
  if ( strURL.indexOf('192.168') != -1 ) { strBaDa = 'codex'; }
    strLogo = matDatos[3];        
  intIdLi = parseInt(matDatos[4]);
    intActividadPrincipal = parseInt(matDatos[5].replace('\r\n', ''));  
    document.getElementById(seccion).innerText = 'Preparando la App para ' + matDatos[0];
    document.getElementById("secTitulo").innerHTML = '';
  var arlArgumentos = new Array();
  arlArgumentos.push(argumentos); arlArgumentos.push('lblMensaje'); arlArgumentos.push(false); arlArgumentos.push('');
  arlArgumentos.push('ev130520');
  ConsulteYResponda("php/datosdeconsulta.php?q=" + strBaDa + ";100000;|usuarios|no|" + matUsuario[2] + '||;false', true,  '', 'ev100000', arlArgumentos);
}

function animelogo() { 
  intPaso = 0;
  tmrLogo = setInterval(redibujelogo, 40); 
}

function redibujelogo() {
  if ( !document.getElementById( "elementID" )) { clearInterval(tmrLogo); return; }
  var canvas = document.getElementById('canvas');
  var c = canvas.getContext('2d');  
  if ( intPaso < 35 ) {
    c.fillStyle = 'rgb(240,240,240)'; 
    c.fillRect(0, 0, 256, 256);
    c.fillStyle = 'rgb(46,100,171)';    
    c.strokeStyle = 'rgba(46,100,171,' + 0.049*intPaso + ')'; 
    c.lineWidth = 4;
    c.beginPath();  
    c.arc(128, 128, 121, (250-10*intPaso)*(Math.PI/180), 270*(Math.PI/180), false);   
    c.stroke(); 
  } 
  //var intModule = 0;
  //if ( !enpc ) { intModule = 1; }
  if ( intPaso > 20 ) {
    c.fillStyle = 'rgba(46,100,171,' + 0.05*(intPaso-20) + ')'; 
    //
  c.font = "83px Verdana";
    c.fillText('SACC', 10, 156);    
  }
  if ( intPaso > 40 ) { clearInterval(tmrLogo); }
  intPaso+=1;
}

function desaparezcamodal() {
  document.getElementById('modalLogin').setAttribute('style', 'display: none;'); 
}
window.addEventListener("load", MuestreFormularioDeAutenticacion, false);