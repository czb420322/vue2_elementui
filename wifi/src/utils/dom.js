/* istanbul ignore next */

import Vue from 'vue'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'

const isServer = Vue.prototype.$isServer
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = isServer ? 0 : Number(document.documentMode)

/* istanbul ignore next */
const trim = string => {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
/* istanbul ignore next */
const _camelCase = name => {
  return name
    .replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/* istanbul ignore next */
export const on = (() => {
  if (!isServer && document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/* istanbul ignore next */
export const off = (() => {
  if (!isServer && document.removeEventListener) {
    return (element, event, handler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return (element, event, handler) => {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/* istanbul ignore next */
export const once = (el, event, fn) => {
  let listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

/* istanbul ignore next */
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/* istanbul ignore next */
export function addClass (el, cls) {
  if (!el) return
  let curClass = el.className
  let classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
export function removeClass (el, cls) {
  if (!el || !cls) return
  let classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

/* istanbul ignore next */
export const getStyle =
  ieVersion < 9 ? (element, styleName) => {
    if (isServer) return
    if (!element || !styleName) return null
    styleName = _camelCase(styleName)
    if (styleName === 'float') {
      styleName = 'styleFloat'
    }
    try {
      switch (styleName) {
        case 'opacity':
          try {
            return element.filters.item('alpha').opacity / 100
          } catch (e) {
            return 1.0
          }
        default:
          return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null
      }
    } catch (e) {
      return element.style[styleName]
    }
  } : (element, styleName) => {
    if (isServer) return
    if (!element || !styleName) return null
    styleName = _camelCase(styleName)
    if (styleName === 'float') {
      styleName = 'cssFloat'
    }
    try {
      let computed = document.defaultView.getComputedStyle(element, '')
      return element.style[styleName] || computed ? computed[styleName] : null
    } catch (e) {
      return element.style[styleName]
    }
  }

/* istanbul ignore next */
export function setStyle (element, styleName, value) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (let prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = _camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value)
        ? ''
        : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
}

/**
 * 设置 或者 获取 data 属性
 * @param {Element} element
 * @param {String, Array, Object, null} attr
 * @param {String, null} val
 */
export function data (element, attr = null, val = null) {
  let attributes = Object.create(null)

  if (attr === null) {
    // 获取全部 data 属性
    attributes = element.dataset
    if (!attributes) {
      Array.from(element.attributes, node => {
        let nodeName = node.nodeName || node.name
        let matches = nodeName.match(/^data-([\w-]+)/i)
        if (matches) {
          attributes[camelCase(matches[1])] =
            node.nodeValue || node.textContent || node.value
        }
      })
    }

    return attributes
  } else if (typeof attr === 'string' && val === null) {
    // 获取指定 data 属性
    attributes[camelCase(attr)] = element.getAttribute(
      `data-${kebabCase(attr)}`
    )

    return attributes
  } else if (typeof attr === 'string' && val !== null) {
    // 设置指定 data 属性
    element.setAttribute(`data-${kebabCase(attr)}`, val)
  } else if (Array.isArray(attr)) {
    // 获取指定 data 属性
    attr.forEach(k => {
      attributes[camelCase(k)] = element.getAttribute(`data-${kebabCase(k)}`)
    })

    return attributes
  } else if (typeof attr === 'object') {
    // 设置指定 data 属性
    Object.keys(attr).forEach(k => {
      element.setAttribute(`data-${kebabCase(k)}`, attr[k])
    })
  }
}

export function isHTMLElement (element) {
  return window.HTMLElement ? element instanceof HTMLElement : ('nodeType' in element ? element.nodeType === 1 : false)
}

export function getVendorPrefixProp (prop) {
  let elementStyle = document.createElement('div').style

  let vendors = ['', 'webkit', 'ms', 'moz', 'o']

  for (let vendor of vendors) {
    let perfectProp = camelCase(`${vendor}-${prop}`)
    if (elementStyle[perfectProp] !== undefined) {
      return perfectProp
    }
  }
}
