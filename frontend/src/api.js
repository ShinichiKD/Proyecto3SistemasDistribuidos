import axios from "axios";

// TIENEN QUE CAMBIARLO CON SU NETWORK PARA QUE FUNCIONE EN CELU, SINO NO FUNCA XD

const url = "http://34.170.61.29:8080/api/";

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
      console.log(res.data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async getUsuarios() {
    try {
      const res = await axios.get(url + "getUsuarios");
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async updateUsuario(data) {
    try {
      const res = await axios.put(url + "updateUsuario", data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async addMensaje(data) {
    try {
      const res = await axios.post(url + "addMensaje", data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async addmensajetochat(data) {
    try {
      const res = await axios.post(url + "addmensajetochat", data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async getChat(tipo) {
    try {
      const res = await axios.get(url + `getchat/` + tipo);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async getChatPrivados(id1, id2) {
    try {
      const res = await axios.get(url + `getchat/` + id1 + `/` + id2);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
