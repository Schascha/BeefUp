// https://github.com/gruntjs/grunt-contrib-uglify

module.exports = {
    options: {
        preserveComments: 'some'
    },
    js: {
        files: {
            'dist/js/jquery.beefup.min.js': 'src/js/jquery.beefup.js'
        }
    }
};
