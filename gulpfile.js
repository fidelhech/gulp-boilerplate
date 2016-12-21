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

// Set source and destination variables
var srcTemplatesPath  = 'src/templates/**/*.pug',
    srcStylesPath     = 'src/sass/**/*.sass',
    srcScriptsPath    = 'src/js/modules/**/*.js';

/*******************************************************************
 * Development Tasks
*******************************************************************/

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
  gulp.watch(srcTemplatesPath, ['pug']);
  gulp.watch(srcStylesPath, ['sass']);
  gulp.watch(srcScriptsPath, ['js']);
});

/**
 * Convert pug to html
 */
gulp.task('pug', function(){
    gulp.src(srcTemplatesPath)
    .pipe(pug())
    .pipe(gulp.dest('builds/dev'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Convert Sass to CSS
 */
gulp.task('sass', function(){
    gulp.src(srcStylesPath)
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
    gulp.src(srcScriptsPath),
    sourcemaps.init(),
    concat('main.js'),
    sourcemaps.write('maps'),
    gulp.dest('builds/dev/js'),
    browserSync.reload({stream: true})
  ], callback)
});

/**
 * Init Task: First task to run after clone the repo
 */
gulp.task('init', ['pug', 'sass', 'js']);

/**
 * Dev Task: Only for development
 */
gulp.task('dev', ['init', 'browser-sync', 'watch']);

/*******************************************************************
 * Production Tasks
*******************************************************************/
