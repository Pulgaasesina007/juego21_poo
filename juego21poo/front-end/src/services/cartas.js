import axios from "./api_cartas";

export const crearNuevoMazo = async () => {
    try {
      const response = await axios.get(`/new/shuffle/?deck_count=1`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error("Error al crear un nuevo mazo.");
    }
  };
  
  export const elegirCarta = async (deckId) => {
    try {
      const response = await axios.get(`${deckId}/draw/?count=1`);
      return response.data.cards[0];
    } catch (error) {
      throw new Error("Tarjeta de dibujo de error.");
    }
  };
   
