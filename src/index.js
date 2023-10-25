const postcss = require('postcss')

let reg

module.exports = postcss.plugin(
  'postcss-change-prefix-namespace',
  function (options = {}) {
    const { prefix = 'el-', replace = 'nl-' } = options || {}

    // css:每个css文件的ast
    function plugin(css) {
      css.walkRules((rule) => {
        const { selector } = rule
        if (selector.includes(prefix) && !selector.includes(replace)) {
          const clone = rule.clone()
          clone.selector = replaceStr(selector, prefix, replace)
          rule.replaceWith(clone)
        }
      })
    }

    function replaceStr(str, prefix, replace) {
      if (!reg) reg = new RegExp(`(^|(\\s)+|\\.|=)${prefix}`, 'g')
      return str.replace(reg, `$1${replace}`)
    }

    return plugin
  }
)
