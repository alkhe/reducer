let gulp = require('gulp'),
	babel = require('gulp-babel');

let src = './src/**/*.js';

gulp.task('default', ['watch']);
gulp.task('watch', () => gulp.watch(src, 'build'));
gulp.task('build', ['npm', 'browser']);

gulp.task('npm', () =>
	gulp.src(src)
		.pipe(babel())
		.pipe(gulp.dest('./lib'))
);
