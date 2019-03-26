import axios from 'axios'

const baseURL = '/api/readings'

// Get all
const getAll = () => {
  return axios.get(baseURL).then(response => response.data)
}

// Get for certain sensor

// ?

export default {
  getAll
}