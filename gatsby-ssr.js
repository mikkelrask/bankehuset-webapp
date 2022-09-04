const React = require('react');
const { Provider } = require('react-redux');
const store = require('./src/store');

exports.wrapRootElement = ({ element }) => (
  <Provider store={store}>{element}</Provider>
)
