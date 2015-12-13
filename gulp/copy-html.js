var gulp = require('gulp');

function copyHTML(watch){
  var htmlFiles = ['./app/**/*.html'/*, './app/templates/**'*/];

  function rebundle(){
    gulp.src(htmlFiles)
        .pipe(gulp.dest('./public'));
  }
  if(watch){
    gulp.watch(htmlFiles, rebundle);
  }
  rebundle();

}

function watchHTML(){
  return copyHTML(true);
}

module.exports.copy = copyHTML;
module.exports.watch = watchHTML;
