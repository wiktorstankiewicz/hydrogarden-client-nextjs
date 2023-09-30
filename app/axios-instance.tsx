import axios from "axios";


export default axios.create({
    baseURL: "http://192.168.0.2:8080",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
}); 



