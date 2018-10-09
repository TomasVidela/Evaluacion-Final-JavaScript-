//// teclas//////

function TeclaActiva() {
  document.getElementById("1").style="transform: scale(1.08,1.08)";
}

function TeclaNoActiva() {
 document.getElementById("1").style="transform: scale(1,1)";
}

document.getElementById("1").onmousedown=TeclaActiva;
document.getElementById("1").onmouseup=TeclaNoActiva;


//variables
(function init() {
  var resultado = document.getElementById('display');
  var reset = document.getElementById('on');
  var suma = document.getElementById('mas');
  var resta = document.getElementById('menos');
  var multiplicacion = document.getElementById('por');
  var division = document.getElementById('dividido');
  var raiz = document.getElementById('raiz');
  var masMenos = document.getElementById('sign');
  var punto = document.getElementById('punto');
  var igual = document.getElementById('igual');

  var uno= document.getElementById('1');
  var dos = document.getElementById('2');
  var tres = document.getElementById('3');
  var cuatro = document.getElementById('4');
  var cinco = document.getElementById('5');
  var seis = document.getElementById('6');
  var siete = document.getElementById('7');
  var ocho = document.getElementById('8');
  var nueve = document.getElementById('9');
  var cero = document.getElementById('0');
})()

// eventos

uno.onclick = function(e) {
  resultado.textContent=resultado.textContent+"1"

}




var calculadora = {
	init : function(){ //Inicializa la calculadora
		var Operador1=''
		var Operador=''
		//Ingresamos en un vector el valor de las teclas
		var teclas = [0,1,2,3,4,5,6,7,8,9,'punto','on','sign','raiz','dividido','por','menos','mas','igual'];
		for(i=0;i<=18;i++){ //le otorgamos escuchas a los eventos cuando se oprime y suelta el mouse a cada tecla
			document.getElementById(teclas[i]).onmousedown=this.cambiaTeclas;
			document.getElementById(teclas[i]).onmouseup=this.cambiaTeclas;
		}


	},

	cambiaTeclas : function(eventoTecla){ //Cambia el efecto de las teclas y direcciona para realizar una accion

		var evento = eventoTecla || window.event; //capturamos el evento
		switch(evento.type) {
			case 'mousedown': //Si se oprime la tecla
				this.style="box-shadow: inset -50px -50px 50px 50px rgba(255,255,255,255)";
				break;
			case 'mouseup': //si se suelta la tecla
				this.style="box-shadow: 0 0 0 0 rgba(0,0,0,0)";
				calculadora.verifiqueAccion(this.id)  //Verificamos que accion tomar segun la tecla oprimida
				break;
			default :
				alert('no entra a ninguno de los casos de eventos en las teclas '+ evento.type);
				break;
		}
	},

	escribeEnPantalla : function(Valor){ //Escribe en la pantalla
		var display = document.getElementById('display')
		var Valor = String(Valor)
		var n = Valor.indexOf('-'); //Busco el negativo
		if(Valor != 'clear'){
			if(Valor.length>8 && n<0 && Valor != 0){
				Valor=Valor.substr(0,8)
			}else if(Valor.length>8 && n>=0 && Valor != 0){
				Valor=Valor.substr(0,9)
			}
			display.innerHTML=Valor
		}else{
			display.innerHTML=0;
		}

	},

	verifiqueAccion : function(idTecla){  //Verifica que tecla fue oprimida y realiza la accion correspondiente
		var display = document.getElementById('display')
		var displayValorActual= display.innerHTML
		var nuevoValor=displayValorActual
		console.log(displayValorActual)
		if(idTecla >=0 || idTecla<=9){ //Cuando la tecla va del 0 al 9

			if(displayValorActual=="0"){ //Si el valor actual es 0 lo reemplaza por el valor de la tecla oprimida
				nuevoValor=idTecla

			}else{
				nuevoValor=displayValorActual+idTecla
			}


		}
		//Si se oprime la tecla on
		if(idTecla == 'on'){
			nuevoValor="clear"

		}
		//si se oprime la tecla punto
		if(idTecla == 'punto'){
			var n = displayValorActual.indexOf('.'); //Busco el punto
			console.log(n)
			if(n<=0){
				nuevoValor=displayValorActual+'.'
			}

		}
		//si se oprime el signo negativo
		if(idTecla == 'sign'){
			var n = displayValorActual.indexOf('-'); //Busco el negativo
			console.log(n)
			if(n>=0){
				nuevoValor=displayValorActual.replace('-', '');
			}else{
				if(displayValorActual>0){
					nuevoValor='-'+displayValorActual
				}
			}

		}

		this.escribeEnPantalla(nuevoValor)

		//si se recibe algun comando
		if(idTecla == 'mas' || idTecla == 'menos' || idTecla == 'por' || idTecla == 'dividido'){
			this.Operador1=displayValorActual
			this.Operacion=idTecla
			display.innerHTML=''
		}

		//Si recibo el ==
		if(idTecla=='igual'){
			var resultado;
			resultado=this.operaciones(this.Operador1,nuevoValor,this.Operacion);

			this.escribeEnPantalla(resultado)
		}

		//Si recibo raiz
		if(idTecla=='raiz'){
			var resultado;
			resultado=Math.sqrt(displayValorActual);
			this.escribeEnPantalla(resultado)
		}


	},

	operaciones : function(Operador1,Operador2,Operacion){
		console.log(Operador1+" "+Operacion+" "+Operador2)
		if( Operador1 !='' && Operacion != ''){
			var resultado=0;
			switch (Operacion){
				case 'mas':
					resultado=parseFloat(Operador1)+parseFloat(Operador2);
					console.log(Operador1+" + "+Operador2+"="+resultado)
					return(resultado);
					break;
				case 'resta':
					resultado=parseFloat(Operador1)-parseFloat(Operador2);
					return(resultado);
					break;
				case 'por':
					resultado=parseFloat(Operador1)*parseFloat(Operador2);
					return(resultado);
					break;
				case 'dividido':
					resultado=parseFloat(Operador1)/parseFloat(Operador2);
					return(resultado);
					break;


			}


		}else{
			return('NA');
		}


	}

}

