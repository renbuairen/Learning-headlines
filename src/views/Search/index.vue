<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>

    <!--搜索结果/历史/建议-->
    <!-- <SearchHistory />
    <SearchResult />
    <SearchSuggestion /> -->
    <component
      :is="componentName"
      :keywords="keywords"
      :list="list"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggestion from './components/SearchSuggestion'
import SearchResult from './components/SearchResult'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false,
      list: [],
      history: []
    }
  },
  created() {
    this.history = JSON.parse(localStorage.getItem('history'))
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') return 'SearchHistory'
      if (this.isShowSearchResult) return 'SearchResult'
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true

      if (!this.history.includes(this.keywords)) {
        this.history.unshift(this.keywords)
      }
    },
    backToPrePage() {
      this.$router.go(-1)
    },
    visibleSearchSuggestion() {
      this.isShowSearchResult = false
    }
  },
  watch: {
    history: {
      handler() {
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search {
  .van-search {
    background-color: #3296fa;
  }
  .van-search__action {
    color: aliceblue;
  }
}
</style>
