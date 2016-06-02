// https://github.com/jscs-dev/grunt-jscs

module.exports = {
    options: {
        config: '.jscsrc'
    },
    files: {
        src: '<%= files.js %>'
    }
};
