<template>
  <div>
    <van-cell title="搜索历史" class="topCell">
      <template #right-icon>
        <van-icon
          v-if="!isShow"
          style="line-height: 24px"
          name="delete-o"
          @click="clickFn()"
        />

        <div v-if="isShow">
          <span style="margin-right: 10px" @click="clearHistory">全部删除</span>
          <span @click="isShow = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in this.$parent.history"
      :key="index"
      :title="item"
      @click="textFn(item)"
    >
      <template #right-icon v-if="isShow">
        <van-icon
          name="close"
          style="line-height: 24px"
          @click="removeFn(index)"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    clickFn() {
      this.isShow = !this.isShow
    },
    removeFn(index) {
      this.$parent.history.splice(index, 1)
    },
    clearHistory() {
      this.$parent.history = []
    },
    textFn(val) {
      this.$emit('textKey', val)
    }
  }
}
</script>

<style scoped lang="less">
.topCell {
  /deep/.van-icon-delete-o {
    color: #969799;
  }
}
</style>
