// https://github.com/sindresorhus/grunt-sass

module.exports = {
    options: {
        outputStyle: 'expanded',
        sourceMap: false
    },
    build: {
        files: '<%= files.sassBuild %>'
    }
};
