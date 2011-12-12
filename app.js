#!/usr/bin/env node

var combo = require('combohandler'),
    express = require('express'),
    app = express.createServer();

app.configure(function() {
    app.use(express.errorHandler());
});

app.error(function (err, req, res, next) {
    if (err instanceof combo.BadRequest) {
        res.send('Bad request.', {'Content-Type': 'text/plain'}, 400);
    } else {
        next();
    }
});

app.get('/', combo.combine({rootPath: 'build/www'}), function (req, res) {
    res.send(res.body, 200);
});

app.listen(8082);
