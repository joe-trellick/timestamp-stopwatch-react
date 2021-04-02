const gulp = require('gulp')
const inlinesource = require('gulp-inline-source')
const inlineimg = require('gulp-inline-image-html')
const replace = require('gulp-replace')

gulp.task('default', () => {
    return gulp.src('./build/*.html')
        .pipe(replace('.js"></script>', '.js" inline></script>'))
        .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
        .pipe(inlineimg('src'))
        .pipe(inlinesource({
            compress: false,
            ignore: ['png']
        }))
        .pipe(gulp.dest('./build/single'))
});
