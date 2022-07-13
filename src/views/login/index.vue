<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navBar"
      title="登录"
      left-arrow
      @click-right="backToPrePage"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 输入框 -->
    <van-form @submit="login" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <!-- icon图标 -->
        <!-- <i slot="left-icon" class="toutiao toutiao-shouji"></i> -->
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <!-- 分界线 -->
      <van-field
        v-model="code"
        name="hade"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <!-- icon图标 -->
        <!-- <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i> -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <template #button>
          <van-button class="code-btn" round size="mini">发送验证码</van-button>
        </template>
      </van-field>

      <!-- 登录 -->
      <div style="margin: 16px">
        <van-button class="fromButton" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 返回来之前的页面
    backToPrePage() {
      this.$router.back()
    },
    // 登录
    async login(val) {
      console.log(val)
      console.log(this.mobile, this.code)
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
//自定义导航栏样式
//:deep()穿透scoped样式
.navBar {
  background-color: #1b86f1;

  // :deep(.van-nav-bar__title){}
  /deep/.van-nav-bar__title {
    color: #fff;
  }

  .van-icon {
    color: #fff;
  }
}

//表单域样式
.from {
  /deep/.van-field__label {
    flex: 1;
  }

  /deep/.van-cell__value {
    flex: 20;
  }

  .toutiao {
    font-size: 0.49999rem;
  }

  .fromButton {
    border-radius: 0.12rem;
  }

  .code-btn {
    padding: 0 15px;
    background-color: #eee;
    color: #666;
  }
}
</style>
