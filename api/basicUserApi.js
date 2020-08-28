const BASIC_USER_API = `http://192.168.1.158:18999`

const basicUserApi = {
  login: ({ email, password }) => fetch(`${BASIC_USER_API}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  }),
  register: ({ email, password, ...rest }) => fetch(`${BASIC_USER_API}/api/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, ...rest })
  }),
  changePassword: ({ oldpw, newpw, again }, accessToken) => fetch(`${BASIC_USER_API}/api/users/`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ oldpw, newpw, again })
  }),
  users: (accessToken) => fetch(`${BASIC_USER_API}/api/users/?token=${accessToken}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }),
}

export default basicUserApi
