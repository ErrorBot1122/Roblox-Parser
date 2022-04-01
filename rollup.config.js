import { uglify }					from 'rollup-plugin-uglify'

//import { getBabelOutputPlugin }		from '@rollup/plugin-babel'
//import { nodeResolve }				from '@rollup/plugin-node-resolve'
//import sourcemaps		from 'rollup-plugin-sourcemaps'

import multi 			from '@rollup/plugin-multi-entry';
import nodePolyfills	from 'rollup-plugin-polyfill-node';

export default [
	// Main Build
	{
		input: 'index.js',

		//plugins: [ nodePolyfills( { fs: true } ) ],
		
		output: [
			{
				file: 'builds/robloxFileHandler.mjs',
				format: 'es'
			},

			{
				globals: { xml2js: 'xml2js', fs: 'fs' },
				file: 'builds/robloxFileHandler.js',
				format: 'esm',
				name: 'RBXHandler'
			},
			
			{
				globals: { xml2js: 'xml2js', fs: 'fs' },				
				file: 'builds/robloxFileHandler.min.js',
				plugins: [ uglify( { output: { comments: "some" } } ) ],
				format: 'esm',
				name: 'RBXHandler'
			},
		]
	},

	// Modules Build
	{
		// Select all the Classes, Datatypes and Enums
		input: [ 'Classes/*.mjs','Datatypes/*.mjs', 'Enums/*.mjs, modules/*.mjs' ],
		
		plugins: [multi()],

		output: [
			{
				file: 'builds/extras/Modules/RoModules.mjs',
				format: 'es'
			},
			{
				file: 'builds/extras/Modules/RoModules.min.mjs',
				plugins: [uglify()],
				format: 'es'
			}
		]
		
	}
];