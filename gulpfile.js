const gulp = require('gulp');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const rename = require('gulp-rename');

gulp.task('build-dev', () => {
    gulp.src('frontend/env/dev_env.js')
      .pipe(rename('env.js'))
      .pipe(gulp.dest('frontend/dist/'));

    gulp.src('frontend/src/**/*.js')
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('frontend/dist/'));

    gulp.src('frontend/src/**/*.html')
      .pipe(gulp.dest('frontend/dist'));
});

gulp.task('watch-dev', () => {
    gulp.watch(['frontend/src/**/*.js', 'frontend/src/**/*.html'], ['build-dev']);
});

gulp.task('build-prod', () => {
    gulp.src('frontend/env/prod_env.js')
      .pipe(rename('env.js'))
      .pipe(gulp.dest('frontend/dist/'));

    gulp.src('frontend/src/**/*.js')
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('frontend/dist/'));

    gulp.src('frontend/src/**/*.html')
      .pipe(gulp.dest('frontend/dist'));
});

