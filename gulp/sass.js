  var glob = require('glob'),
    autoprefixer = require('gulp-autoprefixer'),
    csslint = require('gulp-csslint'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-cssmin'),
    gulpsass = require('gulp-sass'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if');

module.exports = function(gulp) {

  gulp.task('sass', function() {
    var env = process.env.ENV || "dev";
    return gulp.src('./static/sass/**/*.scss')
    .pipe(gulpsass({
      includePaths:[
        "bower_components/",
        "bower_components/bootstrap-sass-official/assets/stylesheets"
      ],
      sourceComments: (env == "production")? "none" : "map",
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(csscomb('./csscomb.json'))
    .pipe(csslint('./csslint.json'))
    .pipe(csslint.reporter())
    .pipe(gulpif(env == "production",cssmin()))

    /**
     * Uncss
     *
     * Removed for now as it breaks CSS generation.
     */
    //.pipe(gulpif(env == "production",uncss({
    //  html: glob.sync(paths.dist + '/**/*.html')
    //})))

    .pipe(gulp.dest('./static/css'))
  })

};
