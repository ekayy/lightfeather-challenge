import { Request, Response } from 'express'
import got from 'got'

interface RegisterNotificationData {
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  supervisor: string
}

export default async function submit(req: Request, res: Response) {
  try {
    const body: RegisterNotificationData = req.body

    console.log(req.body)

    res.status(201).send(req.body)
  } catch (e) {
    res.status(503).send(e.response.body)
  }
}
