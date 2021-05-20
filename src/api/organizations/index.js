import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: () => {
        return api.request('get',config.default.organizationsUrl)
    }
}