const basicUserApi = {
  login: (loginDetails) => fetch(`http://192.168.1.158:18999/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginDetails)
  }),
}

export default basicUserApi
