// https://github.com/nDmitry/grunt-postcss

module.exports = {
    options: {
        map: true,
        processors: [
            require('autoprefixer')({
                browsers: ['last 4 versions', 'Explorer >= 8', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
            })
        ]
    },
    all: {
        expand: true,
        flatten: false,
        src: '<%= files.css %>'
    }
};
