var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');

// 一个 container 对应一个根目录
gulp.task('sass', function () {
  return sass('src', {container: 'gulp-ruby-sass-app'})
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('default', function () {
  gulp.start('sass')
});


// 监听
gulp.watch('src/**/*.scss', ['sass']);








