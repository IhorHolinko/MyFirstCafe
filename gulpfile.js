const gulp  = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('node-sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

const server = browserSync.create();


gulp.task('sass', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/*.*")
        .pipe(gulp.dest("dist/css"));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

gulp.task('js', function() {
    return gulp.src("src/js/*.js")
        .pipe(gulp.dest("dist/js"));
});

// gulp.task('img', function() {
//     return gulp.src("src/img/*.+(jpg|jpeg|png|svg)")
//         .pipe(gulp.dest("dist/img"));
// });

gulp.task('img', function() {
  return gulp.src("src/img/**/*.+(jpg|jpeg|png|svg)")
      .pipe(gulp.dest("dist/img"));

});

gulp.task('icon', function() {
    return gulp.src("src/icons/**/*.+(png|svg)")
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function() {
  return gulp.src("src/mailer/**/*.+(php)")
      .pipe(gulp.dest("dist/mailer"));
});

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'dist'
    }
  });

  done();
}

const watch = () => gulp.watch('src/**.*', gulp.series('sass', reload));

gulp.task('dev', gulp.series('html', 'img', 'js', 'icon', 'js', 'fonts', 'mailer', 'sass', serve));