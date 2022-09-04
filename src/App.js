/**
 * App (Root)
 */

import * as React from 'react'
import { Helmet } from 'react-helmet';

const App = ({ children, location, data, pageContext }) => {
  return (
    <main>
      {children}
    </main>
  )
}

export default App;