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
        sass: {
            options: {
                includePaths: [
                    'vendor'
                ],
                outputStyle: 'expanded',
                sourceMap: false
            },
            build: {
                files: {
                    'demo/css/main.css': 'demo/scss/main.scss'
                }
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            js: {
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask(
        'default', ['jshint', 'jscs', 'uglify', 'sass']
    );
};
