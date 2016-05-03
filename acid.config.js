var static = require('acid-plugin-static')
var blog = require('acid-plugin-blog')

module.exports = {
  plugins: [
    static({
      templateDir: 'src/templates/static'
    }),
    blog({
      templateDir: 'src/templates/blog',
      postDir: 'src/posts'
    })
  ]
}
