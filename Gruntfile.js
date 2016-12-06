module.exports = function (grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dev: {
                src: ['src/bootstrap-lib/*.js', 'src/js/*.js'],
                dest: 'dist/script.js',
                options: {
                    mangle: false,
                    preserveComments: 'all',
                    beautify: {
                        width: 80,
                        beautify: true
                    } // beautify
                }, // options
            },
             prod: {
                src: ['src/bootstrap-lib/*.js', 'src/js/*.js'],
                dest: 'dist/<%= pkg.name %>.min.js',
                options: {
                  report: 'gzip',
                   drop_console: true
                }

            }
        },

        compass: {
            dev: {
                options: {
                    environment: 'development',
                    sassDir: 'src/sass',
                    sassPath: 'src/sass',
                    cssDir: 'dist',
                    cssPath: 'dist',
                    imagesPath: 'dist/img',
                    imagesDir: 'dist/img',
                    //noLineComments: true,
                    outputStyle: 'expanded'
                }
            },
            prod: {
                options: {
                    environment: 'production',
                    sassDir: 'src/sass',
                    sassPath: 'src/sass',
                    cssDir: 'dist',
                    cssPath: 'dist',
                    imagesPath: 'dist/img',
                    imagesDir: 'dist/img',
                    noLineComments: true,
                    outputStyle: 'compressed'
                } // options
            } // prod


        }, // compass


        concurrent: {
            target_dev: ['compass:dev', 'uglify:dev'],
            target_prod: ['compass:prod', 'uglify:prod', 'imagemin']
        },


        imagemin: {                          // Task 

            dynamic: {                         // Another target 
                files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: 'src/img/',                   // Src matches are relative to this path 
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
                    dest: 'dist/img'                  // Destination path prefix 
                }]
            }
        },
        
        watch: {
          src: {
            files: [
                'src/bootstrap/*',
                'src/js/*',
                'src/sass/*',
                ],
            tasks: ['concurrent:target_dev']
          }
        },
        
        
       clean: ["dist/*"]

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');


    // tasks of target1 run concurrently, after they all finished, tasks of target2 run concurrently, 
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('prod', ['concurrent:target_prod']);
    grunt.registerTask('clean', 'clean'); 

};