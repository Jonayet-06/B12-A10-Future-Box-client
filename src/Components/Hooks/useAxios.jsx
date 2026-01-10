import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://b12-a10-future-box-server-omega.vercel.app/",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
