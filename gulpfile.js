// Gulp Plugins
var gulp          = require('gulp'),
    pug           = require('gulp-pug'),
    browserSync   = require('browser-sync').create(),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    prefix        = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    pump          = require('pump'),
    plumber       = require('gulp-plumber');

//Paths
var templatesPath  = 'src/templates/**/*.pug',
    stylesPath     = 'src/sass/**/*.sass',
    scriptsPath    = 'src/js/modules/**/*.js';

/**
 * Development Tasks
**/

/**
 * Initialize Browser Sync and serve from dev build
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./builds/dev"
        }
    });
});

/**
 * Watch for file changes
 */
gulp.task('watch', function(){
  gulp.watch(templatesPath, ['pug']);
  gulp.watch(stylesPath, ['sass']);
  gulp.watch(scriptsPath, ['js']);
});

/**
 * Convert pug to html
 */
gulp.task('pug', function(){
    gulp.src('src/templates/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('builds/dev'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Convert Sass to CSS
 */
gulp.task('sass', function(){
    gulp.src('src/sass/**/*.sass')
    .pipe(plumber(function(error){ // Prevent pipe breaking caused by errors from gulp plugins
        console.log("Error in", error.message);
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(prefix('last 2 versions'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('builds/dev/css'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Concat and minify JS files
 */
gulp.task('js', function(callback) {
  pump([
    gulp.src('src/js/modules/**/*.js'),
    sourcemaps.init(),
    concat('main.js'),
    sourcemaps.write('maps'),
    gulp.dest('builds/dev/js'),
    browserSync.reload({stream: true})
  ], callback)
});

gulp.task('init', ['pug', 'sass', 'js']);

/**
 * Default development Task
 */
gulp.task('dev', ['init', 'browser-sync', 'watch']);
