const globals = require('globals');
const jest = require('eslint-plugin-jest');
const js = require('@eslint/js');
const schascha = require('@schascha/eslint-config');

module.exports = [
	js.configs.recommended,
	jest.configs['flat/recommended'],
	{
		ignores: [
			'node_modules/**',
			'coverage/**',
		]
	},
	{
		languageOptions: {
			ecmaVersion: 6,
			sourceType: 'module',
			globals: {
                ...globals.browser,
                ...globals.node,
				'jQuery': true,
            }
		},
		rules: {
			...schascha.rules,
		}
	}
];
