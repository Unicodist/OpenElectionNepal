const target = "http://localhost:5101";

const PROXY_CONFIG = [
  {
    context:["/api"],
    target,
    secure: false,
  }
]

module.exports = PROXY_CONFIG;
