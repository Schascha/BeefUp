// https://github.com/gruntjs/grunt-contrib-copy

module.exports = {
	jquery: {
		cwd: 'node_modules/jquery/dist/',
		src: 'jquery.min.js',
		dest: 'dist/js/',
		expand: true
	},
	docs: {
		cwd: 'dist/',
		src: '**/*',
		dest: 'docs/',
		expand: true
	}
};
