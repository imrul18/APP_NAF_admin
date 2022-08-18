import http from './http-common';

const getAll = async currentPage => {
  const res = await http.get('/notification', {params: {page: currentPage}});
  return res.data;
};
const readAt = async id => {
  const res = await http.get(`/notification/read/${id}`);
  return res?.data;
};

const NotificationService = {
  getAll,
  readAt,
};

export default NotificationService;
