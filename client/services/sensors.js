import axios from 'axios'

const baseURL = '/api/sensors'

// Get all
const getAll = () => {
  return axios.get(baseURL).then(response => response.data)
}

export default {
  getAll
}