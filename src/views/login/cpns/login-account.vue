<template>
  <div class="login-account">
    <el-form label-width="6rem" :rules="rules" :model="account" ref="formRef">
      <el-form-item label-width="auto" label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label-width="auto" label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { ElForm } from "element-plus";
import { defineComponent, reactive,ref } from "vue";
import { rules } from "../config/account-config";
import localCache from '@/utils/cache'
export default defineComponent({
  name: "login-account",
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? "",
      password: localCache.getCache('password') ?? "",
    });
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword:boolean)=>{
      formRef.value?.validate(valid=>{
        if(valid){
          if(isKeepPassword){
            localCache.setCache('name',account.name)
            localCache.setCache('password',account.password)
          }else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('login/accountLoginAction',{...account})
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    };
  },
});
</script>
<style lang="less" scoped>
  .login-account {
    display: flex;
    flex-direction:column;
    justify-content: center;
  }
</style>
