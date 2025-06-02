import axios from "axios";

const reservasApi = axios.create({
  baseURL: "http://localhost:3000",
});
export const getReservas = async () => {
  const res = await reservasApi.get("/reservas");
  return res.data;
};

export const createReservas = (servicios) => {
  return reservasApi.post("/reservas", servicios);
};

export const updateReservas = (servicios) => {
  const serviciosCopy = { ...servicios };
  delete serviciosCopy.id;
  return reservasApi.put(`/reservas/${servicios.id}`, serviciosCopy);
};

export const deleteReservas = (id) => {
  return reservasApi.delete(`/reservas/${id}`);
};