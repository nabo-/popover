module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('assemble');

    grunt.registerTask('build', ['copy', 'typescript', 'uglify', 'image', 'assemble', 'clean']);
    grunt.registerTask('default', ['compass', 'connect', 'watch']);

    grunt.initConfig({

        watch: {
            assemble: {
                files: ['src/html/**/*.hbs'],
                tasks: ['assemble']
            },
            compass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['compass', 'copy:scss']
            },
            typescript: {
                files: ['src/ts/**/*.ts'],
                tasks: ['typescript', 'uglify']
            },
            image: {
                files: ['src/img/*.{png,jpg,gif}'],
                tasks: ['newer:image:dist']
            },
            options: {
               livereload: true
            }
        },

        clean: {
            build: {
                src: ['build/**/.DS_Store', 'src/**/.DS_Store', '**/.sass-cache']
            }
        },

        typescript: {
          base: {
            src: ['src/ts/**/*.ts'],
            dest: 'build/js/popover.js',
            options:{
                sourceMap: false,
                comments : true
            }
          }
        },

        uglify: {
            dist: {
                files: {
                    // 出力ファイル: 元ファイル
                    'build/js/popover-min.js': 'build/js/popover.js'
                }
            }
        },

        copy: {
            scss: {
                files: [{
                    expand: true,
                    cwd: 'src/scss/',
                    src: ['**/*.scss'],
                    dest: 'build/scss/'
                }]
            }
        },

        image: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }],
                options: {
                    pngquant: true,
                    optipng: true,
                    advpng: true,
                    zopflipng: true,
                    pngcrush: true,
                    pngout: true,
                    mozjpeg: true,
                    jpegRecompress: true,
                    jpegoptim: true,
                    gifsicle: true,
                    svgo: true
                }
            }
        },

        connect: {
            livereload: {
                 options: {
                      port: 3001
                 }
            }
        },

        compass: {
            dist: {
                options: {
                    config: "config.rb"
                }
            }
        },

        assemble: {
            options: {
                layout: 'src/html/layouts/default.hbs',
                partials: 'src/html/partials/**/*.hbs',
                helpers: ['handlebars-helper-prettify'],
                flatten: true,
                prettify: {
                    condense: true,
                    padcomments: true,
                    indent: 4,
                    unformatted:['br']
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/html/pages/',
                    src: '**/*.hbs',
                    dest: 'build/'
                }]
            }
        }

    });



};
