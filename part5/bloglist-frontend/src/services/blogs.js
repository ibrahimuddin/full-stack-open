import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data

}

const update = async (newObject, id) => {
  const config = {
    headers: {Authorization: token}
  }

  console.log(newObject)

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  console.log(response.data)
  return response.data
}

export default { getAll, create, setToken, update }