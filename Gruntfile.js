// 配置grunt
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

// var connect = require('connect');
var serveStatic = require('serve-static');
// connect(serveStatic('localhost')).listen(9001);

module.exports = function (grunt) {

  grunt.initConfig({

    pkg:grunt.file.readJSON('package.json'),

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
      options: {
        port: 9000,
        hostname: 'localhost',
        base: {
          path: './',
          // path: 'localhost:9000/',
          options: {
            index: 'gruntIndex.html'
          }
        },
        open: true,
        livereload: true,
        keepalive: true
        // Change this to '0.0.0.0' to access the server from outside
      },
      proxies: [
        {
          context: '/api', // 这是你希望出现在grunt serve服务中的路径，比如这里配置的是http://127.0.0.1:9000/api/
          host: 'localhost', // 这是你希望转发到的远端服务器
          port: 80, // 远端服务器端口
          changeOrigin: true, // 建议配置为true，这样它转发时就会把host带过去，比如www.ngnice.com，如果远端服务器使用了虚拟主机的方式配置，该选项通常是必须的。
          rewrite: {
            // '^/api/': '/remote_api/'  // 地址映射策略，从context开始算，把前后地址做正则替换，如果远端路径和context相同则不用配置。
            '^/api/': '/'  // 地址映射策略，从context开始算，把前后地址做正则替换，如果远端路径和context相同则不用配置。
          }
        }
      ],

      // livereload: {
      //   options: {
      //     middleware: function (connect) {
      //       return [
      //         lrSnippet,
      //         mountFolder(connect, '.tmp'),
      //         connect().use('/bower_components', connect.static('./bower_components')),
      //         mountFolder(connect, config.app),
      //         proxySnippet,
      //       ];
      //     }
      //   }
      // }
      livereload: {
        options: {
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

            // Serve static files.
            options.base.forEach(function(base) {
              // middlewares.push(connect.static(base));
              middlewares.push(serveStatic(base.path, base.options));
            });

            // Make directory browse-able.
            // var directory = options.directory || options.base[options.base.length - 1];
            // middlewares.push(connect.directory(directory));

            return middlewares;
          }

        }
      }
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


  // grunt.registerTask('staticServer', '启动静态服务......', function () {
  //   grunt.task.run([
  //     'connect:default',
  //     'watch'
  //   ]);
  // });
  // grunt.registerTask('proxyServer', '启动代理服务......', function () {
  //   grunt.task.run([
  //     'configureProxies',
  //     'connect:liverload',
  //     'watch'
  //   ]);
  // });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      // 'clean:server',
      // 'wiredep',
      // 'concurrent:server',
      // 'autoprefixer',
      'configureProxies',     //增加到livereload前边
      'connect:livereload',
      // 'watch'
    ]);
  });

  //注册
  grunt.registerTask('default', ['concat','uglify','less','htmlmin','cssmin','babel'])

}
