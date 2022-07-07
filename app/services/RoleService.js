import http from "./http-common";

const getAll = async () => {
    const res = await http.get("/roles");
  
    return res.data;
};

const get = async (id) => {
    const res = await http.get(`/roles/${id}`);
    return res.data;
};

const create = async (data) => {
    const res = await http.post("/roles",data)
    return res.data;
};

const remove = async (id) => {
    const res = await http.delete(`/roles/${id}`);
    return res.data;
};

const getPermission = async ()=>{
    const res = await http.get(`/get-permission`);
    return res.data;
}


const updatePermission = async(roleId, permissionId, attach)=>{
    let res = await http.post(`/roles/${roleId}/permission-update`, {attach: attach, permission_id: permissionId});
    return res.data;    
}

const RoleService = {
    getAll,
    get,
    create,
    remove,
    getPermission,
    updatePermission
};

export default RoleService;