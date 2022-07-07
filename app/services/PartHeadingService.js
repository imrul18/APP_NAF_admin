import http from "./http-common";

const getAll = async (machineId, data) => {
    const res = await http.get(`/machines/${machineId}/part-headings`, {
        params: data
    });
    
    return res.data;
};

const get = async (machineId, id) => {
    const res = await http.get(`/machines/${machineId}/part-headings/${id}`);
    return res.data;
};


const filtered = async (filter)=>{
    const res = await http.get(`/machines/filtered/`,filter);
    return res.data;
}

const create = async (machineId, data) => {
    const res = await http.post(`/machines/${machineId}/part-headings`,data)
    return res.data;
};

const update = async (machineId, id, data) => {
    const res = await http.put(`/machines/${machineId}/part-headings/${id}`, data);
    return res.data;
};


const remove = async (machineId, id) => {
    const res = await http.delete(`/machines/${machineId}/part-headings/${id}`);
    return res.data;
};

const PartHeadingService = {
    getAll,
    get,
    create,
    update,
    remove,
    filtered
};

export default PartHeadingService