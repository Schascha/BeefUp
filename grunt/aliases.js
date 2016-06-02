// https://github.com/firstandthird/load-grunt-config

module.exports = {
    'default': [
        'build',
        'watch'
    ],
    'build': [
        'copy',
        'test',
        'uglify',
        'sass',
        'postcss'
    ],
    'test': [
        'jshint',
        'jscs'
    ]
};
