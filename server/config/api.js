const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(__dirname, 'config', 'config.env'),
})

const getKeyId = (req, res) => {
  const keyId = process.env.KEY_ID
  res.json({ keyId })
};

module.exports = getKeyId;