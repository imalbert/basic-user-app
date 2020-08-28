const BASIC_USER_API = `http://192.168.1.158:18999`

const basicUserApi = {
  login: ({ email, password }) => fetch(`${BASIC_USER_API}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }),
  register: ({ email, password, ...rest }) => fetch(`${BASIC_USER_API}/api/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, ...rest })
  }),
}

export default basicUserApi
