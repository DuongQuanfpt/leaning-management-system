import { Fragment, useEffect } from 'react'
import { gapi } from 'gapi-script'

import Client from '~/layout/Guest'
import Admin from './layout/User'

function App() {
  const clientId = process.env.REACT_APP_LMS_GOOGLE_CLIENT_ID

  useEffect(() => {
    function startInitGoogleLogin() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      })
    }

    gapi.load('client:auth2', startInitGoogleLogin)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <Client />
      <Admin />
    </Fragment>
  )
}

export default App
