var gulp = require('gulp');
var rename = require('gulp-rename');

function copyHTML(watch){
  var htmlFiles = ['./app/index.html', './app/**/*.css'];
  var htmlTemplates = ['./app/**/*.html', '!./app/index.html'];
  function rebundle(){
    gulp.src(htmlFiles)
        .pipe(gulp.dest('./public'));

     gulp.src(htmlTemplates)
          .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./public/templates'));
  }
  if(watch){
    gulp.watch(['./app/**/*.html', './app/**/*.css'], rebundle);
  }
  rebundle();

}

function watchHTML(){
  return copyHTML(true);
}

module.exports.copy = copyHTML;
module.exports.watch = watchHTML;
