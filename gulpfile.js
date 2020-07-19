'use strict';

// Importing the required modules
const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  sourcemaps = require('gulp-sourcemaps'),
	  csso = require('gulp-csso'),
	  uglify = require('gulp-uglify'),
	  zip = require('gulp-zip'),
	  del = require('del'),
	  runSequence = require('run-sequence');

// Setting the sass compiler as node-sass
sass.compiler = require('node-sass');

// Setting SASS compiler settings
var SassOptions = {
	outputStyle: 'expanded'
};

// Defining the required JavaScripts
var ReqJavaScripts = [
	'./node_modules/jquery/dist/jquery.min.js',
	'./node_modules/popper.js/dist/umd/popper.min.js',
	'./node_modules/bootstrap/dist/js/bootstrap.min.js',
	'./node_modules/jquery-lazy/jquery.lazy.min.js'
];

// Defining unnecessary files for packaging
var unFilesForPack = [
	'**',
	'!sources', '!sources/**',
	'!node_modules', '!node_modules/**',
	'!dist', '!dist/**',
	'!package-lock.json', '!*.py'
];

// The Gulp task for preparing CSS
gulp.task('sass', done => {
	return gulp.src('./sources/sass/**/*.+(scss|sass)')
		.pipe(sourcemaps.init())
		.pipe(sass(SassOptions).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 4 versions']}))
		.pipe(csso())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./assets/css'));
	done();
});


// Gulp Task for optimizing JavaScripts
gulp.task('optimize-scripts', done => {
	return gulp.src('./sources/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js'));
	done();
})

// Gulp Task for installing the required JavaScripts
gulp.task('install-scripts', done => {
	return gulp.src(ReqJavaScripts)
		.pipe(gulp.dest('./assets/js'));
	done();
});

// Gulp task for packaging the theme into a ZIP file
gulp.task('package', done => {
	var targetDir = 'dist/';
	var themeName = require('./package.json').name;
	var filename = themeName + '.zip';

	return gulp.src(unFilesForPack)
		.pipe(zip(filename))
		.pipe(gulp.dest(targetDir));
	done();
});

// Gulp task for cleaning the assets directory
gulp.task('clean', done => {
	return del.sync(['./assets', './dist']);
	done();
});

// The default Gulp task which first does a fresh build and watches for any changes
gulp.task('default', done => {

	gulp.series('sass', 'install-scripts', 'optimize-scripts', 'clean');
	gulp.watch('./sources/sass/**/*.+(scss|sass)', gulp.series('sass'));
	gulp.watch('./sources/js/**/*.js', gulp.series('optimize-scripts'));

  done();

});

