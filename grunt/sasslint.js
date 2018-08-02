// https://github.com/ahmednuaman/grunt-scss-lint

module.exports = {
    allFiles: '<%= files.scss %>',
    options: {
        configFile: '.sass-lint.yml'
    }
};
