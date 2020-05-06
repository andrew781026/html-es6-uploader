// 參考資料 : https://kejyuntw.gitbooks.io/gulp-learning-notes/plguins/Tool/Plugins-Tool-browser-sync.html

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// 服務
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "src/",
            index: "index.html"
        },
        files: [  // 監看檔案變化
            {
                match: ["src/*.html", "src/css/*.css", "src/js/*.js"],
                fn: (event, file) => browserSync.reload() // https://stackoverflow.com/questions/42355259/browser-sync-not-reloading-for-file-event-add-change
            }
        ]
    });

});
