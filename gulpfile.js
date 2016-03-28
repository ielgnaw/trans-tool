'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('start', function () {

  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch('main.js', electron.restart);

  // Reload renderer process
  gulp.watch(['app/**'], electron.reload);
});

gulp.task('default', ['start']);
