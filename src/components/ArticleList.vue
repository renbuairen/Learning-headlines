<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功~"
    >
      <van-list
        @load="loadNextPage"
        offset="400"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了,请重新加载!"
      >
        <Articleltem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></Articleltem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'

import Articleltem from '@/components/ArticleItem.vue'
export default {
  components: {
    Articleltem
  },
  data() {
    return {
      loading: false,
      articles: [],
      pre_timestamp: '',
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    // 频道id
    id: {
      type: [String, Number],
      require: true
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())

        // 存储下页时间挫
        this.pre_timestamp = data.data.pre_timestamp

        this.articles = data.data.results
        console.log(data)
      } catch (error) {
        // 1,获取状态码
        const status = error.response.status

        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败,请重新刷新')
        }
      }
    },
    // 加载下一页频道数据
    async loadNextPage() {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error('错误了')
        // }

        const { data } = await getArticleList(this.id, this.pre_timestamp)

        // 没有数据了
        if (!data.data.pre_timestamp) {
          this.finished = true
        }

        // 将第n页的数据,放在articles
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 更新加载状态
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
