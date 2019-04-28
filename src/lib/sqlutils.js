var pg = require('pg')
var config = require('../config/config.js')()

var SqlUtils = {}

SqlUtils.execute = function execute (query, params) {
  return new Promise(function(resolve, reject){
    pg.connect(config.DB.url,function(err,db,close) {
      if (err) {
        console.error('Unable to connect to database err:' + err)
        return reject(err)
      }
      else{
        db.query(query, params, function(err,result){
          close()
          if (err) {
            console.error('Unable to run query err:' + err + ', query: ' + query)
            return reject(err)
          }
          else{
            return resolve(result.rows)
          }
        })
      }
    })
  })
}

module.exports = SqlUtils;