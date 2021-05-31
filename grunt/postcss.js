// https://github.com/nDmitry/grunt-postcss

module.exports = {
	options: {
		map: false,
		processors: [
			require('postcss-preset-env')
		]
	},
	all: {
		expand: true,
		flatten: false,
		src: '<%= files.css %>'
	}
};
