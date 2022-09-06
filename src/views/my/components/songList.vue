<template>
  <div class="my-song">
    <div class="my-song__tab">
      <div
        class="my-song__tab-item"
        v-for="(item, i) in songTab"
        :key="i"
        @click="handleClick(i)"
      >
        <span :class="{ active: i === activeIndex }">{{ item }}</span>
      </div>
    </div>
    <div class="my-song__create" v-if="mySongList.length">
      <div class="my-song__create-header">
        <span>创建歌单({{ mySongList.length }}个)</span>
        <i class="iconfont icon-plus"></i>
        <i class="iconfont icon-sandian"></i>
      </div>
      <div
        class="my-song__create-song"
        v-for="item in mySongList"
        :key="item.id"
        @click="handleClickJump(item.id)"
      >
        <div class="my-song__create-img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="my-song__create-info">
          <div class="my-song__create-title">{{ item.name }}</div>
          <div class="my-song__create-num">{{ item.trackCount }}首</div>
        </div>
        <i class="iconfont icon-sandian"></i>
      </div>
      <div class="my-song__create-song">
        <div class="my-song__create-import">
          <i class="iconfont icon-daoru"></i>
        </div>
        <div class="my-song__create-info">
          <div class="my-song__create-title" style="line-height: 45px">
            一键导入外部音乐
          </div>
        </div>
      </div>
    </div>
    <div class="my-song__collect" v-if="collectList.length">
      <div class="my-song__collect-header">
        <span>收藏歌单(1个)</span>
        <i class="iconfont icon-sandian"></i>
      </div>
      <div
        class="my-song__collect-song"
        v-for="item in collectList"
        :key="item.id"
        @click="handleClickJump(item.id)"
      >
        <div class="my-song__collect-img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="my-song__collect-info">
          <div class="my-song__collect-title">{{ item.name }}</div>
          <div class="my-song__collect-num">{{ item.trackCount }}首</div>
        </div>
        <i class="iconfont icon-sandian"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
  import { user_playList } from '@/api/user/index'
  import useRouteFun from '@/hooks/router/useRouteFun'
  export default defineComponent({
    name: 'songList',
    setup() {
      const store = useStore()
      const { handleRouterJump } = useRouteFun()
      const state = reactive({
        songTab: ['创建歌单', '收藏歌单', '歌单助手'],
        activeIndex: 0,
        mySongList: [],
        collectList: [], // 收藏歌单
        uid: localStorage.getItem('wangyi_uid'),
      })

      onMounted(async () => {
        if (store.state.uid) {
          const res = await user_playList(state.uid)
          state.mySongList = res.playlist.filter(
            (item) => item.userId === Number(state.uid)
          )
          state.collectList = res.playlist.filter(
            (item) => item.userId !== Number(state.uid)
          )
          console.log(state.mySongList)
        }
      })

      // 歌单详情跳转
      const handleClickJump = (id) => {
        handleRouterJump(`/songListDetail/${id}`)
      }

      const handleClick = (i) => {
        state.activeIndex = i
      }
      return {
        ...toRefs(state),
        handleClick,
        handleClickJump,
      }
    },
  })
</script>

<style scoped lang="scss">
  .my-song {
    font-size: 12px;
    &__tab {
      display: flex;
      margin-bottom: 0.3125rem;
      &-item {
        flex: 1;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        border-right: 1px solid #d0d0d0;
        span {
          &.active {
            border-bottom: 0.125rem solid #ff4e4e;
            border-radius: 2px;
          }
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .my-song__create,
    .my-song__collect {
      background: #fff;
      border-radius: 10px;
      padding: 0.3125rem;
      font-size: 14px;
      margin-bottom: 0.3125rem;
      &-header {
        display: flex;
        color: #999;
        padding-bottom: 0.3125rem;
        span {
          flex: 1;
          // line-height: 60px;
        }
        .iconfont {
          font-size: 20px;
        }
        .icon-plus {
          margin-right: 0.3125rem;
        }
      }
      &-song {
        display: flex;
        margin-bottom: 0.3125rem;
        align-items: center;
        .my-song__collect-img,
        .my-song__create-img {
          position: relative;
          width: 1rem;
          height: 1rem;
          margin-right: 0.3125rem;
          img {
            border-radius: 10px;
            width: 100%;
            height: 100%;
          }
        }
        .my-song__create-import {
          position: relative;
          padding: 0.3125rem;
          width: 1rem;
          height: 1rem;
          border-radius: 10px;
          margin-right: 0.3125rem;
          background: #f3f3f3;
          .icon-daoru {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 15px;
          }
        }
        .my-song__create-info,
        .my-song__collect-info {
          flex: 1;
          width: 240px;
          .my-song__create-title,
          .my-song__collect-title {
            font-size: 14px;
            font-weight: 600;
            @include ellipsis;
          }
          .my-song__create-num,
          .my-song__collect-num {
            color: #999;
          }
        }
        .icon-sandian {
          font-size: 20px;
          color: #999;
          line-height: 1rem;
        }
      }
    }
  }
</style>
