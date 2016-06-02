module.exports = function(grunt) {

    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-config')(grunt, {
        data: {
            pkg: grunt.file.readJSON('package.json'),
            files: grunt.file.readJSON('grunt/config/files.json')
        },
        loadGruntTasks: {
            pattern: [
                'grunt-*'
            ]
        }
    });
};
