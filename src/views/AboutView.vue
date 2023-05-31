<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br/>
    <div>
      <el-form ref="ruleFormRef" :model="data" :rules="rules">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model.trim="data.name"></el-input>
        </el-form-item>
        <el-form-item label="分数：" prop="score">
          <!-- <el-input v-number v-model="data.score" maxlength="3" show-word-limit></el-input> -->
          <el-input v-number="{data, key: 'score', sign: true }" v-model="data.score" maxlength="3" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">submit</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import vNumber from '@/directives/integer'
import { reactive, ref, toRaw } from 'vue'

interface Idata {
  name?: string
  score?: number 
}

const ruleFormRef = ref()

const data = reactive<Idata>({
  name: 'victor',
  score: undefined
})

const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],
  score: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log(toRaw(data))
    }
  })
}

const resetForm = (formEl) => {
  const input = document.body.getElementsByTagName('input')[0]
  input.removeEventListener('keyup', function keyup() {
    console.log('removeEventListener')
  })
  if (!formEl) return
  formEl.resetFields()
}
</script>


<style>
input[type="text"] {
    padding: 1px 2px;
    font-size: 18px;
}
.msg {
  margin: 20px auto;
  font-size: 18px;
}
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
