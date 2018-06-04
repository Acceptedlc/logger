const fork = require("child_process").fork;

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
	let suffix =  new Date().getFullYear() + "-" + (new Date().getDate() + 1) + '-' + new Date().getDate();
	child.send({dir, category, suffix, msg});
};
