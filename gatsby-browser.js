const React = require("react")
const { MantineProvider } = require('@mantine/core');
const { Provider: ReduxProvider } = require('react-redux');
const store = require('./src/store');
const { Helmet } = require("react-helmet");

exports.wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider store={store}>
      <Helmet>
        <title>Bankehuset</title>
      </Helmet>
      <MantineProvider>
        {element}
      </MantineProvider>
    </ReduxProvider>
  )
}