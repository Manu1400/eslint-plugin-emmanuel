'use strict';
const path = require('path');
const packageJson = require('../../package');

const repoUrl = 'https://github.com/Manu1400/eslint-plugin-emmanuel';

module.exports = filename => {
	const ruleName = path.basename(filename, '.js');
	return `${repoUrl}/blob/v${packageJson.version}/docs/rules/${ruleName}.md`;
};