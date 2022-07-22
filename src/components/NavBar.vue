<template>
  <div>
    <van-nav-bar
      :title="this.$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-nav-bar {
  background-color: #3296fa;
}

/deep/.van-icon {
  color: aliceblue;
}

/deep/.van-nav-bar__title {
  color: aliceblue;
}
</style>
