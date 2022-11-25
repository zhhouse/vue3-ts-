<template>
  <div class="login-phone">
    <el-form label-width="6rem" :rules="rules" :model="account">
      <el-form-item label-width="auto" label="手机号" prop="phoneNumber">
        <el-input v-model="account.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label-width="auto" label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent,reactive } from 'vue';
import { rules } from "../config/phone-config";
export default defineComponent({
  name: 'login-phone',
  setup(){
    const account = reactive({
      phoneNumber:'',
      password:''
    })

    return {
      account,
      rules
    }
  }
})
</script>
<style lang='less' scoped>

</style>
