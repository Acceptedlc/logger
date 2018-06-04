let fs = require('fs');
let path = require('path')


process.on('message', function(data){
	//执行文件操作
	let dir = data.dir;
	let category = data.category;
	let msg = data.msg;
	fs.writeFileSync(path.join(dir, `${category}-${data.suffix}.log`), msg+'\n', {flag: 'a+'});
	//发送成功
	process.send('ok');
});

