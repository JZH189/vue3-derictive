import { toRaw, isReactive } from 'vue'
import type { ObjectDirective, DirectiveBinding } from 'vue'

function processValue(el: HTMLInputElement, data: any, key: string, sign: boolean) {
  if (sign) {
    if (String(el.value).split('-').length > 2) {
      //如果存在多个-则去掉所有的非数字字符
      el.value = el.value.replace(/-+/g, '')
    }
    data[key] = el.value.replace(/[^-\d]/g, '')
    if (Object.is(el.value, '-0') || Object.is(el.value, '0-')) {
      //负号在0左右的通通重置为0
      data[key] = 0
    } else if (el.value.endsWith('-') && !Object.is(data[key], '-')) {
      //负号在数字后的通通去掉负号
      data[key] = el.value.replace(/-+/g, '')
    }
  } else {
    data[key] = el.value.replace(/\D/g, '')
  }
}

function validatorData(data: any, key: string) {
  if (typeof data === 'undefined') {
    //必须提供data
    throw Error(`'data' must be provided!`)
  } else if (!isReactive(data)) {
    //必须为响应式对象
    throw Error(`'data' must be reactive objects!`)
  } else if (typeof toRaw(data) === 'object' && !Object.hasOwn(data, key)) {
    //必须为响应式对象中定义的属性
    throw ReferenceError(`Uncaught ReferenceError: '${key}' is not defined`)
  }
}

const vNumber: ObjectDirective = {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    const input: HTMLInputElement = el.getElementsByTagName('input')[0]
    const data = binding?.value?.data
    const key = binding?.value?.key
    const sign = binding?.value?.sign || false
    //校验data的合法性
    validatorData(data, key)
    input.addEventListener('keyup', () => {
      processValue(input, data, key, sign)
    })
    input.addEventListener('blur', () => {
      if (Object.is(data[key], NaN) || Object.is(data[key], '-')) {
        data[key] = undefined
      } else if (data[key]) {
        data[key] = Number(data[key])
      }
    })
  }
}

export default vNumber