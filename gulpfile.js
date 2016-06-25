/*eslint-env node, jasmine, phantomjs, es6, angular/di: [2,"array"] */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint'); 
var jasmine = require('gulp-jasmine-phantom'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
//var karma = require('karma').server;

gulp.task('default', ['styles', 'lint', 'copy-html', 'copy-images', 'scripts-dist'], function() {
	gulp.watch('public/**/*.scss', ['styles']);
	gulp.watch('public/**/*.js', ['lint'])
		.on('change', browserSync.reload);
	gulp.watch('./public/index.html', ['copy-html']);
	gulp.watch('./public/**/*.htm', ['copy-html']);
	gulp.watch('./dist/index.html')
		.on('change', browserSync.reload);

	browserSync.init({
		server: './dist'
	});
});

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp.src([
		'./public/app/app.module.js'//,
		//'js/factories/*.js',
		//'js/controllers/*.js',
		//'js/routes/*.js',
		//'js/directives/*.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src([
		'./public/app/app.module.js',
		'./public/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('./public/index.html')
		.pipe(gulp.dest('./dist'));
	gulp.src('./public/**/*.htm')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

//turning this off for the time being
gulp.task('lint', function () {
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});

gulp.task('serve:production', ['styles', 'lint', 'copy-html', 'copy-images', 'scripts-dist'], function() {
	var express = require('express');
	var bodyParser = require('body-parser');
	
	//return the express object
	var app = express();

	//environment variables
	var port = process.env.PORT || 3000;

	//get the URL encoded parser
	var urlencodedParser = bodyParser.urlencoded({ extended: false });
	var jsonParser = bodyParser.json();

	//tell it the folder to serve
	app.use(express.static('dist'));
	//my own middleware
	app.use('/', function(req, res, next) {
		//log the url to the console
		console.log('Request Url: ' + req.url);

		next();
	});

	//open the port for local development
	app.listen(port,function() {
		console.log('Express server is up and running on port ' + port);
	})

	return app;
});