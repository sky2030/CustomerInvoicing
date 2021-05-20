import api from '..'
import config from '../../config'

let registerApi =  {
  post: (data, headers, params) => {
    return api.request('post', config.default.registerUrl, headers, params, data)
  }
}
export default registerApi