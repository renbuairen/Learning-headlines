<template>
  <div>
    <!-- 底部状态栏 -->
    <div class="commentBar">
      <van-goods-action>
        <van-goods-action-button text="写评论" @click="showPopup" />
        <van-goods-action-icon icon="comment-o" badge="0" />
        <van-goods-action-icon
          v-if="obj.is_collected"
          icon="star"
          color="red"
          @click="delCollect(obj.art_id)"
        />
        <van-goods-action-icon
          v-else
          icon="star-o"
          @click="articleCollect(obj.art_id)"
        />

        <van-goods-action-icon
          v-if="obj.attitude === 1"
          icon="good-job"
          color="red"
          @click="delLike(obj.art_id)"
        />
        <van-goods-action-icon
          v-else
          icon="good-job-o"
          @click="articleLike(obj.art_id)"
        />
        <van-goods-action-icon icon="share" @click="showShare = true" />
      </van-goods-action>
    </div>

    <!-- 评论弹窗 -->
    <div class="commentPopup">
      <van-popup v-model="show" position="bottom">
        <van-field
          v-model="message"
          rows="2"
          border
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <div class="boxBottom" style="font-size: 14px">发布</div>
      </van-popup>
    </div>

    <!-- 分享弹窗 -->
    <div class="SharePopup">
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script>
import { articleLike, delLike, articleCollect, delCollect } from '@/api'
export default {
  props: {
    obj: {
      type: Object,
      require: true,
      default: () => ({})
    }
  },
  data() {
    return {
      show: false,
      message: '',
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },

  methods: {
    showPopup() {
      this.show = true
    },
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    },
    async articleLike(artId) {
      const { data } = await articleLike(artId)
      console.log(data)
      this.$parent.obj.attitude = 1
    },
    async delLike(artId) {
      await delLike(artId)
      this.$parent.obj.attitude = 0
    },
    async articleCollect(artId) {
      const { data } = await articleCollect(artId)
      console.log(data)
      this.$parent.obj.is_collected = true
    },
    async delCollect(artId) {
      await delCollect(artId)
      this.$parent.obj.is_collected = false
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
.commentBar {
  .van-goods-action {
    border-top: 3px solid #eee;
    height: 88px;

    /deep/.van-button--large {
      width: 20%;
      height: 50%;
      color: rgb(119, 119, 119);
      font-size: 30px;
      margin: 0 50px;
    }

    /deep/.van-button {
      border: 1px solid #eee;
    }

    /deep/.van-icon {
      color: rgb(119, 119, 119);
      margin-top: 20px;
      font-size: 40px;
    }
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
