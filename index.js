'use strict';
const express = require('express')
const apiServer = express();
const router = express.Router();   
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var path = require('path');

// API Server Setting
apiServer.use(bodyParser.urlencoded({ extended: true }));
apiServer.use(bodyParser.json());

// server port setting
const port = process.env.PORT || 8888; 

apiServer.listen(port, () => {
    console.log('Web API listening on port '+ port);
});

// CERO issue setting
apiServer.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    console.log("requst url = " + req.url);
    next();
  });


// MongoDB Connection
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://admin:admin_0523@cluster0-u1gvm.mongodb.net/army?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connect fail !'));

// view engine setup
apiServer.set('views', path.join(__dirname, 'views'));
apiServer.engine('html', ejs.__express);
apiServer.set('view engine', 'html');

// static web setup
apiServer.use(bodyParser.json());
apiServer.use(bodyParser.urlencoded({ extended: false }));
apiServer.use(express.static(path.join(__dirname, 'public')));

// router Import
const apiRouter = require('./routes/API/index');
const userRouter = require('./routes/API/users');

// index Pgae
apiServer.get('/', (req, res) => {
    res.send('Welcome')
});

// router 
apiServer.use('/api', apiRouter);
apiServer.use('/api/users', userRouter);

// catch 404 and response
apiServer.use(function(req, res, next) {
    res.status = 404;
    res.end('File not find');
});


  