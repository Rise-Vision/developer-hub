/**
 * This script is based on https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
 * Created by rodrigopavezi on 10/6/14.
 */
var env = process.env.NODE_ENV || "dev"

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync');
var prefix      = require('gulp-autoprefixer');
var bower       = require('bower');
var del         = require('delete');
var deploy      = require('gulp-gh-pages');
var argv        = require('minimist')(process.argv.slice(2));
var rename      = require("gulp-rename");
var karma       = require('karma').server;
var gp          = require("gulp-protractor");


//------------------------- Browser Sync --------------------------------

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'web'
        },
        port: 8000
    });
});

gulp.task('browser-sync-reload', function() {
    browserSync.reload();
});

//------------------------- Bower --------------------------------

/**
 * Install bower dependencies
 */
gulp.task('bower-install', ['bower-clean-cache', 'bower-rm'], function(){
    return bower.commands.install([], {save: true}, {});
});

/**
 * Clean bower cache
 */
gulp.task('bower-clean-cache', function(){
    return bower.commands.cache.clean([], {}, {});
});

/**
 *  Remove all bower dependencies
 */
gulp.task('bower-rm', function(){
    return del.sync('assets/components');
});

//------------------------- Watch --------------------------------
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['web/**/*'], ['browser-sync-reload']);
});

//------------------------- Deployment --------------------------------
var options = {
            prod: {
                remoteUrl: "git@github.com:Rise-Vision/dev-hub-prod.git"
            },
            stage: {
                remoteUrl: "git@github.com:Rise-Vision/dev-hub-stage.git"
            }
        };

/**
 *  Deploy to gh-pages
 */
gulp.task("deploy", ["cname"], function () {

    // Remove temp folder created by gulp-gh-pages
    if (argv.clean) {
        var os = require('os');
        var path = require('path');
        var repoPath = path.join(os.tmpdir(), 'tmpRepo');
        gutil.log('Delete ' + gutil.colors.magenta(repoPath));
        del.sync(repoPath, {force: true});
    }

    return gulp.src("./web/**/*")
        .pipe(deploy(options[env]));
});


/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

// Downloads the selenium webdriver
gulp.task('webdriver_update', ['browser-sync'], gp.webdriver_update);

// Setting up the test task
gulp.task('protractor', ['webdriver_update','browser-sync'], function(cb) {
    gulp.src(['./tests/e2e/**/*.js']).pipe(gp.protractor({
        configFile: 'protractor.conf.js'
    })).on('error', function(e) {
        browserSync.exit();
        console.log(e);
        cb();
    }).on('end', function() {
        browserSync.exit();
        cb();
    });
});

gulp.task('e2e-test', ['browser-sync','protractor']);

/**
 * Copy and rename CNAME file depending on the target environment
 */
gulp.task("cname", function() {
    gulp.src("./cname-config/CNAME-"+env)
    .pipe(rename("CNAME"))
    .pipe(gulp.dest("./web"));
});


/**
 * Do a bower clean install
 */
gulp.task('bower-clean-install', ['bower-rm', 'bower-clean-cache','bower-install']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);




