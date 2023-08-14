

import { useState, useEffect } from "react";

import { elegirCarta,crearNuevoMazo } from "../services/cartas";

const Blacjack = () => {

  const [idBaraja, setIdBaraja] = useState("");
  const [turnoJugador, setTurnoJugador] = useState(true);

  const [puntuacionJugador, setPuntuacionJugador] = useState(0);
  const [puntuacionComputadora, setPuntuacionComputadora] = useState(0);
  const [puntuacionRondaActual, setPuntuacionRondaActual] = useState(0);
  const [partidasJugador, setPartidasJugador] = useState(0);
  const [partidasMaquina, setPartidasMaquina] = useState(0); 
  const [empates, setEmpates] = useState(0);
  const [cartasJugador, setCartasJugador] = useState([]);
  const [cartasPc, setCartasPc] = useState([]);
  const [mensaje, setmensaje] = useState("")
  const [plantarJugador, setPlantarJugador] = useState(false)
  const [botonPlantar, setbotonPlantar] = useState(false)
  const [empezarJuego, setEmpezarJuego] = useState(true)
  const [cartasUsadas, setCartasUsadas] = useState([]);


//turnos



  // useEffect para preparar el juego al cargar la aplicación.
  useEffect(() => {
    async function prepararJuego() {
      try {
        // Creamos una nueva baraja y guardamos su ID.
        const nuevaBaraja = await crearNuevoMazo();
        setIdBaraja(nuevaBaraja.deck_id);
      } catch (error) {
        console.error(error.message);
        
      }
    }

    prepararJuego();
  }, []);

  const empezar = async () => {
    setEmpezarJuego(false);
    setbotonPlantar(true);
    for (let i = 0; i < 2; i++) {
      const carta = await elegirCarta(idBaraja);
      const valorCarta = obtenerValorCarta(carta.value);
      setPuntuacionJugador((prevPuntuacion) => prevPuntuacion + valorCarta);
      setCartasJugador((prevCartas) => [...prevCartas, carta.image]);
      setPuntuacionRondaActual((prevPuntuacionActual) => prevPuntuacionActual + valorCarta);
      setCartasUsadas((prevcartasUsadas) => [...prevcartasUsadas,valorCarta] )
      console.log("cartasjugador",cartasUsadas)
      console.log("Cartas del jugador:", carta);


    }
    for (let i = 0; i < 2; i++) {
      const carta = await elegirCarta(idBaraja);
      const valorcarta = obtenerValorCarta(carta.value);
      setPuntuacionComputadora((prevPuntuacionPc) => prevPuntuacionPc + valorcarta);
      setCartasPc((prevCartasPc) => [...prevCartasPc, carta.image]);
      console.log("Cartas de la Pc:", carta);
      setCartasUsadas((prevcartasUsadas) => [...prevcartasUsadas,valorcarta] )
      console.log("cartasjugador",cartasUsadas)
      console.log("cartasmaquina",cartasUsadas)
    }

  };
  const determinarGanador = () => {

    if (puntuacionJugador > 21) {
      setmensaje("Su puntuación es mayor a 21, has perdido");
      actualizarEstadisticas("maquina"); 
      
  
    } else if (puntuacionComputadora > 21) {
      setmensaje("La computadora ha perdido, tu ganas!"); 
      actualizarEstadisticas("jugador"); 
  
    } else if (puntuacionJugador === puntuacionComputadora) {
      setmensaje("Hubo un empate");
      actualizarEstadisticas("empate"); 
    } else if (puntuacionJugador > puntuacionComputadora) {
      setmensaje("¡Felicitaciones! Has ganado");
      actualizarEstadisticas("jugador"); 
  
    } else {
      setmensaje("La computadora ha ganado, mejor suerte la próxima vez");
      actualizarEstadisticas("maquina"); 
    }
  
  }

  // Función para que el jugador tome una carta.
  const tomarCarta = async () => {
    try {
      // Elegimos una carta de la baraja utilizando su ID.
     
      const carta = await elegirCarta(idBaraja);
    
      const valorCarta = obtenerValorCarta(carta.value);
      const nuevaPuntuacionRonda = puntuacionRondaActual + valorCarta
      setCartasUsadas((prevcartasUsadas) => [...prevcartasUsadas,valorCarta] )
      
      console.log(" Array de cartas usadas", cartasUsadas)

      if (nuevaPuntuacionRonda > 21) {
        setmensaje("Su puntuacion es mayor a 21, has perdido")
      } else {
        setPuntuacionRondaActual(nuevaPuntuacionRonda);
        setCartasJugador([...cartasJugador, carta.image]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const tomarCartaComputadora = async () => {
    if (puntuacionComputadora) {
      try {
        const carta = await elegirCarta(idBaraja);
        const valorCarta = obtenerValorCarta(carta.value);
        setPuntuacionComputadora(puntuacionComputadora + valorCarta);

        setCartasPc([...cartasPc, carta.image])
        setCartasUsadas((prevcartasUsadas) => [...prevcartasUsadas,valorCarta] )
        console.log("prueba maquina",cartasUsadas)

      } catch (error) {
        console.error(error.message);
      }
    }
  }


  useEffect(() => {
    if (plantarJugador && puntuacionComputadora < 17) {
      const interval = setInterval(() => {
        tomarCartaComputadora();
      }, 800);

      return () => clearInterval(interval);
    } else if (plantarJugador) {
      determinarGanador(); 
    }

  }, [plantarJugador, puntuacionComputadora]);

  // Función para finalizar la ronda
  const plantar = async () => {
    setPuntuacionJugador(puntuacionRondaActual);
    setPuntuacionRondaActual(0);
    setPlantarJugador(true)
    setbotonPlantar(false)
    await tomarCartaComputadora(); 
  };


  // Función para reiniciar el juego.
  const reiniciarJuego = async () => {
    try {
      // Creamos una nueva baraja y guardamos su ID.
      const nuevaBaraja = await crearNuevoMazo();
      setIdBaraja(nuevaBaraja.deck_id);

      setPuntuacionJugador(0);
      setPuntuacionComputadora(0);
      setPuntuacionRondaActual(0);
      setCartasJugador([]);
      setCartasPc([]);
      setmensaje("");
      setEmpezarJuego(true); 
      setPlantarJugador(false); 
      setbotonPlantar(true); 
    } catch (error) {
      console.error(error.message);
    }
  };

  // Función para obtener el valor de una carta en puntos (considerando que las figuras valen 10 y el As 11).
  const obtenerValorCarta = (valorCarta) => {
    switch (valorCarta) {
      case "KING":
      case "QUEEN":
      case "JACK":
        return 10;
      case "ACE":
        return 1;
      default:
        return parseInt(valorCarta);
    }
  };
// estadisticas de juego
const actualizarEstadisticas = (ganador) => {
  if(ganador === "jugador") {
    setPartidasJugador(partidasJugador + 1);
  } else if (ganador === "maquina") {
    setPartidasMaquina(partidasMaquina + 1);
  } else {
    setEmpates(empates + 1); 
  }
  

  
}



//fin juego
const terminarJuego = () => {

  setTurnoJugador(false); 

  if(puntuacionComputadora >= 17) {

    determinarGanador();  

    setmensaje("El juego ha terminado!");

  } else {
    tomarCartaComputadora();
  }

  // Reiniciar estadísticas
  setPartidasJugador(0);
  setPartidasMaquina(0); 
  setEmpates(0);
  
  // Reiniciar juego
  reset(); 

}

// Función para reiniciar el juego
const reset = async () => {

  try {

    // Reiniciar baraja
    const nuevaBaraja = await crearNuevoMazo();
    setIdBaraja(nuevaBaraja.deck_id);
    console.log(nuevaBaraja.deck_id)

    // Reiniciar puntajes
    setPuntuacionJugador(0);
    setPuntuacionComputadora(0);
    setPuntuacionRondaActual(0);

    // Reiniciar cartas
    setCartasJugador([]);
    setCartasPc([]);

  } catch (error) {
    console.error(error.message);
  }

}








  
return (

  <div className="relative h-screen">

    <div className="absolute top-0 left-0 w-full h-full bg-cover"  
         style={{backgroundImage: "url('/fondo6.webp')"}}>
    </div>

    <div className="p-4 z-10">

      <div className="backdrop-blur-sm">
     
        <div className="flex justify-between">
        
          <div className="bg-transparent p-4 rounded-lg shadow-md">
            <h2 className="text-white text-lg font-bold mb-2">Tu puntuación:</h2>
            <div className="text-white text-3xl font-bold">{puntuacionJugador}</div>
          </div>
    
          <div className="bg-transparent p-4 rounded-lg shadow-md">
            <h2 className="text-white text-lg font-bold mb-2">Puntuación computadora:</h2>
            <div className="text-white text-3xl font-bold">{puntuacionComputadora}</div>
          </div>

        </div>

        <h3 className="text-orange-600 text-3xl font-extrabold uppercase">Cartas del jugador:</h3>

        <div className="flex justify-center space-x-2 mb-4">
          {cartasJugador.map(carta => <img src={carta} className="w-24 h-auto"/>)} 
        </div>

        <h3 className="text-orange-600 text-3xl font-extrabold uppercase">Cartas de la PC:</h3>

        <div className="flex justify-center space-x-2 mb-4">
          {cartasPc.map(carta => <img src={carta} className="w-24 h-auto"/>)}
        </div>

        <div className="stats-container">
        <div className="stats-container">

<h3 className="text-3xl font-bold text-center mt-8 text-white">Estadísticas</h3>

<div className="stats">

  <div className="text-white">
    <div className="text-xl font-medium">Partidas ganadas jugador</div>
    <div className="text-3xl font-bold">{partidasJugador}</div> 
  </div>

  <div className="text-white">
     <div className="text-xl font-medium">Partidas ganadas máquina</div>
     <div className="text-3xl font-bold">{partidasMaquina}</div>
  </div>

  <div className="text-white">
    <div className="text-xl font-medium">Empates</div>
    <div className="text-3xl font-bold">{empates}</div>
  </div>

</div>

</div>
        </div>
<nav className="bg-gray-800">
<div className="flex space-x-4">

<button
          onClick={empezar}
          disabled={!empezarJuego}
          
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          
          Empezar
        </button>

        <button
          onClick={tomarCarta}
          disabled={!tomarCarta}
          
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          
          Tomar carta
        </button>

  
        <button
          onClick={plantar}
          disabled={!botonPlantar}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Plantar
        </button>
        <button
          onClick={terminarJuego}
          disabled={!terminarJuego}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Reiniciar partida 
        </button>
        <button
          onClick={reiniciarJuego}
          disabled={!reiniciarJuego}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Continuar jugando 
        </button>

</div>
        </nav>

      </div>

    </div>

  </div>

)

}

export default Blacjack;
