<template>
  <div>
    <NavBar />
    <!-- 标题 -->
    <h5>{{ obj.title }}</h5>

    <!-- 主体头部 -->
    <main>
      <header>
        <van-cell
          :title="obj.aut_name"
          size="large"
          :label="relativeTime"
          center
        >
          <template #icon>
            <van-image
              width="35"
              height="35"
              fit="cover"
              round
              :src="obj.aut_photo"
            />
          </template>

          <template #right-icon>
            <van-button
              :loading="isLoading"
              v-if="!obj.is_followed"
              type="info"
              round
              size="small"
              icon="plus"
              @click="focusUserId(obj.aut_id)"
              >关注</van-button
            >
            <van-button
              :loading="isLoading"
              v-else
              type="default"
              round
              size="small"
              @click="delUserId(obj.aut_id)"
              >已关注</van-button
            >
          </template>
        </van-cell>
      </header>
      <section class="markdown-body" v-html="obj.content"></section>
      <van-divider style="margin: 16px 0px">正文结束</van-divider>
    </main>
    <Comment />
  </div>
</template>

<script>
import '@/assets/github-markdown.css'
import dayjs from '@/utils/dayjs'
import { getArticleInfo, focusUserId, delUserId } from '@/api'
import NavBar from '@/components/NavBar.vue'
import Comment from '@/components/Comment.vue'
export default {
  data() {
    return {
      obj: {},
      isLoading: false
    }
  },
  components: {
    NavBar,
    Comment
  },
  async created() {
    this.getArticleInfo()
  },
  computed: {
    relativeTime() {
      return dayjs(this.obj.pubdate).fromNow()
    }
  },
  methods: {
    async getArticleInfo() {
      const { data } = await getArticleInfo(this.$route.params.art_id)
      this.obj = data.data
      console.log(this.obj)
    },
    async focusUserId(id) {
      this.isLoading = true
      await focusUserId(id)
      // this.getArticleInfo()
      this.obj.is_followed = !this.obj.is_followed
      this.isLoading = false
    },
    async delUserId(id) {
      this.isLoading = true
      await delUserId(id)
      // this.getArticleInfo()
      this.obj.is_followed = !this.obj.is_followed
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  h5 {
    padding: 50px 32px;
  }
}
main {
  padding: 0 32px;
  margin-bottom: 90px;

  header {
    .van-cell__title {
      margin-left: 20px;
    }

    .van-cell__title {
      font-size: 10px;
    }

    .van-cell__label {
      font-size: unset;
    }

    .van-button--small {
      width: 170px;
      height: 58px;
    }
  }

  section {
    padding: 56px 0;
    font-size: 12px;
  }
}
</style>
