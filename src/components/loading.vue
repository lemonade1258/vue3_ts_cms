<template>
  <div class="loading">
    <n-spin :show="show">
      <template #icon>
        <n-icon>
          <Reload />
        </n-icon>
      </template>
      <template #description> 正在加载中... </template>
    </n-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Reload } from '@vicons/ionicons5'
import isShowLoading from '@/service/request'

export default defineComponent({
  components: {
    Reload
  },
  setup() {
    return {
      show: isShowLoading
    }
  }
})
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  background-repeat: no-repeat;
  background-position: center;
}

.loading .n-spin-body {
  position: absolute;
  top: 30%;
  left: 46%;
  // background-color: red;
}
</style>
