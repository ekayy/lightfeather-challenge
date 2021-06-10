import app from '.'

const host = '0.0.0.0'
const port = 8888

app
  .listen(port, host, () => {
    console.log(`🚀  Server ready at http://${host}:${port}/`)
  })
  .on('error', err => {
    console.error(err)
  })
