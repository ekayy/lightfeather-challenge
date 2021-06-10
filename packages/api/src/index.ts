import express, { Request, Response } from 'express'
import cors from 'cors'

import { __prod__, ALLOWED_DOMAINS } from './constants'
import supervisors from './endpoints/supervisors'
import submit from './endpoints/submit'
import health from './endpoints/health'

// require('dotenv').config({
//   path: `.env`,
// })

const app = express()

app.set('trust proxy', 1)

export function createContext({
  req,
  res,
}: {
  req: Request
  res: Response<any>
}) {
  return {
    req,
    res,
  }
}

app.use(
  cors({
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean | undefined) => void
    ) => {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!requestOrigin) return callback(null, true)
      if (ALLOWED_DOMAINS.indexOf(requestOrigin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
  })
)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/api/supervisors', supervisors)
app.post('/api/submit', submit)

app.get('/api/health', health)

app.set('trust proxy', 1)

// server.applyMiddleware({
//   app,
//   cors: false,
// })

export default app
