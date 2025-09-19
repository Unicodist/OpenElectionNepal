const target = "http://localhost:5150";

const PROXY_CONFIG = [
  {
    context:["/api"],
    target,
    secure: false,
  }
]

module.exports = PROXY_CONFIG;
