const express = require('express')
const { exec } = require('child_process')
const path = require("path");
const app = express();
app.get('/', (req, res) => {
	res.send(path.join(__dirname + '/index.html'));
});
app.get('/babble', (req, res) => {
	 const params = req.query;
	console.log('params: ', params);
		exec('th sample.lua -checkpoint cv/checkpoint_10650.t7 -temperature ' + params.temp + ' -length ' + params.output_length + ' -gpu -1', (err, stdout, stderr) => {
			res.json(JSON.stringify({'output' : stdout})).end();
			console.log('stderr: ' + stderr);
			if (err) {
				console.log('err: ', err);
			res.sendStatus(500).end();
		  }
		});
});

app.listen(process.env.PORT);
