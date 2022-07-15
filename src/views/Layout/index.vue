<template>
  <div>
    <!-- 二级路由页面 -->
    <router-view></router-view>

    <!--底部导航-->
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        首页
      </van-tabbar-item>

      <van-tabbar-item>
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
        视频
      </van-tabbar-item>

      <van-tabbar-item>
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
        问答
      </van-tabbar-item>

      <van-tabbar-item>
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 40px;
}
</style>
