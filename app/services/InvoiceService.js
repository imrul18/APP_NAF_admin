import http from "./http-common";

const getAll = async (data) => {
  const res = await http.get(`/invoices`, {
    params: data
});
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/invoices/${id}`);
  return res.data;
};


const create = async (data) => {
  const res = await http.post(`/invoices`, data)
  return res.data;
};

const update = async (id, data) => {
  const res = await http.put(`/invoices/${id}`, data);
  return res.data;
};

const remove = async (id) => {
  const res = await http.delete(`/invoices/${id}`);
  return res.data;
};

const addPayment = async (data)=>{
  const res = await http.post(`/payment-histories`, data)
  return res.data;
}

const getPaymentHistories = async (data) => {
  const res = await http.get(`/payment-histories`, {
    params: data
});
  return res.data;
};

const getPaymentHistory = async (id) => {
  const res = await http.get(`/payment-histories/${id}`);
  return res.data;
};


const searchPart = async (data)=>{
  const res = await http.get(`/invoices-part-search`, {
    params: data
});
  return res.data;
}

const InvoiceService = {
  getAll,
  get,
  create,
  update,
  remove,
  getPaymentHistories,
  getPaymentHistory,
  addPayment,
  searchPart
};

export default InvoiceService;