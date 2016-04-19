// Environment variables
// use `gulp --dev [local environment name]` (e.g. greenleaf)
var argv = require('yargs').argv;


// Project variables

var siteHost = 'rhymepaysage';
var devHost = (argv.dev == null) ? siteHost + '.dev': siteHost + '-' + argv.dev + '.dev' ;

// Modules 
var gulp = require('gulp'); 
	uglify = require('gulp-uglify'),
//    rename = require('gulp-rename'),
//    clean = require('gulp-clean'),
	concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint');


// BrowserSync
// Needs to play well with our MAMP setup and Virtual Host

gulp.task('browser-sync', function() {
    browserSync.init(['./public/js/**/*.js', './public/css/**/*.css', './craft/templates/**/*.html', './craft/templates/**/*.twig'], {
        proxy: devHost
    });
});


// Lint Task

gulp.task('lint', function() {
    return gulp.src('./dev/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS

gulp.task('scripts', function() {
    return gulp.src('./dev/js/**/*')
	    .pipe(concat('rp-app.js'))
	    .pipe(gulp.dest('./public/js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('./public/js'))
	    .pipe(notify({ message: 'Scripts complete' }));
});


// Compile Our Sass

gulp.task('sass', function() {
    return gulp.src('./dev/sass/**/*')
    	.pipe(sourcemaps.init())
	    .pipe(sass({
		  errLogToConsole: true,
	      quiet: true
	    }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(cssnano({zindex:false}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/css'))
		.pipe(notify({ message: 'Compiled sass' }));
});


// Watch for changes

gulp.task('watch', function() {
    gulp.watch('./dev/js/**/*', ['lint', 'scripts']);
    gulp.watch('./dev/sass/**/*', ['sass']);
});


// Default Task

gulp.task('default', ['browser-sync', 'lint', 'scripts', 'sass', 'watch']);