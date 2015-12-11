var fs = require('fs'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	merge = require('merge2'),
	shell = require('gulp-shell'),
	umd = require('gulp-umd');

var version = fs.readFileSync('src/W.js', {encoding:'utf8'}).match(/^\/\*\! [\w-]+ ([0-9.]+)/)[1];

// ======================================== gulp version

gulp.task('version', function() {
	var streams = merge();
	streams.add(
		gulp.src( 'package.json' )
			.pipe( replace(/"version": "[0-9.]+",/, '"version": "'+version+'",') )
			.pipe( gulp.dest('.') )
	);
	streams.add(
		gulp.src( 'README.md' )
			.pipe( replace(/^(\w+) [0-9.]+/, '$1 '+version) )
			.pipe( gulp.dest('.') )
	);
	return streams;
});

// ======================================== gulp build

gulp.task('build', ['version'], function() {
	return gulp.src( './src/*.js' )
		.pipe( jshint({
			loopfunc: true,
			boss: true
		}) )
		.pipe( jshint.reporter('jshint-stylish') )
		.pipe( umd() )
		.pipe( gulp.dest('.') )
		.pipe( uglify() )
		.pipe( rename({suffix:'.min'}) )
		.pipe( gulp.dest('.') );
});

// ======================================== gulp publish

gulp.task('publish', shell.task([
	"git tag -a "+version+" -m '"+version+"'",
	'git push --tags',
	'npm publish',
	'jam publish'
]));

// ======================================== gulp

gulp.task('default', ['build', 'publish']);
