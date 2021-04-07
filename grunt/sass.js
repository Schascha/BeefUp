// https://github.com/sindresorhus/grunt-sass

var sass = require('node-sass');

module.exports = {
	options: {
		implementation: sass,
		outputStyle: 'expanded',
		sourceMap: false
	},
	build: {
		files: '<%= files.sassBuild %>'
	}
};
