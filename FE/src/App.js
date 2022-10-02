import { Fragment, useEffect } from 'react'
import { gapi } from 'gapi-script'

import Client from '~/layout/Guest'
import Admin from './layout/User'

function App() {
  const clientId = '75646251109-9glq1hvj26fb2l15867ipc9cqqs3koeo.apps.googleusercontent.com'

  useEffect(() => {
    function startInitGoogleLogin() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      })
    }

    gapi.load('client:auth2', startInitGoogleLogin)
  }, [])

  return (
    <Fragment>
      <Client />
      <Admin />
    </Fragment>
  )
}

export default App
