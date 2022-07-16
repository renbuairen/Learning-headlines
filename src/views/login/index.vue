<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navBar"
      title="登录"
      left-arrow
      @click-left="backToPrePage"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 输入框 -->
    <van-form @submit="login" class="from" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <!-- icon图标 -->
        <!-- <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i> -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <template #button>
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          />

          <van-button
            v-else
            class="code-btn"
            round
            size="mini"
            @click="sendCode"
            >发送验证码</van-button
          >
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
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from '@/views/login/rules'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    // 返回来之前的页面
    backToPrePage() {
      this.$router.back()
    },
    async sendCode(e) {
      e.preventDefault()
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求,获取验证码
        const res = await sendCode(this.mobile)
        console.log(res)
        // 显示倒计时
        this.isShowCountDown = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    },
    // 登录
    async login() {
      this.$toast.loading({
        message: '加载中...',
        // loading时,禁止点击页面
        forbidClick: true
      })

      try {
        const res = await login(this.mobile, this.code)
        console.log(res)

        // 存储token
        this.$store.commit('setUser', res.data.data)

        // 成功提示
        this.$toast.success('登录成功')

        // 跳转
        this.$router.push('/My')
      } catch (error) {
        console.log(error)
        // 拿到状态码
        const status = error.response.status

        // 默认失败消息
        let message = '登录错误,请刷新'

        if (status === 400) {
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
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
