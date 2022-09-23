import axios from "axios";

//generalizamos para poder utilizarlo en todos los servicios

export default axios.create({
    //hace que por defecto, la ruta de api sea baseURL
    baseURL: "http://localhost:8080/api/v1",
    //solo acepta json, ida - vuelta
    headers: {"Content-type": "application/json"}
});