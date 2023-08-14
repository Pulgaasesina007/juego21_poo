
import axios from "axios";

// configurar axios con la url base del backend y para que acepte cokkie

const instance = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck' 
});

export default instance;