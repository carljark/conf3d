module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		userminPrepare: 'grunt-usemin',
		ngtemplates: 'grunt-angular-templates',
		cdnify: 'grunt-google-cdn'
	});

	grunt.initConfig({
		express: {
			options: {
				port: 9000
			},
			dev: {
				options: {
					script: 'server.js'
				}
			}
		},
		jshint:{
			all:[
				'server.js',
				'app.js',
				'./rutas/rutas.js'
			],
			options: {
				"esversion": 6
			}
		},
		watch: {
			options: {
				livereload: true
			},
			express: {
				files: ['views/index.ejs'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');



	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('server', ['express:dev','watch']);

};
