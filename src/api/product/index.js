import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: (organizationId,headers) => {
        return api.request('get',config.default.productUrl + organizationId, headers)
    },
    post: (data, headers,params) => {
        return api.request('post', config.default.productPostUrl, headers, params, data)
    },
    put: (data, headers, params) => {
        return api.request('put',  config.default.productPostUrl, headers,params,data)
    },
    delete: (productId, headers) => {
        return api.request('delete', config.default.productPostUrl + productId, headers)
    }
}