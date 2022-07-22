<template>
  <div>
    <!--渲染无图片-->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
      @click="articleInfoTo(articleInfo.art_id)"
    />

    <!--演染一张图片-->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
      @click="articleInfoTo(articleInfo.art_id)"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <!--渲染三张图片-->
    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      @click="articleInfoTo(articleInfo.art_id)"
    >
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <!-- 文章描述 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc() {
      const relativeTime = dayjs(this.articleInfo.pubdate).fromNow()
      return `${this.articleInfo.aut_name} ${this.articleInfo.comm_count}评论 ${relativeTime}`
    }
  },
  methods: {
    articleInfoTo(val) {
      console.log(val)
      this.$router.push(`/detail/${val}`)
    }
  }
}
</script>

<style></style>
