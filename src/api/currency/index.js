import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: () => {
        return api.request('get',config.default.currencyUrl)
    },
    post: (data, headers,params) => {
        return api.request('post', config.default.countriesUrl, headers, params, data)
    }
}