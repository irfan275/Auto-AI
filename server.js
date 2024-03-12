let fs = require('fs');
let http = require('http');
let https = require('https');
const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
var fileUpload = require('express-fileupload');
//const expressValidator = require('express-validator')

require('dotenv').config();



const httpServer = http.createServer(app);
//var io = require('socket.io')(httpServer);
var path = require("path");
app.use(bodyParser.json());
app.use(fileUpload());
//-------------------file upload ------------

//app.use(expressValidator());
//app.use('/static', express.static(path.join(__dirname, 'public')))
//socket

app.use('/', express.static(path.join(__dirname, 'public')));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
	res.json({
		status: true,
		message: 'Welcome to Auto ai module'
	})
})

// var user_route = require('./route/user');
// var comment_route = require('./route/comment');
// var admin_route = require('./route/admin');
const port = process.env.PORT || 3000;
//const httpsPort = process.env.HTTPSPORT || 3005;
// app.use('/user', user_route);
// app.use('/comment', comment_route);
// app.use('/admin', admin_route);

httpServer.listen(port, () => console.log(`Auto AI App listening on port ${port}!`))
//httpsServer.listen(httpsPort, () => console.log(`Example app listening on port ${httpsPort}!`));
//console.log(httpServer)
exports.httpServer = httpServer
