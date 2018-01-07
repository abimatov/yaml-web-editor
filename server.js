const express = require('express');
const fs = require('fs');
var _ = require('lodash');
var YAML = require('yamljs');
var bodyParser = require('body-parser');

const app = express();
const yamlFilePath = require.resolve('./data.yaml');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', './public/views');
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.format({
		'text/html': function() {
			res.render('index.ejs', { yaml: YAML.load(yamlFilePath) });
		},
		'application/json': function() {
			res.json(data);
		}
	});	
});

app.post('/', function(req, res) {
	console.log(req.body);
	fs.writeFileSync(yamlFilePath, YAML.stringify(req.body, 10));
	res.end();
});

app.listen(3000, function () {
	console.log('Listening on 3000...');
});