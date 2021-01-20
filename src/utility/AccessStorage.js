export default {
  get(key = null) {
    if(key === 'email') {
      return localStorage.getItem('_email');
    }
    if (key === 'token') {
      return localStorage.getItem('_token');
    }
    if (key === 'name') {
      return localStorage.getItem('_name');
    }
    return {
      email: localStorage.getItem('_email'),
      token: localStorage.getItem('_token'),
      name: localStorage.getItem('_name'),
    };
  },
  set(email = null, token = null, name = '') {
    if (email) { localStorage.setItem('_email', email); }
    if (token) { localStorage.setItem('_token', token); }
    if (name) { localStorage.setItem('_name', name); }
  },
  clear() {
    localStorage.removeItem('_email');
    localStorage.removeItem('_token');
    localStorage.removeItem('_name');
  },
  setOther(key, value) {
    localStorage.setItem(key, value);
  },
  getOther(key) {
    return localStorage.getItem(key);
  },
  removeOther(key) {
    localStorage.removeItem(key);
  },
};
