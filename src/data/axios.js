import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.evn.VITE_API_KEY_TMDB}`
  }
})

export default instance;