const webpack = require('webpack')

module.exports = {
  webpack: cfg => {
    cfg.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
        'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        'process.env.SERVER_ID': JSON.stringify(process.env.SERVER_ID)
      })
    )
    return cfg
  }
}
