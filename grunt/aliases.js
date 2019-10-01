// https://github.com/firstandthird/load-grunt-config

module.exports = {
	'default': [
		'build',
		'watch'
	],
	'build': [
		'copy',
		'js',
		'scss'
	],
	'js': [
		'uglify'
	],
	'scss': [
		'sass',
		'postcss'
	]
};
