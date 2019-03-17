

module.exports = function(grunt) {
    grunt.initConfig({	
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            default : {
                tsconfig: './tsconfig.json'
            },
            dev : {
                tsconfig: './tsconfig.json',
                watch: '.'
            },
        },

        run:{
            backend: {
                exec: 'node app.js'
            }
        },
        
        nodemon: {
            backend: {
              script: 'app.js',
              options: {
                ignore: ['node_modules/**'],
                ext: 'js',
                delay: 1000
              }
            }
        },

        concurrent: {
            backend: ['ts:dev', 'nodemon:backend'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    // Load tasks
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Build
    grunt.registerTask('build', ['ts:default']);
    grunt.registerTask('build-watch', ['ts:dev']);
    // Run
    grunt.registerTask('start', ['run:backend']);
    grunt.registerTask('serve', ['concurrent:backend']);
}