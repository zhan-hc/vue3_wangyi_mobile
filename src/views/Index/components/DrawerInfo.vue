<template>
  <div class="info-wrap">
    <div class="person-info" v-if="userInfo">
      <a-avatar size="large" :src="userInfo.avatarUrl" />
      <span @click="handleJump">{{ userInfo.nickname ? userInfo.nickname + ' >' : '请登录' }}</span>
      <i class="iconfont icon-saoma"></i>
    </div>
    <div class="info-vip">
      <div class="content-top">
        <div class="main">开通黑胶VIP</div>
        <div>立享超17项专属特权 ></div>
        <div class="content-right">会员中心</div>
      </div>
      <div class="content-bottom">
        <div>限时特惠！黑胶首月仅0.88元！</div>
      </div>
    </div>
    <div class="info-list" v-for="(list, i) in info.list" :key="i">
      <div class="list-title" v-if="list.title">{{ list.title }}</div>
      <div
        class="list-item"
        v-for="item in list.data"
        :key="item.id"
        :class="{ borderBom: i === 0 }"
      >
        <span class="item-icon iconfont" :class="item.icon"></span>
        <span class="item-text">{{ item.text }}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="info-close">关闭云音乐</div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { reactive, ref, defineEmits } from 'vue'
  import { list } from '@/assets/ts/drawerData'
  import useRouteFun from '@/hooks/router/useRouteFun'

  const store = useStore()
  const {handleRouterJump} = useRouteFun()
  const info = reactive({
    list: list,
  })
  const userInfo = ref(store.state.userInfo)

  const handleJump = () => {
    if (!userInfo.value.nickname) {
      handleRouterJump('/login')
    }
  }
</script>

<style scoped lang="scss">
  .info-wrap {
    // font-size: 24px;
    .person-info {
      position: relative;
      // font-size: 28px;
      margin-bottom: .3125rem;
      .ant-avatar {
        width: .75rem;
        height: .75rem;
        margin-right: .3125rem;
      }
      span {
        font-weight: bold;
      }
      .icon-saoma {
        position: absolute;
        top: 50%;
        right: .3125rem;
        transform: translateY(-50%);
        font-weight: bold;
        font-size: 18px;
      }
    }
    .info-vip {
      padding: .3125rem .3125rem;
      border-radius: 20px;
      box-sizing: border-box;
      background-image: linear-gradient(to right, #8c8c8c, #b6b6b6);
      color: #d2d2d2;
      margin-bottom: .3125rem;
      .content-top {
        font-size: 14px;
        position: relative;
        padding-bottom: .3125rem;
        border-bottom: 1px solid #d2d2d2;
        .main {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
        .content-right {
          font-size: 10px;
          color: #fff;
          position: absolute;
          top: .125rem;
          right: 0;
          padding: .0625rem .125rem;
          border: 1px solid #fff;
          border-radius: 30px;
        }
      }
      .content-bottom {
        padding-top: .3125rem;
      }
    }
    .info-list {
      font-size: 16px;
      background: #fff;
      border-radius: 10px;
      margin-bottom: .3125rem;
      .list-title {
        // font-size: 24px;
        color: #989898;
        padding: .25rem 0 .25rem .25rem;
        border-bottom: 1px solid #ccc;
      }
      .list-item {
        position: relative;
        margin-left: .3125rem;
        display: flex;
        align-items: center;
        // line-height: 100px;
        box-sizing: border-box;
        height: 1rem;
        &.borderBom {
          margin-left: .3125rem;
          padding-left: 0;
          border-bottom: 1px solid #ccc;
          &:last-child{
            border: none;
          }
        }
        .item-icon {
          // font-size: 48px;
          margin-right: .3125rem;
        }
        .item-text {
          // font-size: 30px;
          vertical-align: top;
        }
        .van-icon-arrow {
          color: #ccc;
          position: absolute;
          right: .3125rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .info-close {
      padding: .3125rem 0;
      border-radius: .3125rem;
      color: #dc2c1f;
      background: #fff;
      text-align: center;
      // font-size: 32px;
    }
  }
</style>
