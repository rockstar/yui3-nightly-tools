
var path = require('path'),
    fs = require('fs');
    root = '',
    seeds = {
        min: '',
        raw: '',
        debug: ''
    };


module.exports = {
    stamp: function(o) {
        root = path.join(__dirname, '../', o.rootPath);

        if (!path.existsSync(root)) {
            throw('Root path does not exist');
        }
        
        //All the seed files
        seeds['min'] = fs.readFileSync(path.join(root, 'yui/yui-min.js'), 'utf8');
        seeds['raw'] = fs.readFileSync(path.join(root, 'yui/yui.js'), 'utf8');
        seeds['debug'] = fs.readFileSync(path.join(root, 'yui/yui-debug.js'), 'utf8');

        return function(req, res, next) {
            //Set the filter type for the seed fetch
            var filt = seeds[req.query.filter] ? req.query.filter : 'min',
                
                //Stamp the seed config and version
                seedStamp = '\n\n/* Stamping Seed File */\n' + 
                'YUI.applyConfig({\n' + 
                '   comboBase: "http://' + req.headers.host + '/yui?",\n' + 
                '   root: "",\n' + 
                '   filter: "' + filt + '"\n' + 
                '});\n' + 
                '\nYUI.version = "yui3-nightly";';
            
            //Concat the file with the stamp
            res.body = seeds[filt] + seedStamp;
            //Set the content type
            res.contentType('.js');
            //Send to next route
            next();

        }
    }
}
