// 配置grunt
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
      },
      css: {
        files: {
          'dist/buildCss.mini.css':'dist/buildCss.css'
        }
      }
    },
    // 监听配置(监听html，css，js，img)
    watch:{
      img:{
        files: ['img/*.{png,jpg,jpeg}'],
        options:{
          livereload:true
        }
      },
      html: {
        files: ['html/*.html'],
        options: {
          livereload:true
        }
      },
      css: {
        files: ['css/*.css'],
        options: {
          livereload:true
        }
      },
      js: {
        files: ['js/*.js'],
        options:{
          livereload:true
        }
      }
    },
    // 配置less
    less: {
      files:{
        'dist/lessCss':'src/static/css/them.less'
      }
    },
    options:{

    },
    // 配置图片压缩
    imagemin: {
      files:[{
        expend:true,
        cwd: 'src/static',
        src:['']
      }],
      options:{

      }
    }
  });
  // 加载对应的包模块
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  //注册
  grunt.registerTask('default', ['concat','uglify','watch','less','imagemin'])
}
