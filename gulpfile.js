'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var salad = require('postcss-salad')(require('./salad.config.json'));
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var gulpStylelint = require('gulp-stylelint');
var myStylelintFormatter = require('stylelint-checkstyle-formatter');
var stylefmt = require('gulp-stylefmt');

gulp.task('compile', function() {
  return gulp.src('./hui-theme-default/src/*.css')
    .pipe(postcss([salad]))
    .pipe(cssmin())
    .pipe(gulp.dest('./src/libs/theme-bui'));
});

gulp.task('copyfont', function() {
  return gulp.src('./hui-theme-default/src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./src/libs/theme-bui/fonts'));
});


gulp.task('lint-css', function lintCssTask() {
  return gulp
    .src('hui-theme-default/src/**/*.css')
    .pipe(stylefmt())  
    .pipe(gulpStylelint({
      configFile: './.stylelintrc.json',
      failAfterError: true,
      reportOutputDir: 'hui-theme-default/reports/lint',
      reporters: [
        { formatter: 'verbose', console: true },
        { formatter: 'json', save: 'report.json' },
        { formatter: myStylelintFormatter, save: 'my-custom-report.txt' }
      ]
    }));
});

var runTimestamp = Math.round(Date.now() / 1000);

gulp.task('iconfont', function() {
    return gulp.src(['./font-src/font/**/*.svg'])
    .pipe(iconfontCss({
        fontName: 'h-icons', // 字体名称
        path: './font-src/templates/myfont.css', // 字体样式模板
        targetPath: '../hui-icon.css', // 字体最终css文件的路径
        fontPath: 'fonts/',
        cssClass: 'h-icon' // 字体类前缀
    }))
    .pipe(iconfont({
        fontName: 'h-icons', // 字体名称
        prependUnicode: false, // recommended option
        formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
        fontHeight: 1001,
        normalize: true
    }))
    .pipe(gulp.dest('src/fonts'));
});


gulp.task('build', ['lint-css', 'compile', 'copyfont']);

