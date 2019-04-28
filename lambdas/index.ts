import http from 'http'
import fs from 'fs'
import glob from 'glob'

glob('./**/index.ts', null, (err, files) => {
  console.log(err, files)
})
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080
