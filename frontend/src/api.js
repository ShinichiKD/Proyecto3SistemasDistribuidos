import axios from "axios";

// TIENEN QUE CAMBIARLO CON SU NETWORK PARA QUE FUNCIONE EN CELU, SINO NO FUNCA XD

const url = "http://localhost:8080/api/";

export default class API {
  //LLAMADAS USUARIO
  static async addUsuario(data) {
    try {
      const res = await axios.post(url + "addUsuario", data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async login(data) {
    try {
      const res = await axios.post(url + "login", data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  
}
