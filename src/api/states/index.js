import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: (countryId) => {
        return api.request('get',config.default.statesUrl + countryId)
    },
    post: (data, headers,params) => {
        return api.request('post', config.default.statesUrl, headers, params, data)
    }
}