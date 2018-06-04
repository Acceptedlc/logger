let _ = require('lodash');
let Stream = require('stream');
let printer = require('./printer');

let Writable = Stream.Writable;

class Logger extends Writable{
	constructor(category, logDir, currentLevel) {
		super({objectMode: true});
		this.category = category;
		this.logDir = logDir;
		this.currentLevel = currentLevel;
	}

	_write(chunk, encoding, callback) {
		printer.print(this.logDir, this.category, chunk, callback);
	}

	write(msg, level = 'info') {
		if(levelOrder[this.currentLevel] > levelOrder[level]) {
			return;
		}
		let now = new Date();
		let logObj = {
			time: formatDate.call(now, "yyyy-MM-dd hh:mm:ss"),
			msg, level
		};
		let logMessage = `[${level}] [${logObj.time}] ${JSON.stringify(logObj)}`;
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



function formatDate(fmt) {
	let o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

let loggers = {};
exports.getLogger = function getLogger(category, logDir = "/tmp", currentLevel = 'info') {
	if(loggers[category]) {
		return loggers[category];
	}
	loggers[category] = new Logger(category, logDir, currentLevel);
	return loggers[category];
};