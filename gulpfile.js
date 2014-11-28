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
var factory     = require("widget-tester").gulpTaskFactory;
var runSequence = require("run-sequence");
var sass        = require("gulp-sass");


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
    return del.sync('web/components');
});

//------------------------- Watch --------------------------------
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('web/scss/**/*.scss', ['sass']);
    gulp.watch(['web/**/*'], ['browser-sync-reload']);
});

//-------------------------- Test ----------------------------------
gulp.task("server", factory.testServer());
gulp.task("server-close", factory.testServerClose());
gulp.task("test:webdrive_update", factory.webdriveUpdate());
gulp.task("test:e2e:core", ["test:webdrive_update"], factory.testE2EAngular({
    browser: "chrome"
}));
gulp.task("test:e2e", function (cb) {
    runSequence("server", "test:e2e:core", "server-close", cb);
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
gulp.task("deploy", function () {

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
 * Copy and rename CNAME file depending on the target environment
 */
gulp.task("cname", function() {
    gulp.src("./cname-config/CNAME-"+env)
    .pipe(rename("CNAME"))
    .pipe(gulp.dest("./web"));
});


gulp.task("sass", function () {
    return gulp.src("web/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("web/css"));
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




