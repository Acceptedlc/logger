const fork = require("child_process").fork;
var moment = require('moment');

let child = fork(__dirname + "/child.js");

let successCb;

child.on('message', function(msg) {
	if(successCb && msg === 'ok') {
		successCb();
	}
});

child.on('exit', function() {
	child = fork(__dirname + "/child.js");
});

exports.print = function(dir, category, msg, cb) {
	successCb = cb;
	let suffix =  moment().format("YYYY-M-D");
	child.send({dir, category, suffix, msg});
};
