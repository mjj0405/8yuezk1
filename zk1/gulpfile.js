var gulp = require('gulp');
var server = require('gulp-webserver');
var less = require('gulp-less');
// var minCss = require('gulp-clean-css');
// var uglify = require('gulp-uglify');
var url = require('url');
var path = require('path');
var fs = require('fs');
gulp.task('server', ['less'], function() {
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
gulp.task('less', function() {
    return gulp.src('./src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    gulp.watch('./src/less/*.less', ['less']);
});
gulp.task('default', ['server', 'watch']);
// 压缩css
gulp.task('minCss', function() {
        gulp.src('./src/css/*.css')
            .pipe(minCss())
            .pipe('./build/css')
    })
    // 压缩js
gulp.task('uglify', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe('./build/js')
})
gulp.task('build', ['minCss', 'uglify']);