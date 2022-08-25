import http from "./http-common";


const getProfile = async()=>{
  const res = await http.get("/profile");  
  return res.data;
}

const changePassword = async (data) => {
  return http.post("/password-update", data);
};

const updateProfile = async (data) => {
    return http.post("/profile-update", data);
  };

const ProfileService = {
  getProfile,
  changePassword,
  updateProfile
};

export default ProfileService;
