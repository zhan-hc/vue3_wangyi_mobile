<template>
  <div class="player-wrap" @click="handleOpenPlayer" :style="{'bottom': routerPath === '/' ? '1.5rem' : '0'}">
    <div class="player-img">
      <img
        :src="songInfo.imageUrl"
        alt=""
      />
    </div>
    <div class="song-info">
      <span>{{songInfo.title}}</span>
      <span> - {{songInfo.authors}}</span>
    </div>
    <i @click.stop="changePlayStatus" class="iconfont" :class="playStatus ? 'icon-zanting1' : 'icon-bofang1'"></i>
    <i class="iconfont icon-caidan"></i>
  </div>
</template>

<script setup>
  import { ref, reactive, inject, watch, computed } from 'vue'
  import { useStore } from 'vuex'
  import useRouteFun from '@/hooks/router/useRouteFun'
  const store = useStore()
  const { getRoutePath } = useRouteFun()
  const routerPath = computed(() => getRoutePath())
  const songInfo = computed(() => store.state.currentSongInfo)
  const playStatus = computed(() => store.state.currentPlayStatus)
  const isShowPlayer = inject('isShowPlayer')


  const handleOpenPlayer = () => {
    isShowPlayer.value = true
  }

  const changePlayStatus = () => {
    store.commit('changePlayStatus', !store.state.currentPlayStatus)
  }
</script>

<style scoped lang="scss">
  @import '@/assets/scss/mixin.scss';
  .player-wrap {
    position: fixed;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    display: flex;
    height: 1.5rem;
    align-items: center;
    padding: 0 .3125rem;
    border-top: 1px solid #ccc;
    background: #fff;
    z-index: 2;
    // font-size: 24px;
    .player-img {
      position: relative;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      box-sizing: border-box;
      background: #000;
      background: linear-gradient(-45deg, #545454 0%, #000 100%);
      margin: -0.375rem -0.3125rem 0 0;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
      }
    }
    .song-info {
      flex: 1;
      margin-right: .625rem;
      margin-left: .625rem;
      @include ellipsis;
      span {
        font-size: 16px;
        &:last-child {
          font-size: 14px;
          color: #9a9a9a;
        }
      }
    }
    .iconfont {
      font-size: 24px;
    }
    .icon-bofang1,.icon-zanting1 {
      margin-right: .625rem;
    }
  }
</style>
