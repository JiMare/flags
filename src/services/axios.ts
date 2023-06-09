import axios from "axios";

const options = {
  baseURL: "https://restcountries.com/v3.1",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 0,
};

export const axiosInstance = axios.create(options);
