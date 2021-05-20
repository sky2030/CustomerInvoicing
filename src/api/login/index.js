import api from '../../api'
import config from '../../config'

let loginApi =  {
  post: (data, params, headers) => {
    console.log("Headers...", headers)
    return api.request('post', config.default.authenticateUrl, headers, params, data)
  }
}
export default loginApi