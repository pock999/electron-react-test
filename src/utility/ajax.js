import axios from 'axios';

import AccessStorage from './AccessStorage';

const API_URL  = process.env.REACT_APP_URL;

export default {
  async ajaxGet({ url, needToken = false, params = null }) {
    console.log('ajaxGet-----url => ', url);
    let res;
    const callUrl = params !== null ? `${url}?${params}` : url;
    try {
      res = await axios.get(`${API_URL}${callUrl}`,
        needToken
          ? { headers: { Authorization: AccessStorage.get('token') } } : {});
    } catch (e) {
      res = e.response;
    }
    return res;
  },
  async ajaxPost({ url, payload, needToken = false }) {
    let res;
    console.log('ajaxPost => ', url, payload);
    try {
      res = await axios.post(`${API_URL}${url}`, payload,
        needToken
          ? { headers: { Authorization: AccessStorage.get('token') } } : {});
    } catch (e) {
      res = e.response;
    }
    console.log(res);
    return res;
  },
  async ajaxPut({ url, payload, needToken = false }) {
    let res;
    try {
      res = await axios.put(`${API_URL}${url}`, payload,
        needToken ? { headers: { Authorization: AccessStorage.get('token') } } : {});
    } catch (e) {
      res = e.response;
    }
    return res;
  },
  async ajaxDelete({ url, needToken = false }) {
    let res;
    try {
      res = await axios.delete(`${API_URL}${url}`,
        needToken ? { headers: { Authorization: AccessStorage.get('token') } } : {});
    } catch (e) {
      res = e.response;
    }
    return res; 
  },
};
