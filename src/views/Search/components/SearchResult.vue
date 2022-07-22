<template>
  <div>
    <van-list
      v-model="loading"
      offset="400"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      per_page: 10,
      page: 0
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async onLoad() {
      this.page++
      const { data } = await getSearchResults(
        this.$parent.keywords,
        this.page,
        this.per_page
      )
      this.$parent.list.push(...data.data.results)

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.data.results < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style></style>
