import axios from 'axios'

const tapahtuma = axios.create({ baseURL: '//localhost:3001/persons' })

tapahtuma.interceptors.response.use((vastaus) => vastaus.data)

const getAll = () => tapahtuma.get()

const update = (id, data) => tapahtuma.put(id.toString(), data)

const create = (data) => tapahtuma.post('', data)

const destroy = (id) => tapahtuma.delete(id.toString())

const personService = { getAll, update, create, destroy }

export default personService