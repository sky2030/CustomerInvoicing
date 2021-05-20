import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: (userId,params,headers) => {
        return api.request('get',config.default.invoiceTemplateUrl+ 'user/' + userId, headers,params)
    },
    post: (data, headers,params) => {
        return api.request('post', config.default.invoiceTemplateUrl, headers, params, data)
    }
}