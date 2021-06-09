import { Request, Response } from 'express'

export default async function supervisors(_req: Request, res: Response) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  try {
    res.send(healthcheck)
  } catch (e) {
    healthcheck.message = e
    res.status(503).send()
  }
}
