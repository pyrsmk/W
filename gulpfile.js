var fs = require('fs'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	merge = require('merge2'),
	shell = require('gulp-shell');

var version = fs.readFileSync('src/W.js', {encoding:'utf8'}).match(/^\/\*\! \w+ ([0-9.]+)/)[1];

gulp.task('version', function() {
	var streams = merge();
	streams.push(
		gulp.src( 'package.json' )
			.pipe( replace(/"version": "[0-9.]+",/, '"version": "'+version+'",') )
			.pipe( gulp.dest('.') )
	);
	streams.push(
		gulp.src( 'README.md' )
			.pipe( replace(/^(\w+) [0-9.]+/, '$1 '+version) )
			.pipe( gulp.dest('.') )
	);
	return streams;
});

gulp.task('build', function() {
	return gulp.src( './src/*.js' )
		.pipe( jshint({
			loopfunc: true,
			boss: true
		}) )
		.pipe( jshint.reporter('jshint-stylish') )
		.pipe( uglify() )
		.pipe( rename({suffix:'.min'}) )
		.pipe( gulp.dest('.') );
});

gulp.task('publish', shell.task([
	'npm publish',
	'jam publish'
]));

gulp.task('default', ['version', 'build', 'publish']);
