import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: (organizationId,headers) => {
        return api.request('get',config.default.TaxUrl + organizationId, headers)
    },
    post: (data, headers,params) => {
        return api.request('post', config.default.TaxPostUrl, headers, params, data)
    }
}