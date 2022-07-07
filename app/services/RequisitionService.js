import http from "./http-common";

const getAll = async (data) => {
  const res = await http.get(`/requisitions`, {
    params: data,
  });
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/requisitions/${id}`);
  return res.data;
};

const items = async (id) => {
  const res = await http.get(`/requisitions/${id}/part-items`);
  return res.data;
};

const engineers = async () => {
  const res = await http.get("/requisitions/engineers");
  return res.data;
};

const partHeadings = async (data) => {
  const res = await http.get("/requisitions/part-headings", {
    params: data,
  });
  return res.data;
};

const create = async (data) => {
  const res = await http.post(`/requisitions`, data);
  return res.data;
};

const update = async (id, data) => {
  const res = await http.put(`/requisitions/${id}`, data);
  return res.data;
};

const remove = async (id) => {
  const res = await http.delete(`/requisitions/${id}`);
  return res.data;
};

const approve = async (id) => {
  const res = await http.post(`/requisitions/approve/${id}`);
  return res.data;
};

const reject = async (id) => {
  const res = await http.post(`/requisitions/reject/${id}`);
  return res.data;
};

// for client module
// const createClientRequisition = async (data) => {
//   const res = await http.post(`/create-client-requisitions`, data)
//   return res.data;
// };

const RequisitionService = {
  getAll,
  get,
  engineers,
  partHeadings,
  items,
  create,
  update,
  remove,
  approve,
  reject,
  // createClientRequisition
};

export default RequisitionService;
