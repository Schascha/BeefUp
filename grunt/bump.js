// https://github.com/vojtajina/grunt-bump

module.exports = {
	options: {
		files: [
			'package.json'
		],
		commit: false,
		createTag: false,
		push: false
	}
};
