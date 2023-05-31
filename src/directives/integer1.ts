import type { ObjectDirective, DirectiveBinding } from 'vue'

const vNumber: ObjectDirective = {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('input', (event) => {
      const inputValue = (event.target as HTMLInputElement).value;
      // 使用正则表达式匹配并替换非数字字符
      const numericValue = inputValue.replace(/\D/g, '');
      (event.target as HTMLInputElement).value = Number(numericValue)
      // 将过滤后的值更新到数据模型中
      binding.instance?.$emit('update:modelValue', Number(numericValue))
    })
  }
}

export default vNumber