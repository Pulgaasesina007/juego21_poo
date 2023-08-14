 
 import { useState, useEffect } from "react";
 import { crearNuevoMazo, elegirCarta } from "./api_cartas";
 
 const [idBaraja, setIdBaraja] = useState("");
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
  }



  return (
<div>
    <h3 className="text-orange-600 text-3xl font-extrabold uppercase" >
    Cartas del jugador:
    </h3>
  <div className="flex justify-center space-x-2 mb-4">
    {cartasJugador.map((carta, index) => (
      // Mostramos las cartas tomadas por el jugador.
      <img key={index} src={carta} alt="cartasJugador" className="w-24 h-auto" />
    ))}
  </div>
  <h3 className="text-orange-600 text-3xl font-extrabold uppercase">
    Cartas de la PC:
    </h3>
  <div className="flex justify-center space-x-2 mb-4">
    {cartasPc.map((carta, index) => (
      // Mostramos las cartas tomadas por la computadora
      <img key={index} src={carta} alt="cartaPc" className="w-24 h-auto" />
    ))}
  </div>
  </div>
  )
  export default getcartas