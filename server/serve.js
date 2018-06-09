const http = require('http');
const express = require('express')
//const cors = require('cors')
const cfg = require('./config')
const path = require('path')
const app = express()


const fs = require('fs')
const cfg = JSON.parse(fs.readFileSync('../../angel-fruit.cfg.json','utf8'));
const APP_SERVER = cfg.APP_SERVER;

// body-parser does not handle multipart bodies
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));

// parse application/json
app.use(bodyParser.json({ limit: '1mb' }));

//----------------------------------------------------------------------------------------
// The cookie parser used before the session, this order is required for sessions to work.
// By default maxAge is null, meaning the cookie becomes a browser-session cookie, that is 
// when the user closes the browser the cookie (and session) will be removed.
// path --- cookie path
// expire --- absolute expiration date (Date object)
// maxAge --- relative max age of the cookie from when the client receives it (mill seconds)
// secure --- true or false
// domain --- domain for the cookie
// httpOnly --- true or false
//-----------------------------------------------------------------------------------------
app.use(cookieParser('mysecret', {maxAge: 1200*1000}));

//console.log(__dirname + '/../dist');

app.use(express.static(__dirname + '/../dist'));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// var whitelist = ['http://yocompute.com', 'http://www.yocompute.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
//------------------------------------------------------------------------------------------
//   Feedback module
//------------------------------------------------------------------------------------------
var Feedback = require('./services/feedbacks');
var fb = Feedback();

//app.options('/feedbacks', cors(corsOptions));
app.post('/feedbacks', fb.insert);
//app.options('/feedbacks', fb.options);

//app.listen(SERVER_PORT, () => console.log('Server setup'))
app.set('port', process.env.PORT || APP_SERVER.PORT)

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + APP_SERVER.PORT);
})