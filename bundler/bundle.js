const path = require('path');
const cbuild = require('cbuild');

cbuild.build(path.resolve(__dirname, '..'), {
	bundlePath: path.resolve(__dirname, '../dist/bundle.js'),
	debug: true,
	includeConfigList: [],
	mapPackages: ['systemjs-hot-reloader'],
	outConfigPath: path.resolve(__dirname, '../config-npm.js'),
	sfx: false,
	sourcePath: null
});
