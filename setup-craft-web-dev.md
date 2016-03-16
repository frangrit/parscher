# Set up a dev environment for Craft
Get started with all the tools to manage a local Craft project with Gulp

## Initialize Node in the project site folder
- in [project]/site: `node init`
- name: project-name-site [lowercase, no spaces]
- version: 0.0.0
- description: [description]
- entry point: [default]
- test command: [default]
- git repository: [github repo url]
- keywords: [default]
- author: [your name], [your org]
- license: UNLICENSED

This creates the package.json file in the site directory.

## Add the dev dependencies
Add all these packages for a MAMP/Gulp workflow:
- gulp
- yargs
- gulp-sass
- gulp-autoprefixer
- gulp-cssnano
- browser-sync
- gulp-notify
- gulp-sourcemaps
- jshint
- gulp-jshint
- gulp-concat
- gulp-clean
- gulp-rename
- gulp-uglify
- gulp-mamp

In the site folder:
- `npm install -g gulp` [unless already installed globally]
- `npm install -g jshint` [unless already installed globally] 
- `npm install --save-dev gulp yargs gulp-sass gulp-autoprefixer gulp-cssnano browser-sync gulp-notify gulp-sourcemaps jshint gulp-jshint gulp-concat gulp-clean gulp-rename gulp-uglify`

package.json should now end with a devDependencies section that looks something like this:
```
  "devDependencies": {
    "browser-sync": "^2.11.1",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-clean": "^0.3.1",
    "gulp-concat": "^2.6.0",
    "gulp-cssnano": "^2.1.1",
    "gulp-jshint": "^2.0.0",
    "gulp-minify-css": "^1.2.3",
    "gulp-notify": "^2.2.0",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.2.0",
    "gulp-sourcemaps": "^1.6.0",
    "gulp-uglify": "^1.5.2",
    "jshint": "^2.9.1"
  }
```

## Add the gulpfile
- in the sites folder, add `gulpfile.js`
- add the following, updating the `siteHost` var:
```
// Environment variables
// use `gulp --dev [local environment name]` (e.g. greenleaf)
var argv = require('yargs').argv;


// Project variables

var siteHost = '[site host]';
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
// Needs to play well with our MAMP setup and [site host]-[local env].dev Virtual Host

gulp.task('browser-sync', function() {
    browserSync.init(['./public/js/**/*.js', './public/css/**/*.css', './craft/templates/**/*.html'], {
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
		.pipe(cssnano())
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
```

- from the sites folder, run `gulp` from the command line
