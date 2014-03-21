var gulp = require('gulp');
/*
	Disabled since gulp-jshint has too many directory depth which bring issues in Windows and Git
*/
//var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var fs = require('fs');

// Remove old files
gulp.task('clean',function(){
	gulp.src('*.min.js',{read:false})
		.pipe(clean());
});

// Lint
gulp.task('lint',function(){
	/*gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));*/
});

// Minify
gulp.task('minify',function(){
	gulp.src('src/*.js')
		.pipe(uglify())
		.pipe(rename(function(path){
			path.basename+='-'+JSON.parse(fs.readFileSync('bower.json')).version;
			path.extname='.min.js';
		}))
		.pipe(gulp.dest('.'));
});

gulp.task('default',['clean','lint','minify']);