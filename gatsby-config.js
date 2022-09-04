require('dotenv').config({
  path: require('path').resolve(__dirname, '.env'),
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://bankehuset.gatsbyjs.io'
  },
  plugins: [
    "gatsby-plugin-theme-ui", 
    "gatsby-plugin-gatsby-cloud", 
    "gatsby-plugin-react-helmet", 
    "gatsby-plugin-sitemap",
    // {
    //   resolve: 'gatsby-plugin-layout',
    //   options: {
    //     component: require.resolve('./src/App'),
    //   },
    // },
  ]
};