// https://github.com/firstandthird/load-grunt-config

module.exports = {
    'default': [
        'build',
        'watch'
    ],
    'build': [
        'copy',
        'js',
        'scss'
    ],
    'js': [
        'jshint',
        'jscs',
        'uglify'
    ],
    'scss': [
        'scsslint',
        'sass',
        'postcss'
    ]
};
