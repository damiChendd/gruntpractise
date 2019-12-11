// 配置grunt

module.exports = function (grunt) {
  grunt.initConfig({

    pkg:grunt.file.readJSON('package.json'),

    // require('load-grunt-tasks')(grunt);

    // 合并配置
    concat:{
      test_grunt:{
        files: {
          'dist/build.js':['src/a.js','src/b.js']
        }
      },
      css:{
        files:{
          'dist/buildCss.css':['src/static/css/common.css','src/static/css/index.css']
        }
      }
    },

    // 压缩配置
    uglify:{
      test_grunt: {
        files: {
          'dist/build.mini.js':'dist/build.js'
        }
      }
    },

    // 配置less
    less: {
      compile:{
        files:{'dist/theme.css':'src/static/css/them.less'},
        options: {
          compress: false
        },
      }
    },

    // html压缩  grunt-contrib-htmlmin
    htmlmin:{
      dist:{
        files:{
          'dist/view/index.html':'src/view/index.html',
          'dist/view/login.html':'src/view/login.html'
        },
        options:{
          removeComments: true,
          collapseWhitespace: true
        }
      }
    },

    // css压缩  grunt-contrib-cssmin
    cssmin: {
      target:{
        files:{
          'dist/build.css':['dist/buildCss.css','dist/theme.css']
        }
      },
      options:{
        mergeIntoShorthands: false,
        roundingPrecision: -1
      }
    },

    // 配置图片压缩(有bug)
    // imagemin: {
    //   dynamic:{
    //     files:{
    //       expand:true,
    //       cwd:'src/static/img/header_02.png',
    //       // src:['**/*.{png,jpg,gif}'],
    //       src:['**/*.png'],
    //       dest:'dist/img/header_02.png'
    //     }
    //   }
    // },

    // js 语法配置 grunt-babel
    babel: {
      options: {
        sourceMap: true,
        // presets: ['babel-preset-es2015']
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/babel.js': 'src/babel.js'
        }
      }
    },

    // 服务器配置 grunt-connect-proxy
    connect: {
      sever: {
        options: {
          port: 9000,
          hostname: 'localhost'
        },
        proxies: {
          context:'/api',
          host:'localhost',
          port:80
        }
      },
    }


    // 监听配置(监听html，css，js，img)
    // watch:{
    //   img:{
    //     files: ['img/*.{png,jpg,jpeg}'],
    //     options:{
    //       livereload:true
    //     }
    //   },
    //   html: {
    //     files: ['html/*.html'],
    //     options: {
    //       livereload:true
    //     }
    //   },
    //   css: {
    //     files: ['css/*.css'],
    //     options: {
    //       livereload:true
    //     }
    //   },
    //   js: {
    //     files: ['js/*.js'],
    //     options:{
    //       livereload:true
    //     }
    //   },
    //   // less: {
    //   //   files: ['./src/static/css/*.less'],
    //   //   tasks: ['less:task'],
    //   //   options: {
    //   //     livereload:false
    //   //   }
    //   // }
    // },
  });
  // 加载对应的包模块
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');

  //注册
  // grunt.registerTask('default', ['concat','uglify','watch','less','imagemin','htmlmin'])
  // grunt.registerTask('default', ['concat','uglify','less','htmlmin','cssmin','imagemin'])
  grunt.registerTask('default', ['concat','uglify','less','htmlmin','cssmin','babel'])
  grunt.registerTask('server', ['configureProxies:server','connect:server'])
}
