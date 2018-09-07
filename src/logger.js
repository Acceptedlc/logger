let _ = require('lodash');
var moment = require('moment');
let Stream = require('stream');
let printer = require('./printer');

let Writable = Stream.Writable;

class Logger extends Writable{
	constructor(category, logDir, currentLevel, jsonFormat) {
		super({objectMode: true});
		this.category = category;
		this.logDir = logDir;
		this.currentLevel = currentLevel;
		this.jsonFormat = jsonFormat;
	}

	_write(chunk, encoding, callback) {
		printer.print(this.logDir, this.category, chunk, callback);
	}

	write(msg, level = 'info') {
		if(levelOrder[this.currentLevel] > levelOrder[level]) {
			return;
		}

		let logObj = Object.assign({level, time: moment().format("YYYY-M-D k:m:s")}, msg);
		let logMessage;
		if(!this.jsonFormat) {
			logMessage = `[${level}] [${logObj.time}] ${JSON.stringify(logObj)}`;
		} else {
			logMessage = JSON.stringify(logObj);
		}

		super.write(logMessage);
	}

	trace(msg) {
		this.write(msg, 'trace');
	}

	debug(msg) {
		this.write(msg, 'debug');
	}

	info(msg) {
		this.write(msg, 'info');
	}

	warn(msg) {
		this.write(msg, 'warn');
	}

	error(msg) {
		this.write(msg, 'error');
	}

	fatal(msg) {
		this.write(msg, 'fatal');
	}
}

const levelOrder = {
	trace: 1,
	debug: 2,
	info: 3,
	warn: 4,
	error: 5,
	fatal: 6
};




let loggers = {};
exports.getLogger = function getLogger(category, logDir = "/tmp", currentLevel = 'info', jsonFormat = false) {
	if(loggers[category]) {
		return loggers[category];
	}
	loggers[category] = new Logger(category, logDir, currentLevel, jsonFormat);
	return loggers[category];
};