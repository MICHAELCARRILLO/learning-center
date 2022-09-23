import axios from "axios";

//hace que por defecto, la ruta de api sea baseURL
export default axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {"Content-type": "application/json"}
});