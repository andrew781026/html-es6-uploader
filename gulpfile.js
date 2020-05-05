// 參考資料 : https://kejyuntw.gitbooks.io/gulp-learning-notes/plguins/Tool/Plugins-Tool-browser-sync.html

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

// 服務
gulp.task('serve',  function () {
    browserSync.init({
        baseDir: "./src"
    });

    // 監看工作
    gulp.watch("src/*.html").on('change', browserSync.reload);
});
