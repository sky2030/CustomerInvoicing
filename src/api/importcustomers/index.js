import api from '..';
import config from '../../config'
// eslint-disable-next-line
export default {
    post: (formData, headers, params) => {
      return api.request('post',config.default.importCustomersUrl,headers,params,formData)
    }
}