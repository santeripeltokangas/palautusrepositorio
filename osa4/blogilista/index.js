const http = require('http')
const app = require('./app')
const config = require('./tyokalut/config')
const lokittaja = require('./tyokalut/lokittaja')
const serveri = http.createServer(app)

serveri.listen(config.PORT, () => {
  lokittaja.tieto(`Serveri pyörii portissa ${config.PORT}`)
})