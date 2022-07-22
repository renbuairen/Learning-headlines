<template>
  <div>
    <van-goods-action>
      <van-goods-action-button text="写评论" />
      <van-goods-action-icon icon="comment-o" badge="0" />
      <van-goods-action-icon icon="star-o" />
      <van-goods-action-icon icon="good-job-o" />
      <van-goods-action-icon icon="share" />
    </van-goods-action>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
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
</style>
