<template>
  <div>
    <div
      class="bigBox"
      v-for="(item, index) in commentObj.results"
      :key="index"
    >
      <van-image
        width="35"
        height="35"
        fit="cover"
        round
        :src="item.aut_photo"
      />
      <div class="middle">
        <h5>{{ item.aut_name }}</h5>
        <p>{{ item.content }}</p>
        <div class="section">
          <span>{{ item.pubdate | time }}</span
          ><van-button
            type="default"
            round
            size="small"
            @click="getComments(item.com_id)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
      <div class="right">
        <van-goods-action-icon
          v-if="item.is_liking"
          icon="good-job"
          color="red"
          @click="cancelCommentsLike(item.com_id)"
        />
        <van-goods-action-icon
          v-else
          icon="good-job-o"
          @click="commentsLike(item.com_id)"
        />
        <span>{{ item.like_count ? item.like_count : '赞' }}</span>
      </div>
    </div>

    <!-- 评论回复弹窗 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 导航 -->
      <div class="iconBar">
        <van-nav-bar
          :title="title"
          left-icon="cross"
          @click-left="onClickLeft"
        />
      </div>

      <!-- 顶部评论 -->
      <div class="bigBox topBar">
        <van-image
          width="35"
          height="35"
          fit="cover"
          round
          :src="this.currentTarget.aut_photo"
        />
        <div class="middle">
          <h5>{{ this.currentTarget.aut_name }}</h5>
          <p>{{ this.currentTarget.content }}</p>
          <div class="section">
            <span>{{ this.currentTarget.pubdate | time }}</span
            ><van-button type="default" round size="small"
              >回复{{ this.currentTarget.reply_count }}</van-button
            >
          </div>
        </div>
        <div class="right">
          <van-goods-action-icon
            v-if="this.currentTarget.is_liking"
            icon="good-job"
            color="red"
            @click="cancelCommentsLike(comIdTemp)"
          />
          <van-goods-action-icon
            v-else
            icon="good-job-o"
            @click="commentsLike(comIdTemp)"
          />
          <span>{{
            this.currentTarget.like_count ? this.currentTarget.like_count : '赞'
          }}</span>
        </div>
      </div>

      <!-- 全部回复 -->
      <div style="padding: 0px 16px 46px">
        <van-cell title="全部回复" />

        <van-list
          @load="loadNextPage"
          offset="400"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="出错了,请重新加载!"
        >
          <div
            class="bigBox"
            v-for="(item, index) in commentObjNext.results"
            :key="index"
          >
            <van-image
              width="35"
              height="35"
              fit="cover"
              round
              :src="item.aut_photo"
            />
            <div class="middle">
              <h5>{{ item.aut_name }}</h5>
              <p>{{ item.content }}</p>
              <div class="section">
                <span>{{ item.pubdate | time }}</span
                ><van-button type="default" round size="small"
                  >回复{{ item.reply_count }}</van-button
                >
              </div>
            </div>
            <div class="right">
              <van-goods-action-icon
                v-if="item.is_liking"
                icon="good-job"
                color="red"
                @click="cancelCommentsLikeNext(item.com_id)"
              />
              <van-goods-action-icon
                v-else
                icon="good-job-o"
                @click="commentsLikeNext(item.com_id)"
              />
              <span>{{ item.like_count ? item.like_count : '赞' }}</span>
            </div>
          </div>
        </van-list>

        <div class="btn">
          <van-button round type="default" @click="showComments = true"
            >评论</van-button
          >
        </div>
        <!-- 发布评论回复 -->
        <div class="commentPopup">
          <van-popup v-model="showComments" position="bottom">
            <van-field
              v-model="message"
              rows="2"
              border
              type="textarea"
              maxlength="50"
              placeholder="请输入留言"
              show-word-limit
            />
            <div
              class="boxBottom"
              style="font-size: 14px"
              @click="releaseComment"
            >
              发布
            </div>
          </van-popup>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  commentsLike,
  cancelCommentsLike,
  getComments,
  releaseComment
} from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  props: {
    commentObj: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      show: false,
      page: '',
      endPage: '',
      timer: 0,
      commentObjNext: {},
      loading: false,
      finished: false,
      error: false,
      comIdTemp: '',
      currentTarget: {},
      showComments: false,
      message: ''
    }
  },
  methods: {
    async commentsLike(comId) {
      await commentsLike(comId)
      const index = this.commentObj.results.findIndex((item) => {
        return item.com_id === comId
      })
      const target = this.commentObj.results[index]
      target.is_liking = true
      target.like_count++
    },
    async cancelCommentsLike(comId) {
      await cancelCommentsLike(comId)
      const index = this.commentObj.results.findIndex((item) => {
        return item.com_id === comId
      })
      const target = this.commentObj.results[index]
      target.is_liking = false
      target.like_count--
    },
    async commentsLikeNext(comId) {
      await commentsLike(comId)
      const index = this.commentObjNext.results.findIndex((item) => {
        return item.com_id === comId
      })
      const target = this.commentObjNext.results[index]
      target.is_liking = true
      target.like_count++
    },
    async cancelCommentsLikeNext(comId) {
      await cancelCommentsLike(comId)
      const index = this.commentObjNext.results.findIndex((item) => {
        return item.com_id === comId
      })
      const target = this.commentObjNext.results[index]
      target.is_liking = false
      target.like_count--
    },
    onClickLeft() {
      this.show = false
    },

    async getComments(comId) {
      const index = this.commentObj.results.findIndex((item) => {
        return item.com_id === comId
      })
      this.currentTarget = this.commentObj.results[index]

      this.show = true
      this.comIdTemp = comId
      const { data } = await getComments('c', comId)

      if (data.data.end_id === data.data.last_id) this.finished = true

      console.log(data)
      this.commentObjNext = data.data
      this.page = data.data.last_id
      this.endPage = data.data.end_id
    },
    async loadNextPage() {
      try {
        if (this.page !== this.endPage || this.timer !== 0) {
          const { data } = await getComments('c', this.comIdTemp, this.page)
          // 没有数据了
          if (data.data.end_id === data.data.last_id) this.finished = true

          this.commentObjNext.results.push(...data.data.results)

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
    },

    // 评论的评论发布
    async releaseComment() {
      this.$toast.loading({
        message: '加载中...',
        // loading时,禁止点击页面
        forbidClick: true
      })
      try {
        const { data } = await releaseComment(
          this.comIdTemp,
          this.message,
          this.$route.params.art_id
        )
        console.log(data)
        this.showComments = false
        this.message = ''

        this.commentObjNext.results.unshift(data.data.new_obj)
        const index = this.commentObj.results.findIndex((item) => {
          return item.com_id === this.comIdTemp
        })
        this.$parent.$parent.commentObj.results[index].reply_count++
        this.commentObjNext.total_count++

        this.$toast.success('发布成功')
      } catch (error) {
        console.log(error)
        const status = error.response.status

        let message = '发布失败'

        if (status === 401 || status === 403) {
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
    }
  },
  filters: {
    time(val) {
      return dayjs(val).fromNow()
    }
  },
  computed: {
    title() {
      return this.commentObjNext.total_count
        ? `${this.commentObjNext.total_count}条回复`
        : '暂无回复'
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.topBar {
  margin: 92px 32px 0;
}
.bigBox {
  font-size: 12px;
  display: flex;
  padding: 20px 0;
  border-bottom: 2px solid #eee;

  .middle {
    flex: 7;
    margin-left: 20px;

    h5 {
      font-weight: normal;
      margin-bottom: 30px;
      color: #406599;
    }

    p {
      font-size: 30px;
      margin-bottom: 30px;
    }

    .section {
      display: flex;
      align-items: center;

      .van-button {
        width: 136px;
        height: 48px;
      }

      span {
        margin-right: 22px;
      }
    }
  }

  .right {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: -110px;

    .van-goods-action-icon {
      background-color: unset;
    }

    span {
      margin-left: -20px;
      margin-top: -4px;
    }
  }
}
.iconBar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  .van-popup__close-icon {
    line-height: 11px;
  }
}
.btn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 50px;
  background-color: pink;

  .van-button--round {
    width: 100%;
  }
}
.commentPopup {
  .van-popup--bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 0 32px 32px;

    .van-cell {
      background-color: #f5f7f9;

      /deep/.van-field__value {
        padding: 20px 32px;
      }
    }
    .van-field {
      flex: 1;
    }
  }

  .boxBottom {
    width: 124px;
    text-align: center;
    line-height: 88px;
    color: #6ba3d8;
  }
}
</style>
