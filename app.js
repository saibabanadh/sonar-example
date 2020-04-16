// Add module dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const commonConf = require('../common/config.json');
const appConf = commonConf.services.order;
let mongoConf = commonConf.databases.mongodb;
const logger = require('./helpers/logger.helper');

// Add custom dependencies
const config = require('./config/config'); 
const orderRoutes = require('./routes/routes');
const authVerifier = require('./helpers/auth-verifier.helper');

process.env.JWT_SECRET = commonConf.JWT_SECRET || config.JWT_SECRET;
process.env.RESOURCE_ID = appConf.resourceId || config.resourceId;

//Creating dependent folders
mkdirp(config.LogStreamFilePath, function (err) {
    if (err) logger.error(err)
    else logger.info('Dependent folders created!'); 
}); 

appConf.port = appConf.port || config.PORT;
appConf.appName = appConf.appName || config.APP_NAME;

// Init dbConnection
if(config.LOCAL != 'no') mongoConf = {};
let dbUrl;
let dbConf = {
    "hostname" : mongoConf.hostname || config.MONGO.hostname,
    "port" : mongoConf.port || config.MONGO.port,
    "username" : mongoConf.username || config.MONGO.username,
    "password" : mongoConf.password || config.MONGO.password,
    "replicaSet": mongoConf.replicaSet || config.MONGO.replicaSet,
    "dbName": appConf.dbName || config.MONGO.dbName
};
if(dbConf.username != '' || dbConf.password != ''){
    dbUrl = `mongodb://${dbConf.username}:${dbConf.password}@${dbConf.hostname}:${dbConf.port}/${dbConf.dbName}`;
    if(dbConf.replicaSet){
        dbUrl += `?replicaSet=${dbConf.replicaSet}`;
    }
    mongoose.connect(dbUrl, { 
        "auth" : { "authSource": "admin" },
        "useNewUrlParser" : true, 
        "useUnifiedTopology" : true 
    });
}else{
    dbUrl = `mongodb://${dbConf.hostname}:${dbConf.port}/${dbConf.dbName}`;
    mongoose.connect(dbUrl, { 
        "useNewUrlParser" : true, 
        "useUnifiedTopology" : true 
    });
}
mongoose.connection.once('open', () => {
    logger.info("Connected to MongoDB Successfully.");
});
mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected');
});
mongoose.connection.on('disconnected', () => {
    logger.error("Mongodb is disconnected");
});
mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected');
});
mongoose.connection.on('error', (error) => {
    logger.error('MongoDB error :: ' + error);
});

mongoose.set('useFindAndModify', false);

// App Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With, content-type, Authorization');
    res.setTimeout(300000,function(){
        res.status(408).json({success:false, message:"Request has timed out."})
    })
    next();
});
app.use(cors());
app.use(helmet.noCache())
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, `${config.LogStreamFilePath}${'access.log'}`), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }, { flags: 'a' }))

// Add swagger api-docs
const swaggerDocument = require('./swagger.json');
const options = {
    customCss: '.swagger-ui .topbar { display: none }'
};
app.use(`${appConf.apiBase}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Add service routes
app.use(authVerifier);
app.use(appConf.apiBase, orderRoutes);

// Hanlde uncaughtExceptions here to prevent termination
process.on('uncaughtException', (error) => {
    console.log(error);
});

// Run the microservice app
app.listen(config.PORT, () => {
	logger.info(`${config.APP} is running on ${config.PORT} Port`);
});