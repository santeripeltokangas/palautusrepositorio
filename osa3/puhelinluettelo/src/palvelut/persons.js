import axios from 'axios'

const tapahtuma = axios.create({ baseURL: '/api/persons' })

tapahtuma.interceptors.response.use((vastaus) => vastaus.data, (error) => Promise.reject(error?.response?.data?.error))

const getAll = () => tapahtuma.get()
const update = (id, data) => tapahtuma.put(id.toString(), data)
const create = (data) => tapahtuma.post('', data)
const destroy = (id) => tapahtuma.delete(id.toString())

const personService = { getAll, create, update, destroy }

export default personService