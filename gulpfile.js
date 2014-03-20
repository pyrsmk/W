var gulp = require('gulp');
// Disabled since gulp-jshint has too many directories which crash some things with Windows and Git
//var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var fs = require('fs');

gulp.task('default',function(){
	// Remove old files
	gulp.src('*.min.js',{read:false})
		.pipe(clean());
	// Lint
	/*gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));*/
	// Minify
	gulp.src('src/*.js')
		.pipe(uglify())
		.pipe(rename(function(path){
			path.basename+='-'+JSON.parse(fs.readFileSync('bower.json')).version;
			path.extname='.min.js';
		}))
		.pipe(gulp.dest('.'));
});