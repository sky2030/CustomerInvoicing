import axios from 'axios';
// import interceptor from './interceptor/interceptor'
// eslint-disable-next-line
export default {
  request: async (
    method,
    uri,
    headers = null,
    params = null,
    data = null,
    paramsSerializer = null,
  ) => {
    if(localStorage.getItem('userInfo') !== null){
      let token = JSON.parse(localStorage.getItem('userInfo'))
      headers = {
        ...headers,
       'Authorization': 'Bearer '+ token.value
      }
    }
    if (method === undefined) {
      return 'Please provide method to make api call';
    } else if (uri === undefined) {
      return 'Please provide url';
    } else {
      console.log("Headers.......????????", headers)
      return axios({
        method: method,
        url: uri,
        headers: headers,
        params: params,
        data: data,
        paramsSerializer: paramsSerializer,
      });
    }
  },
};
