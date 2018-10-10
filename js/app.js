var calculadora = {
  pantalla: document.getElementById('display'),
  valorPantalla: "",
  operacion: "",
  primerValor: 0,
  segundoValor: 0,
  ultimoValor: 0,
  resultado: 0,
  teclaIgual: false,

  init: (function(){
    this.asignarEfectoBotones(); // ejecutar EfectoBotones
    this.asignarEventosBotones();// ejecutar EventosBotone
  }),

////////////////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////////////////

asignarEventosBotones: function(){
  document.getElementById("0").addEventListener("click", function(){ // escuchar el evento click  del documento e ingresar numero
    calculadora.ingresarNumero("0");
  });
  document.getElementById("1").addEventListener("click", function(){
    calculadora.ingresarNumero("1");
  });
  document.getElementById("2").addEventListener("click", function(){
    calculadora.ingresarNumero("2");
  });
  document.getElementById("3").addEventListener("click", function(){
    calculadora.ingresarNumero("3");
  });
  document.getElementById("4").addEventListener("click", function(){
    calculadora.ingresarNumero("4");
  });
  document.getElementById("5").addEventListener("click", function(){
    calculadora.ingresarNumero("5");
  });
  document.getElementById("6").addEventListener("click", function(){
    calculadora.ingresarNumero("6");
  });
  document.getElementById("7").addEventListener("click", function(){
    calculadora.ingresarNumero("7");
  });
  document.getElementById("8").addEventListener("click", function(){
    calculadora.ingresarNumero("8");
  });
  document.getElementById("9").addEventListener("click", function(){
    calculadora.ingresarNumero("9");
  });
  document.getElementById('on').addEventListener("click", function(){
    calculadora.limpiarPantalla();
  });
  document.getElementById('sign').addEventListener("click", function(){
    calculadora.cambiarSigno();
  });
  document.getElementById('punto').addEventListener("click", function(){
    calculadora.puntoDecimal();
  });
  document.getElementById('raiz').addEventListener("click", function(){
    calculadora.operaciones("raiz");
  });
  document.getElementById('dividido').addEventListener("click", function(){
    calculadora.operaciones("/");
  });
  document.getElementById('por').addEventListener("click", function(){
    calculadora.operaciones("*");
  });
  document.getElementById('menos').addEventListener("click", function(){
    calculadora.operaciones("-");
  });
  document.getElementById('mas').addEventListener("click", function(){
    calculadora.operaciones("+");
  });
  document.getElementById('igual').addEventListener("click", function(){
    calculadora.resultadoPantalla();
  });

},
///////////////////////////////////////////////////////////////////////////////

actualizarPantalla: function(){
  this.pantalla.innerHTML = this.valorPantalla; // ingresar Numero
},
///////////////////////////////////////////////////////////////////////////////

ingresarNumero: function(numero){

  if (this.valorPantalla.length < 9) {  //valor de la pantalla menor que 9 digitos
    if(this.valorPantalla == "0"){  //si el valor de  la pantalla es igual a 0
      this.valorPantalla = "";  // espacio para valor nuevo Valor
      this.valorPantalla = this.valorPantalla + numero; // concatenar  valorde la pantalla  mas nuevo Valor
    }else{
      this.valorPantalla = this.valorPantalla + numero; // de otro modo concatenar valor de la pantalla  mas nuevo Valor
    }
    this.actualizarPantalla();
  }
},
///////////////////////////////////////////////////////////////////////////////

limpiarPantalla: function(){ //funcion que reinicia todos los valosres
  this.valorPantalla = "0";
  this.operacion = "0";
  this.primerValor = 0;
  this.segundoValor = 0;
  this.resultado = 0;
  this.teclaIgual = false;
  this.ultimoValor = 0;
  this.actualizarPantalla();
},
///////////////////////////////////////////////////////////////////////////////

cambiarSigno: function(){
  if (this.valorPantalla != "0") { // si el valor de la pantalla no es igual a 0
    var signo;
    if (this.valorPantalla.charAt(0) == "-") { //si el primer valor de la pantalla es igual a -
      signo=this.valorPantalla.slice(1); //regersar al segundo valor inicial
    } else { // caso contrario
      signo = "-" + this.valorPantalla; // utilizar el signo - mas el valor de la pantalla
    }
    this.valorPantalla = "";
    this.valorPantalla = signo;
    this.actualizarPantalla();
  }
},
////////////////////////////////////////////////////////////////////////////////

puntoDecimal: function(){
  if (this.valorPantalla.indexOf(".") == -1) { // valor del inicial del punto de desimal
    if (this.valorPantalla == "") { // si el valor de la pantalla esta en inicio
      this.valorPantalla = this.valorPantalla + "0."; // el valor de la pantalla sera 0 mas el punto
    }else { //caso contrario
      this.valorPantalla = this.valorPantalla + "."; //al valor de la pantalla de le concatena el punto
    }
    this.actualizarPantalla();
  }
},
///////////////////////////////////////////////////////////////////////////////

operaciones: function(oper){
  this.primerValor = parseFloat(this.valorPantalla);
  this.valorPantalla = "";
  this.operacion = oper;
  this.teclaIgual = false;
  this.actualizarPantalla();
},
///////////////////////////////////////////////////////////////////////////////

resultadoPantalla: function(){
  if(!this.teclaIgual){
    this.segundoValor = parseFloat(this.valorPantalla);
    this.ultimoValor = this.segundoValor;

    this.ejecutarOperacion(this.primerValor, this.segundoValor, this.operacion);
  } else {
    this.ejecutarOperacion(this.primerValor, this.ultimoValor, this.operacion);
  }

  this.primerValor = this.resultado;

  this.valorPantalla = "";

  if(this.resultado.toString().length < 9){
    this.valorPantalla = this.resultado.toString();
  }else{
    this.valorPantalla = this.resultado.toString().slice(0, 9) + "...";
  }

  this.teclaIgual = true;
  this.actualizarPantalla();
},
///////////////////////////////////////////////////////////////////////////////

ejecutarOperacion: function(primerValor, segundoValor, operacion){
  switch (operacion) {
    case "+":
      this.resultado = eval(primerValor + segundoValor);
      break;
    case "-":
      this.resultado = eval(primerValor - segundoValor);
      break;
    case "*":
      this.resultado = eval(primerValor * segundoValor);
      break;
    case "/":
      this.resultado = eval(primerValor / segundoValor);
      break;
    case "raiz":
      this.resultado = eval(Math.sqrt(primerValor));
      break;
    default:
      this.resultado = "Error";
  }
}
////////////////////////////////////////////////////////////////////////////////

}
calculadora.init();
