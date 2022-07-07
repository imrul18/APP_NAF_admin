import http from "./http-common";

const getAll = async (params) => {
  const res = await http.get("/contracts", {
    params: params
  });
  return res;
};

const get = async (id) => {
  const res = await http.get(`/contracts/${id}`);
  return res.data;
};

const create = async (data) => {
  const res = await http.post("/contracts", data)
  return res.data;
};

const update = async (id, data) => {
  const res = await http.put(`/contracts/${id}`, data);
  return res.data;
};

const remove = async (id) => {
  const res = await http.delete(`/contracts/${id}`);
  return res.data;
};

const ContractService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ContractService;