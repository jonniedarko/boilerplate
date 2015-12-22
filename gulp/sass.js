var gulp = require('gulp');
var sass = require('gulp-sass');


function buildSass(watch){
	function rebundle(){
		gulp.src('./app/main.scss')
			.pipe(sass())
			.pipe(gulp.dest('./public/'));
	}
	if(watch){
		gulp.watch(['./app/**/*.scss'], rebundle)
	}
	rebundle();
}

function watchSass(){
	return buildSass(true);
}

// Compiles LESS > CSS
module.exports.build =  buildSass;
module.exports.watch =  watchSass;

