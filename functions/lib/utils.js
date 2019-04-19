const cors = require('cors')({origin: true});

exports.withCors = (callback) => (res, req) => {
  return cors(res, req, callback(res, req)) 
}
