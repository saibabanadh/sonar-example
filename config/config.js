module.exports = {
	LOCAL: process.env.LOCAL,
	APP : "Order App",
	PORT: "3002",
	MONGO : {
		"hostname":"localhost",
		"port":"27017",
		"username":"",
		"password":"",
		"dbName": "sample"
	},
	LogFilePath: "./logs/",
	LogStreamFilePath:"./logs/streamlogs/"
}

