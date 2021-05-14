// https://github.com/gruntjs/grunt-contrib-uglify

module.exports = {
	js: {
		options: {
			output: {
				comments: /^!/
			}
		},
		files: '<%= files.jsBuild %>'
	}
};
