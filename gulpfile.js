
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

// I can make up task names
gulp.task('sass', function(){
  gulp.src('./scss/main-style.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())//compiles
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));

});
//  This is a pattern that will be used over and over again.
gulp.task('uglify', function() {
    gulp.src('./js/main.js') // What files do we want gulp to reference for tacking current js?
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        //.pipe(jscs())
        //.pipe(jscs.reporter())
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename('my.min.js'))
        .pipe(gulp.dest('./build/js')); // Where do we want to store the archive

});

gulp.task('browserSync', function(){
  browserSync.init({
      server: {
        baseDir: './'
      }
    // end browserSync
  });

  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch(['./js/*.js'],['uglify']);
  gulp.watch(['./build/js/my.min.js', 'index.html', './build/css/style.min.css']).on('change', browserSync.reload);

});


// This task will run both 'hello' and 'uglify' when you write gulp in the terminal

gulp.task('default', ['sass', 'uglify', 'browserSync']);
