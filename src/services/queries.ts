import { axiosInstance } from "./axios";

export const getAllFlags = () =>
  axiosInstance.get("/all").then((response) => response.data);

export const getFlagByName = (name: string) =>
  axiosInstance.get(`/name/${name}`).then((response) => response.data);

export const getNamesByCodes = (countries: string[]) =>
  axiosInstance
    .get("/alpha", {
      params: {
        codes: countries.join(","),
      },
    })
    .then((response) => response.data);
