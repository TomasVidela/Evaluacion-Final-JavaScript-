var calculadora = {
  pantalla: document.getElementById('display'),
  valorPantalla: "0",
  operacion: "",
  primerValor: 0,
  segundoValor: 0,
  ultimoValor: 0,
  resultado: 0,
  teclaIgual: false,

  init: (function(){
    this.asignarEfectoBotones(); // ejecutar EfectoBotones
  //  this.asignarEventosBotones();// ejecutar EventosBotone
  }),

///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Efectos de los botones
  asignarEfectoBotones: function(){
    var teclas = document.querySelectorAll(".tecla");
    for (var i = 0; i < teclas.length; i++) {
      teclas[i].onmousedown = this.MinimizaBoton;
      teclas[i].onmouseup = this.AumentaBoton;
    };
  },

  //Acciones de los botones
  AumentaBoton: function(aumento){
      aumento.target.style="transform: scale(1.08,1.08)";
  },

  MinimizaBoton: function(minimiza){
      minimiza.target.style="transform: scale(1,1)";
  },
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



}
calculadora.init();
