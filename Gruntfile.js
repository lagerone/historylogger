module.exports = function (grunt) {

	'use strict';

	var config = {};

	config.jshint = {
		all: ['./src/**/*.js']
	};

	config.jasmine = {
		src: [
			'./src/HistoryLogger.js'
		],
		options: {
			vendor: [],
			specs: './src/HistoryLoggerSpec.js'
		}
	};

	config.uglify = {
		js: {
			src: './src/HistoryLogger.js',
			dest: './build/HistoryLogger.min.js'
		}	
	};

	config.less = {
		development: {
			files: {
				'./build/historylogger.css': './src/historylogger.less'
			}	
		}
	};

	config.watch = {
		files: ['./src/**/*', './specrunner.html', './index.html'],
		tasks: ['jshint', 'jasmine', 'less'],
		options: {
			livereload: true // uses default port 35729
		}
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
};