// Gulp Plugins
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create();

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
});

/* Convert pug to html */
gulp.task('pug', function(){
  return gulp.src('src/templates/**/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('builds/dev'))
      .pipe(browserSync.reload({stream: true}));
});

/* Default development Task */
gulp.task('dev', ['browser-sync', 'watch']);



/**
 * Production Tasks
**/
