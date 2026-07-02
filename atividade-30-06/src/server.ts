import express from 'express'
import * as dotenv from 'dotenv'
import { dot } from 'node:test/reporters'

const app = express()
dotenv.config()
const PORT = process.env.PORT

