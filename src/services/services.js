import * as request from '../utility/request'

export function signIn(name) {
    return request.post('users', { name });
}