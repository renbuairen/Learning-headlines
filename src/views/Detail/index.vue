<template>
  <div v-if="obj.content">
    <div>
      <NavBar />
    </div>
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
      <section ref="imgs" class="markdown-body" v-html="obj.content"></section>
      <van-divider style="margin: 16px 0px">正文结束</van-divider>
      <!-- 评论 -->
      <van-list
        @load="loadNextPage"
        offset="400"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了,请重新加载!"
      >
        <CommentCard :commentObj="commentObj" />
      </van-list>
    </main>
    <Comment :obj="obj" />
  </div>
</template>

<script>
import '@/assets/github-markdown.css'
import dayjs from '@/utils/dayjs'
import { getArticleInfo, focusUserId, delUserId, getComments } from '@/api'
import NavBar from '@/components/NavBar.vue'
import Comment from '@/components/Comment.vue'
import CommentCard from '@/components/CommentCard.vue'
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      obj: {},
      isLoading: false,
      commentObj: {},
      loading: false,
      finished: false,
      error: false,
      page: '',
      endPage: '',
      timer: 0
    }
  },
  components: {
    NavBar,
    Comment,
    CommentCard
  },
  async created() {
    await this.getArticleInfo()

    await this.getComments()

    this.$nextTick(() => {
      const images = []
      const arr = this.$refs.imgs.querySelectorAll('img')

      arr.forEach((item, index) => {
        images.push(item.currentSrc)
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    })
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
    },
    async getComments() {
      const { data } = await getComments('a', this.$route.params.art_id)
      this.commentObj = data.data
      this.page = data.data.last_id
      this.endPage = data.data.end_id
      console.log(this.commentObj)
    },
    async loadNextPage() {
      try {
        if (this.page !== this.endPage || this.timer !== 0) {
          const { data } = await getComments(
            'a',
            this.$route.params.art_id,
            this.page
          )
          // 没有数据了
          if (data.data.end_id === data.data.last_id) this.finished = true

          this.commentObj.results.push(...data.data.results)

          // 更新页数
          this.page = data.data.last_id
        }
        this.timer++
      } catch (err) {
        this.error = true
      } finally {
        // 史新加载状态
        this.loading = false
      }
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
  margin-bottom: 100px;

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
