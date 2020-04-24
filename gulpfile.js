const gulp = require('gulp')
    imagemin = require('gulp-imagemin')
    imgCompress = require('imagemin-jpeg-recompress');

const sass = require('gulp-sass');

const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('app/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('img', function() {
    return gulp.src('images/**/*')
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.optipng(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('app/images'));
});

function watch() {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
    gulp.watch('app/assets/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('watch', watch);