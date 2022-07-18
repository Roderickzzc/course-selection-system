import axios from "../axios";

function login(username, password) {
    return axios.post('/api/token/', {//POST localhost:8000
        username: username,
        password: password,
    });
}

export default login;