// https://github.com/gruntjs/grunt-contrib-jshint

module.exports = {
    files: ['<%= files.js %>'],
    options: {
        globals: {
            require: true,
            define: true
        }
    }
};
