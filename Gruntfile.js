module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['jquery.beefup.js'],
            options: {
                globals: {
                    require: true,
                    define: true
                }
            }
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            files: {
                src: '<%= jshint.files %>'
            }
        },
        uglify: {
            options : {
                preserveComments : 'some'
            },
            foo: {
                files: {
                    'jquery.beefup.min.js': '<%= jshint.files %>'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'jscs', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'jscs', 'uglify']);
};
