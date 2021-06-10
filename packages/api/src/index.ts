import cookieParser from 'cookie-parser'
import express, { Request, Response } from 'express'
import session from 'express-session'
import cors from 'cors'
import { last } from 'lodash'

import { __prod__, COOKIE_NAME, ALLOWED_DOMAINS } from './constants'
import supervisors from './endpoints/supervisors'
import submit from './endpoints/submit'
import health from './endpoints/health'

require('dotenv').config({
  path: `.env`,
})

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

const main = async () => {
  app.use((req, _, next) => {
    const cookie = req.headers.cookie

    // console.log('Request Headers:', req.headers)

    if (cookie) {
      try {
        const cookies = cookie.split(' ')
        const qid = last(cookies)!.split('=')[1]
        req.headers.cookie = `qid=${qid}`
      } catch {}
    }

    return next()
  })

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

  app.use(
    session({
      name: COOKIE_NAME,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  )

  app.use(cookieParser())

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

  const host = '0.0.0.0'
  const port = 8888
  app.listen(port, host, () => {
    console.log(`🚀  Server ready at http://${host}:${port}/`)
  })
}

main().catch(err => {
  console.error(err)
})

export default app
