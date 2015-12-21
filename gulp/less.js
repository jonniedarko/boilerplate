var gulp = require('gulp');
var less = require('gulp-less');


function buildLess(watch){
	function rebundle(){
		gulp.src('./app/main.less')
			.pipe(less())
			.pipe(gulp.dest('./public/'));
	}
	if(watch){
		gulp.watch(['./app/**/*.less'], rebundle)
	}
	rebundle();
}

function watchLess(){
	return buildLess(true);
}

// Compiles LESS > CSS
module.exports.build =  buildLess;
module.exports.watch =  watchLess;

