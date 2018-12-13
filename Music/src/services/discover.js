import request from '../utils/request';

const Url = 'http://123.206.55.50:14000'
export function discover(id) {
  return request(`${Url}/user/detail?uid=${id}`);
}
