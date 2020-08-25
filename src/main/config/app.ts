import express from 'express'
import "reflect-metadata";
import v1Route from '../route/v1/'

const app = express()
app.use(express.json())
app.use('/api/v1', v1Route)

export default app