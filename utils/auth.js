import axios from 'axios'

const SERVER_ID = process.env.SERVER_ID
export function setToken(token, refresh) {
  localStorage.setItem('token', token)
  localStorage.setItem('refresh', refresh)
}

export function refreshToken() {
  if (!localStorage.getItem('refresh')) return
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `/refresh`,
      data: {
        refresh_token: localStorage.getItem('refresh')
      }
    })
      .then(({ data }) => {
        setToken(data.access_token, data.refresh_token)
        resolve({
          access_token: data.access_token,
          refresh_token: data.refresh_token
        })
      })
      .catch(err => reject(err))
  })
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getInfo() {
  return axios({
    method: 'GET',
    url: `https://discordapp.com/api/v6/users/@me`,
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  })
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh')
}

export async function checkMembership() {
  return new Promise(resolve => {
    axios({
      method: 'GET',
      url: `https://discordapp.com/api/v6/users/@me/guilds`,
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    })
      .then(({ data }) => {
        for (let server of data) {
          if (server.id === SERVER_ID) {
            resolve(true)
          }
        }
      })
      .catch(err => console.log(err))
  })
}
