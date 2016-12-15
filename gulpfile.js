// Gulp Plugins
var gulp          = require('gulp'),
    pug           = require('gulp-pug'),
    browserSync   = require('browser-sync').create(),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    prefix        = require('gulp-autoprefixer');

/**
 * Development Tasks
**/

// Initialize Browser Sync and serve from dev build
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./builds/dev"
        }
    });
});

/* Watch for file changes */
gulp.task('watch', function(){
  gulp.watch('src/templates/**/*.pug', ['pug']);
  gulp.watch('src/sass/**/*.sass', ['sass']);
});

/* Convert pug to html */
gulp.task('pug', function(){
  return gulp.src('src/templates/**/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('builds/dev'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function(){
  return gulp.src('src/sass/main.sass')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed'
      }))
      .pipe(prefix('last 2 versions'))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('builds/dev/css'))
      .pipe(browserSync.reload({stream: true}));
});

/* Default development Task */
gulp.task('dev', ['pug', 'sass', 'browser-sync', 'watch']);



/**
 * Production Tasks
**/
