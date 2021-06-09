import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const Root: React.FunctionComponent = (): JSX.Element => {
  return <App />
}

ReactDOM.render(<Root />, document.getElementById('root'))
