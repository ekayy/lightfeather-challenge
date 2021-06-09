import { Request, Response } from 'express'
import got from 'got'

interface Supervisor {
  id: string
  phone: string
  jurisdiction: string
  identificationNumber: string
  firstName: string
  lastName: string
}

export default async function supervisors(_req: Request, res: Response) {
  const url =
    'https://609aae2c0f5a13001721bb02.mockapi.io/lightfeather/managers'

  try {
    const supervisors: Supervisor[] = await got(url).json()
    const result: string[] = []

    supervisors.map(supervisor => {
      const { jurisdiction, lastName, firstName } = supervisor

      if (!/\d/.test(jurisdiction)) {
        const formattedSupervisor = `${jurisdiction} - ${lastName}, ${firstName}`
        result.push(formattedSupervisor)
      }
    })

    result.sort()
    res.send(result)
  } catch (e) {
    res.status(503).send(e.response.body)
  }
}
