import axios from 'axios'
import axiosRetry from 'axios-retry'

/**
 * First of all let's intercept stupid VK API response
 */
axios.interceptors.response.use(
  function (response) {
    // If response has 200 OK status and error object inside, then it's an error
    // (damn, it's so stupid, vk api developers... what a shame)
    if (!!response.data.error && response.data.error.error_code === 6) {
      // If error_code is 6 -> Too Many Requests, then replace status to valid HTTP Code
      response.status = 429;
      throw response;
    }
    return response;
  },
  function (error) {
    console.log('intercepted error: ', error);
    return error;
  }
);

/**
 * Simple retry library for making retries
 */
axiosRetry(axios, {
  retries: 3,
  retryCondition: (error) => {
    return error.status === 429;
  },
  retryDelay: axiosRetry.exponentialDelay
});

/**
 * Here VK API access_token will be stored
 */
let accessToken;

/**
 * Change token from outside
 * @param token
 */
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

  console.log(`https://api.vk.com/method/${method}?${_params}${token}&v=5.131`);

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
