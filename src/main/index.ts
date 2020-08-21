import server from './config/app'
import * as dotnev from 'dotenv'
import path from 'path'

dotnev.config({path:path.resolve(__dirname, '..','..','.dev.env')})

const port  = process.env.SERVER_PORT || 3001

server.listen(port, () => {
    console.log(`Estamos rodando na porta: ${port}`)
})