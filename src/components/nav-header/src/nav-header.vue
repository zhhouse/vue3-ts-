<template>
  <div class="nav-header">
    <el-icon :size="25" @click="handleFoldClick"><component :is="isFold ? 'Fold' :'Expand'"/></el-icon>
    <div class="content">
      <div>面包屑</div>
      <div>用户信息</div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Expand, Fold } from '@element-plus/icons-vue'
import { defineComponent,ref } from 'vue'
export default defineComponent({
  name: 'nav-header',
  emits:['foldChange'],
  setup(props,{emit}){
    const isFold = ref(false)
    const handleFoldClick = ()=>{
      isFold.value = !isFold.value
      emit('foldChange',isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>
<style lang='less' scoped>
.nav-header {
  height: 100%;
  display: flex;
  .el-icon {
    margin-top: 10px;
    cursor:pointer;
  }
  .content {
    flex:1;
    padding:0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
