import axios from 'axios'

let accessToken;

export function setToken(token) {
  accessToken = token;
}

/**
 * Return promise api request
 * @param method(String) api method
 * @param params(String) params for api request
 * @return axios.Promise api request
 **/
export function apiRequest(method, params) {
  const _params = buildQuery(params);
  const token = accessToken ? `access_token=${accessToken}` : '';
  return axios.get(`https://api.vk.com/method/${method}?${_params}${token}&v=5.131`)
    .then(result => {
      if (result.data.error) {
        return new Error(JSON.stringify(result.data.error))
      } else {
        return result.data.response
      }
    })
    .catch(err => {
      console.log(err);
    })
}

/**
 * Build query string for api request
 * @param params(object)
 * @return String query
 **/
const buildQuery = (params) => {
  let result = '';
  for (const i in params) {
    if (params.hasOwnProperty(i)) {
      result += i + '=' + params[i] + '&'
    }
  }
  return result;
};
