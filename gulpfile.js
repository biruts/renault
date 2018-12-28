var gulp = require('gulp');
var customizeBootstrap = require('gulp-customize-bootstrap');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss'); 
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
 
//Bootstrap
gulp.task('compileBootstrap', function() {
  return gulp.src('./node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(customizeBootstrap('./dev/styles/scss/*.scss'))
    .pipe(sass())
    .pipe(uglifycss())
    .pipe(gulp.dest('./dist/css/'));
});

//SCSS
gulp.task('sass', function () {
  return gulp.src([
  	'./dev/styles/scss/**/*.scss',
    './node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
  	'./node_modules/font-awesome/scss/font-awesome.scss',
  	'./node_modules/simple-line-icons/scss/simple-line-icons.scss',
  	'./node_modules/bootstrap-select/dist/css/bootstrap-select.css',    
    './node_modules/animate.css/animate.css',  
    './dev/lib/slick.css',
    './node_modules/ekko-lightbox/dist/ekko-lightbox.css',  
  	])
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

//Images
gulp.task('imagemin', function() {
    return gulp.src('./dev/images/*')
        //.pipe(imagemin())
        .pipe(imagemin({
  		    interlaced: true,
  		    optimizationLevel: 5,
  		    progressive: true
		    }))
        .pipe(gulp.dest('./dist/images'))
});

//Fonts
gulp.task('fonts', function() {
  return gulp.src([
  	'./node_modules/font-awesome/fonts/**/*',
  	'./node_modules/simple-line-icons/fonts/**/*'
  ])
  .pipe(gulp.dest('./dist/fonts'))
});

//Libs
gulp.task('lib', function(){
  return gulp.src([        
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/waypoints/lib/jquery.waypoints.min.js',
    './node_modules/counterup/jquery.counterup.min.js',
    './node_modules/jquery.easing/jquery.easing.min.js',
    './node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',	
	  './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
    './node_modules/jquery-m',
    './dev/lib/jquery.form-validator.min.js',
    './dev/lib/slick.js',    
    './node_modules/ekko-lightbox/dist/ekko-lightbox.min.js',    
    ])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('./dist/js/'));
});

//JS
gulp.task('js', function(){
	return gulp.src(['./dev/js/functions_client.js'])
	.pipe(concat('app.js'))
	.pipe(jsmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/js/'));
});

//HTML
gulp.task('html', function() {
  return gulp.src('./dev/*.html')
  .pipe(gulp.dest('./dist/'));
});

gulp.task('default',['compileBootstrap', 'sass', 'imagemin', 'lib', 'js', 'validator']);

// Watch
gulp.task('watch', function() {
  gulp.watch('./dev/images/**/*', ['imagemin']);
  gulp.watch('./dev/js/**/*.js', ['lib', 'js']);
  gulp.watch('./dev/styles/scss/*.scss', ['sass']);
  gulp.watch('./dev/*.html', ['html']);

  browserSync.init('dist/**/*', {
    server: { baseDir: 'dist' }
  });
});