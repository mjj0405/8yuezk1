var gulp = require('gulp');
var server = require('gulp-webserver');
var less = require('gulp-less');
// var minCss = require('gulp-clean-css');
// var uglify = require('gulp-uglify');
var url = require('url');
var path = require('path');
var fs = require('fs');
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
})