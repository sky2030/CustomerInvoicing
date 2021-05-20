import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: (organizationId,headers) => {
        return api.request('get',config.default.customerUrl + organizationId, headers)
    },
    post: (data, headers,params) => {
        return api.request('post', config.default.customerPostUrl, headers, params, data)
    },
    put: (data, headers, params) => {
        return api.request('put',  config.default.customerPostUrl, headers,params,data)
    },
    delete: (customerId, headers) => {
        return api.request('delete', config.default.customerPostUrl + customerId, headers)
    }
}