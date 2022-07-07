import http from "./http-common";

const getAll = async () => {
    const res = await http.get("/box-headings");
    
    return res.data?.data;
};

const get = async (id) => {
    const res = await http.get(`/box-headings/${id}`);
    return res.data;
};

const parts = async (id) => {
    const res = await http.get(`/box-headings/${id}/parts`);
    return res.data;
};


const create = async (data) => {
    const res = await http.post("/box-headings",data)
    return res.data;
};

const update = async (id, data) => {
    const res = await http.put(`/box-headings/${id}`, data);
    return res.data;
};

const remove = async (id) => {
    const res = await http.delete(`/box-headings/${id}`);
    return res.data;
};

const BoxHeadingService = {
    getAll,
    get,
    parts,
    create,
    update,
    remove,
  };

export default BoxHeadingService