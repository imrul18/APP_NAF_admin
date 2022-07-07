import http from "./http-common";

const getAll = async (data) => {
  const res = await http.get(`/delivery-notes`, {
    params: data
});
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/delivery-notes/${id}`);
  return res.data;
};


const create = async (data) => {
  const res = await http.post(`/delivery-notes`, data) 
  return res.data;
};




const DeliverNoteService = {
  getAll,
  get,
  create,
};

export default DeliverNoteService;