<template>
  <div class="drawer">
    <div class="drawer__person" v-if="userInfo">
      <a-avatar size="large" :src="userInfo.avatarUrl" />
      <span @click="handleJump">{{
        userInfo.nickname ? userInfo.nickname + ' >' : '请登录'
      }}</span>
      <i class="iconfont icon-saoma"></i>
    </div>
    <div class="drawer__vip">
      <div class="drawer__vip--top">
        <div class="drawer__vip--main">开通黑胶VIP</div>
        <div>立享超17项专属特权 ></div>
        <div class="drawer__vip--right">会员中心</div>
      </div>
      <div class="drawer__vip--bottom">
        <div>限时特惠！黑胶首月仅0.88元！</div>
      </div>
    </div>
    <div class="drawer__set-list" v-for="(list, i) in setuplist" :key="i">
      <div class="drawer__title" v-if="list.title">{{ list.title }}</div>
      <div
        class="drawer__set-item"
        v-for="item in list.data"
        :key="item.id"
        :class="{ 'drawer__set-item--border-bom': i === 0 }"
      >
        <span class="drawer__set-item__icon iconfont" :class="item.icon"></span>
        <span class="drawer__set-item__text">{{ item.text }}</span>
        <span v-if="item.type === 'switch'">
          <a-switch
            v-model:checked="themeChecked"
            @change="handleChangeTheme"
          />
        </span>
        <van-icon v-else name="arrow" />
      </div>
    </div>
    <div class="drawer__close">关闭云音乐</div>
  </div>
</template>

<script lang="ts">
  import { useStore } from 'vuex'
  import { reactive, ref, defineEmits } from 'vue'
  import { list } from '@/assets/ts/drawerData'
  import useRouteFun from '@/hooks/router/useRouteFun'
  import { toRefs } from '@vueuse/shared'
  export default {
    setup() {
      const store = useStore()
      const { handleRouterJump } = useRouteFun()
      const state = reactive({
        setuplist: list,
        themeChecked: store.state.setupInfo.isThemeDrak,
        userInfo: store.state.userInfo,
      })

      const handleChangeTheme = (check: boolean) => {
        localStorage.setItem(
          'wangyi_setupInfo',
          JSON.stringify({
            isThemeDrak: check,
          })
        )
        window.document.documentElement.setAttribute(
          'data-theme',
          check ? 'dark' : 'light'
        )
      }
      const handleJump = () => {
        if (!state.userInfo.nickname) {
          handleRouterJump('/login')
        }
      }
      return {
        ...toRefs(state),
        handleJump,
        handleChangeTheme,
      }
    },
  }
</script>

<style scoped lang="scss">
  .drawer {
    // font-size: 24px;
    @include background_color('background_color1');
    .drawer__person {
      position: relative;
      // font-size: 28px;
      margin-bottom: 0.3125rem;
      .ant-avatar {
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.3125rem;
      }
      span {
        font-weight: bold;
      }
      .icon-saoma {
        position: absolute;
        top: 50%;
        right: 0.3125rem;
        transform: translateY(-50%);
        font-weight: bold;
        font-size: 18px;
      }
    }
    .drawer__vip {
      padding: 0.3125rem 0.3125rem;
      border-radius: 20px;
      box-sizing: border-box;
      background-image: linear-gradient(to right, #8c8c8c, #b6b6b6);
      color: #d2d2d2;
      margin-bottom: 0.3125rem;
      &--top {
        font-size: 14px;
        position: relative;
        padding-bottom: 0.3125rem;
        border-bottom: 1px solid #d2d2d2;
        &--main {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
        &--right {
          font-size: 10px;
          color: #fff;
          position: absolute;
          top: 0.125rem;
          right: 0;
          padding: 0.0625rem 0.125rem;
          border: 1px solid #fff;
          border-radius: 30px;
        }
      }
      &--bottom {
        padding-top: 0.3125rem;
      }
    }
    .drawer__set-list {
      font-size: 16px;
      @include background_color('background_color1');
      border-radius: 10px;
      margin-bottom: 0.3125rem;
      .drawer__title {
        // font-size: 24px;
        color: #989898;
        padding: 0.25rem 0 0.25rem 0.25rem;
        border-bottom: 1px solid #ccc;
      }
      .drawer__set-item {
        position: relative;
        margin-left: 0.3125rem;
        display: flex;
        align-items: center;
        // line-height: 100px;
        box-sizing: border-box;
        height: 1rem;
        &--border-bom {
          margin-left: 0.3125rem;
          padding-left: 0;
          border-bottom: 1px solid #ccc;
          &:last-child {
            border: none;
          }
        }
        .drawer__set-item__icon {
          margin-right: 0.3125rem;
        }
        .drawer__set-item__text {
          vertical-align: top;
        }
        .van-icon-arrow,
        .ant-switch {
          color: #ccc;
          position: absolute;
          right: 0.3125rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .drawer__close {
      padding: 0.3125rem 0;
      border-radius: 0.3125rem;
      color: #dc2c1f;
      background: #fff;
      @include background_color('background_color1');
      text-align: center;
    }
  }
</style>
