const gulp = require('gulp')
const sass = require('gulp-sass')
gulp.task('sass', function () {
  return gulp.src('./assets/stylesheets/**/*.sass')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/stylesheets/'));
});

gulp.task('watch', function () {
  gulp.watch(`./assets/stylesheets/**/*.sass`, ['sass']);
})

gulp.task('default', ['watch']);
