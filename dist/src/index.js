//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
var canvas;
var graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
var cv;
var obj;
var ang = 0;
var AbrirCj1 =0;
//var CerrarCj1 = 0;
var AbrirCj2 = 0;
//var CerrarCj2 =0;
var RotarIzq = 0;
var RotarDer =0;
var limiteCj1 = 3;
var limiteCj2 = 3;
var limiteIzq = 6;
var limiteDer = 6;
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
        obj = new Obj3D();
        if (obj.read(contenido)) {
            //sDir = sDir1;
            cv = new CvHLines(graphics, canvas);
            cv.setObj(obj);
            cv.paint();
        }
    };
    lector.readAsText(archivo);
}
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    //
    //readObject(new Input(contenido));
    elemento.innerHTML = contenido;
}
function vp(dTheta, dPhi, fRho) {
    if (obj != undefined) {
        var obj_1 = cv.getObj();
        if (!obj_1.vp(cv, dTheta, dPhi, fRho))
            alert('datos no validos');
    }
    else
        alert('aun no has leido un archivo');
}
function eyeDownFunc() {
    vp(0, 0.1, 1);
}
function eyeUpFunc() {
    vp(0, -0.1, 1);
}
function eyeLeftFunc() {
    vp(-0.1, 0, 1);
}
function eyeRightFunc() {
    vp(0.1, 0, 1);
}
function incrDistFunc() {
    vp(0, 0, 2);
}
function decrDistFunc() {
    vp(0, 0, 0.5);
}
function Abrir() {
    if(AbrirCj1 < limiteCj1){
        var af = 10;
    for (var i = 73; i <= 88; i++) {
        obj.w[i].x = obj.w[i].x + 2;
    }
    cv.setObj(obj);
    cv.paint();
    AbrirCj1++;
    }
    
}
function Cerrar() {

    if(AbrirCj1 > 0){
        var af = 10;
    for (var i = 73; i <= 88; i++) {
        obj.w[i].x = obj.w[i].x - 2;
    }
    cv.setObj(obj);
    cv.paint();
    AbrirCj1--;
    }
    
}

function AbrirSegundo() {
    if(AbrirCj2 < limiteCj2){
        var af = 10;
    for (var i = 97; i <= 112; i++) {
        obj.w[i].x = obj.w[i].x + 2;
    }
    cv.setObj(obj);
    cv.paint();
    AbrirCj2++;
}

    }
    

function CerrarSegundo() {
    if(AbrirCj2 > 0){
        var af = 10;
    for (var i = 97; i <= 112; i++) {
        obj.w[i].x = obj.w[i].x - 2;
    }
    cv.setObj(obj);
    cv.paint();
    AbrirCj2--;
    }
    
}

function RotDerFunc() {
    if(RotarDer < limiteDer){
        var af = 10;
    Rota3D.initRotate(obj.w[124], obj.w[128], af * Math.PI / 180);
    for (var i = 129; i <= 136; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
    RotarDer++;
    }
    
}
function Rot1IzqFunc() {
    if(RotarIzq < limiteIzq){
        var af = -10;
    Rota3D.initRotate(obj.w[124], obj.w[128], af * Math.PI / 180);
    for (var i = 129; i <= 136; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
    RotarIzq++;
    }
    
}
/*function pza12DerFunc() {
  for (let i = 73; i <= 88; i++){
    obj.w[i].x=obj.w[i].x-2;
    }
}

function pza12IzqFunc() {
  let af = -10;
  console.log(obj.w[29], obj.w[30]);
    Rota3D.initRotate( obj.w[29], obj.w[30], af*Math.PI/180);
    
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
  
    cv.setObj(obj);
  cv.paint();
}*/
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);
//movimiento de piezas
document.getElementById('pza1Izq').addEventListener('click', Abrir, false);
document.getElementById('pza1Der').addEventListener('click', Cerrar, false);
document.getElementById('pza2Izq').addEventListener('click', AbrirSegundo, false);
document.getElementById('pza2Der').addEventListener('click', CerrarSegundo, false);
//rotacion de pantalla
document.getElementById('RotacionDer').addEventListener('click', RotDerFunc, false);
document.getElementById('RotacionIzq').addEventListener('click', Rot1IzqFunc, false);
var Pix, Piy;
var Pfx, Pfy;
var theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
var flag = false;
function handleMouse(evento) {
    Pix = evento.offsetX;
    Piy = evento.offsetY;
    flag = true;
}
function makeVizualization(evento) {
    if (flag) {
        Pfx = evento.offsetX;
        Pfy = evento.offsetY;
        //console.log(Pfx, Pfy)
        var difX = Pix - Pfx;
        var difY = Pfy - Piy;
        vp(0, 0.1 * difY / 50, 1);
        Piy = Pfy;
        vp(0.1 * difX, 0 / 50, 1);
        Pix = Pfx;
        /*if( Piy>Pfy+1 ){
          phi += SensibilidadY;
          vp(0, 0.1*, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }
    
        if(Pfy>Piy+1){
          phi -= SensibilidadY;
          vp(0,-0.1, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }*/
        /*if (Pix > Pfx + 1) {
          theta += SensibilidadX;
          vp(0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }
            
        if (Pfx > Pix + 1) {
          theta -= SensibilidadX;
          vp(-0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }*/
    }
}
function noDraw() {
    flag = false;
}
canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);
