import http from "./http-common";

const getAll = async (id) => {
  const res = await http.get(`/parts/${id}/stocks`);
  return res.data;
};

const get = async (partId, stockId) => {
  const res = await http.get(`/parts/${partId}/stocks/${stockId}`);
  return res.data;
};

const create = async (id, data) => {
  const res = await http.post(`/parts/${id}/stocks`, data)
  return res.data;
};

const update = async (id, stockId, data) => {
  const res = await http.put(`/parts/${id}/stocks/${stockId}`, data);
  return res.data;
};

const remove = async (id, stockId) => {
  const res = await http.delete(`/parts/${id}/stocks/${stockId}`);
  return res.data;
};

const PartStockService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PartStockService;