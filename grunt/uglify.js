// https://github.com/gruntjs/grunt-contrib-uglify

module.exports = {
    options: {
        preserveComments: function(node, comment) {
            return /^!|@preserve|@license|@cc_on/i.test(comment.value);
        }
    },
    js: {
        files: {
            'dist/js/jquery.beefup.min.js': 'src/js/jquery.beefup.js'
        }
    }
};
