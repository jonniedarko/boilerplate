var nodemon = require('gulp-nodemon');

function dev() {
    nodemon({
        execMap: {
            js: 'node-inspector & node --debug'
        },
        script: 'index.js',
        //, ext: 'js html'
        watch: './server',
        env: {
            'NODE_ENV': 'development'
        }
    }).once('quit', function() {
        process.exit()
    });
}
module.exports.dev = dev;
