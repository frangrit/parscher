// Project variables

var project = {
	sitename: 'rhymepaysage.dev'
};

// Modules 
var gulp = require('gulp'); 
//    uglify = require('gulp-uglify'),
//    rename = require('gulp-rename'),
//    clean = require('gulp-clean'),
//    concat = require('gulp-concat'),
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
    browserSync.init(['./rhymepaysage\.com/js/**/*.js', './rhymepaysage\.com/css/**/*.css', './craft/templates/**/*.html'], {
        proxy: project.sitename
    });
});


// Lint Task

gulp.task('lint', function() {
    return gulp.src('./dev/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS

//gulp.task('scripts', function() {
//    return gulp.src('js/*.js')
//	    .pipe(concat('site-all.js'))
//	    .pipe(gulp.dest('js'))
//	    .pipe(rename({suffix: '.min'}))
//	    .pipe(uglify())
//	    .pipe(gulp.dest('js/dist'))
//	    .pipe(gulp.dest('_site/js/dist'))
//		.pipe(browserSync.stream())
//	    .pipe(notify({ message: 'Scripts complete' }));
//});


// Compile Our Sass

gulp.task('sass', function() {
    return gulp.src('./dev/sass/**/*')
    	.pipe(sourcemaps.init())
	    .pipe(sass({
		  errLogToConsole: true,
	      quiet: true
	    }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./rhymepaysage\.com/css'))
		.pipe(notify({ message: 'Compiled sass' }));
});


// Watch for changes

gulp.task('watch', function() {
    gulp.watch('./dev/js/**/*', ['lint']);
    gulp.watch('./dev/sass/**/*', ['sass']);
});


// Default Task

gulp.task('default', ['browser-sync', 'lint', 'sass', 'watch']);