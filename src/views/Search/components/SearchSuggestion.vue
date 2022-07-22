<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightDate"
      :key="index"
      @click="clickFn(item)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>

      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion, getSearchResults } from '@/api'
export default {
  data() {
    return {
      suggestions: [],
      timer: null
    }
  },
  props: {
    // 搜索建议
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监视属性绑定的函数,如果是methods里面的函数,支持字符串的写法
    keywords: {
      immediate: true,
      handler() {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getSearchSuggestion()
        }, 500)
      }
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (!res.data.data.options[0]) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    async clickFn(keywords) {
      const text = keywords.replace(/<span style="color:red;">|<\/span>/gi, '')
      const { data } = await getSearchResults(text)
      console.log(data)
      this.$parent.keywords = text

      if (!this.$parent.history.includes(text)) {
        this.$parent.history.unshift(text)
      }

      this.$parent.list = data.data.results
      this.$parent.isShowSearchResult = true
    }
  },
  computed: {
    highlightDate() {
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red;">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
