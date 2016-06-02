// https://github.com/gruntjs/grunt-contrib-copy

module.exports = {
    jquery: {
        cwd: 'bower_components/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'dist/js/',
        expand: true
    }
};
