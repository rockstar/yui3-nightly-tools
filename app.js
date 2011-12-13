#!/usr/bin/env node

var combo = require('combohandler'),
    express = require('express'),
    stache = require('stache'),
    app = express.createServer();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'mustache');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.register('.mustache', stache);
    app.use(express.static(__dirname + '/static'));
});

app.error(function (err, req, res, next) {
    if (err instanceof combo.BadRequest) {
        res.send('Bad request.', {'Content-Type': 'text/plain'}, 400);
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.render('index', {});
});
app.get('/yui', combo.combine({rootPath: 'build/www'}), function (req, res) {
    res.send(res.body, 200);
});

app.listen(8082);
