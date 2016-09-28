// https://github.com/gruntjs/grunt-contrib-watch

module.exports = {
    options: {
        spawn: false
    },
    js: {
        files: '<%= files.js %>',
        tasks: [
            'js'
        ]
    },
    sass: {
        files: [
            '<%= files.scss %>'
        ],
        tasks: [
            'scss'
        ]
    }
};
