import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: () => {
        return api.request('get',config.default.accountingUrl, null, null, null)
    },
    post: (data) => {
        return api.request('post', config.default.accountingUrl, null, null, data)
    }
}