import app from '..'
import request from 'supertest'

describe('/api/submit', () => {
  it('successful POST', async () => {
    const res = await request(app)
      .post('/api/submit')
      .send({
        name: 'john',
        lastName: 'mcclain',
        email: null,
        phoneNumber: null,
        supervisor: 'a - smith, will',
      })

    expect(res.statusCode).toEqual(201)
  })
})
