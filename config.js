System.config({
	transpiler: false,

	map: {
		css: 'node_modules/systemjs-plugin-css/css.js'
	},

	packages: {
		'node_modules/': {
			defaultExtension: 'js',
			meta: {
				'vue/*': { globals: { process: "node_modules/cbuild/process-dev.js" } }
			}
		},
		'dist/': {
			defaultExtension: 'js',
			meta: {
				'*.css': { loader: 'css' }
			}
		}
	}
});
