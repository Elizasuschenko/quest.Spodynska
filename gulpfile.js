var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require("gulp-sass"),
    gulp         = require('gulp'),
    imagemin     = require('gulp-imagemin'),
    imgCompress  = require('imagemin-jpeg-recompress'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task("script", function() {
    return gulp.src("src/static/js/*.js")
        .pipe(gulp.dest("build/js"));
});

gulp.task("img", function() {
    return gulp.src("src/static/img/*.+(jpg|jpeg|png|gif|svg)")
        .pipe(imagemin([
            imgCompress({
               
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"));
});

gulp.task("sass", function() {
    return gulp.src("src/static/css/*.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("build/css"));
});


gulp.task("watch", function() {
    gulp.watch("src/*.html",gulp.series("html"));
    gulp.watch("src/static/**/*.js",gulp.series("script"));
    gulp.watch("src/static/**/*.+(jpg|jpeg|png|gif|svg)",gulp.series("img"));
    gulp.watch("src/static/**/*.sass",gulp.series("sass"));
});

gulp.task("default",gulp.series(
    gulp.parallel("html", "sass", "script", "img"),
    'watch'));