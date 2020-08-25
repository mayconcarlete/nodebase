import path from 'path'
import * as dotnev from 'dotenv'
import 'reflect-metadata'
import '../infra/db/'
import server from './config/app'

dotnev.config({path:path.resolve(__dirname, '..','..','.dev.env')})

const port  = process.env.SERVER_PORT || 3001

server.listen(port, () => {
    console.log(`Estamos rodando na porta: ${port}`)
})