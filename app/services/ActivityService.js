import http from "./http-common";

const getAll = async (data) => {
    const res = await http.get("/activities", {
        params: data
    });
  
    return res.data;
};

const get = async (id) => {
    const res = await http.get(`/activities/${id}`);
    return res.data;
};

const ActivityService = {
    getAll,
    get
};

export default ActivityService;