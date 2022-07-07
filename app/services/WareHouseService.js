import http from './http-common';

const getAll = async () => {
  const res = await http.get('/warehouses');
  return res.data;
};

const get = async id => {
  const res = await http.get(`/warehouses/${id}`);
  return res.data;
};

const create = async data => {
  const res = await http.post('/warehouses', data);
  return res.data;
};

const update = async (id, data) => {
  const res = await http.put(`/warehouses/${id}`, data);
  return res.data;
};

const remove = async id => {
  const res = await http.delete(`/warehouses/${id}`);
  return res.data;
};

const WareHouseService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default WareHouseService;
