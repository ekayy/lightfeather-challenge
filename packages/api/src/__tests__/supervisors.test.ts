import app from '..'
import nock from 'nock'
import request from 'supertest'

describe('/api/supervisors', () => {
  beforeAll(() => {
    const SUPERVISORS = ['a - mcclane, john', 'b - bunny, b']
    const scope = nock(`http://localhost:8888/api`)
      .get('/supervisors')
      .reply(200, SUPERVISORS)
      .persist()
  })

  it('should return', async () => {
    const res = await request(app).get('/api/supervisors')

    expect(res.statusCode).toEqual(200)
  })
})
