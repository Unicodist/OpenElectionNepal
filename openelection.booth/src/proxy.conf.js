const target = "http://localhost:5150"

const PROXY_CONFIG = {
  context:['/api'],
  target: target,
  secure: false,
}

module.exports = PROXY_CONFIG
