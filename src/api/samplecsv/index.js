import api from '../../api';
import config from '../../config'
// eslint-disable-next-line
export default {
    get: (userType) => {
      return api.request('get',config.default.baseUrl + userType + '/sampleFileData')
    }
}