calculadora.init()
//////////////////////////




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
    this.asignarEfectoBotones(".tecla");
    this.asignarEventosBotones();
  }),

  //Efectos de los botones
  asignarEfectoBotones: function(){
    var tecla = document.querySelectorAll(".tecla");
    for (var i = 0; i < tecla.length; i++) {
      tecla[i].onmousedown = this.eventoMinimizaBoton;
      tecla[i].onmouseup = this.eventoAumentaBoton;
    };
  },

  eventoAumentaBoton: function(event){
    calculadora.AumentaBoton(event.target);
  },

  eventoMinimizaBoton: function(event){
    calculadora.MinimizaBoton(event.target);
  },

  //Acciones de los botones
  AumentaBoton: function(elemento){
    var x = elemento.id;
      elemento.style="transform: scale(1.08,1.08)";
  },

  MinimizaBoton: function(elemento){
    var x = elemento.id ;
      elemento.style="transform: scale(1,1)";

  },

  asignarEventosBotones: function(){
    document.getElementById("0").addEventListener("click", function(){
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

  ingresarNumero: function(numero){
    if (this.valorPantalla.length < 9) {
      if(this.valorPantalla == "0"){
        this.valorPantalla = "";
        this.valorPantalla = this.valorPantalla + numero;
      }else{
        this.valorPantalla = this.valorPantalla + numero;
      }
      this.actualizarPantalla();
    }
  },

  limpiarPantalla: function(){
    this.valorPantalla = "0";
    this.operacion = "0";
    this.primerValor = 0;
    this.segundoValor = 0;
    this.resultado = 0;
    this.teclaIgual = false;
    this.ultimoValor = 0;
    this.actualizarPantalla();
  },

  cambiarSigno: function(){
    if (this.valorPantalla != "0") {
      var aux;
      if (this.valorPantalla.charAt(0) == "-") {
        aux = this.valorPantalla.slice(1);
      } else {
        aux = "-" + this.valorPantalla;
      }
      this.valorPantalla = "";
      this.valorPantalla = aux;
      this.actualizarPantalla();
    }
  },

  actualizarPantalla: function(){
    this.pantalla.innerHTML = this.valorPantalla;
  },

  puntoDecimal: function(){
    if (this.valorPantalla.indexOf(".") == -1) {
      if (this.valorPantalla == "") {
        this.valorPantalla = this.valorPantalla + "0.";
      }else {
        this.valorPantalla = this.valorPantalla + ".";
      }
      this.actualizarPantalla();
    }
  },

  operaciones: function(oper){
    this.primerValor = parseFloat(this.valorPantalla);
    this.valorPantalla = "";
    this.operacion = oper;
    this.teclaIgual = false;
    this.actualizarPantalla();
  },

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
}

calculadora.init();
