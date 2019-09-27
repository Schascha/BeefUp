// https://github.com/nDmitry/grunt-postcss

module.exports = {
	options: {
		map: false,
		processors: [
			require('autoprefixer')
		]
	},
	all: {
		expand: true,
		flatten: false,
		src: '<%= files.css %>'
	}
};
