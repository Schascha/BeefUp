// https://github.com/sindresorhus/grunt-sass

module.exports = {
	sass: {
		options: {
			implementation: 'sass',
			outputStyle: 'expanded',
			sourceMap: false
		},
		build: {
			files: '<%= files.sassBuild %>'
		}
	}
};
