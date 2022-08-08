<template>
  <div
    class="player-wrap"
    v-if="bottomPlayer"
    @click="handleOpenPlayer"
    :style="{ bottom: routerPath === '/' ? '1.5rem' : '0' }"
  >
    <div class="player-img">
      <img :src="songInfo.imageUrl" alt="" />
    </div>
    <div class="song-info">
      <span>{{ songInfo.title }}</span>
      <span> - {{ songInfo.authors }}</span>
    </div>
    <!-- <i
      @click.stop="changePlayStatus"
      class="iconfont"
      :class="playStatus ? 'icon-zanting1' : 'icon-bofang1'"
    ></i> -->
    <wym-progress
      class="progress"
      type="circle"
      :percentage="(currentTime / songInfo.sumTime) * 100"
      size="32"
      @click.stop="changePlayStatus"
    >
      <wym-icon :name="playStatus ? 'pause' : 'bofang2'" size="12px" />
    </wym-progress>
    <i class="iconfont icon-caidan" @click.stop="show = true"></i>
  </div>
  <playList-Popup v-model:show="show"></playList-Popup>
</template>

<script setup>
  import { ref, inject, watch, computed } from 'vue'
  import { useStore } from 'vuex'
  import useRouteFun from '@/hooks/router/useRouteFun'
  import playListPopup from '@/components/playListPopup.vue'
  import useAudioFun from '@/hooks/audio/useAudioFun'
  const store = useStore()
  const { getRouteMeta, getRoutePath } = useRouteFun()
  const { songInfo, playStatus, changePlayStatus } = useAudioFun()

  const bottomPlayer = computed(() => getRouteMeta('bottomPlayer') !== false)
  const routerPath = computed(() => getRoutePath())
  const currentTime = computed(() => store.state.currentTime)
  const isShowPlayer = inject('isShowPlayer')
  const show = ref(false)

  const handleOpenPlayer = () => {
    isShowPlayer.value = true
  }
</script>

<style scoped lang="scss">
  .player-wrap {
    position: fixed;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    display: flex;
    height: 1.5rem;
    align-items: center;
    padding: 0 0.3125rem;
    border-top: 1px solid #ccc;
    @include background_color('player_nav_color');
    @include font_color('font_color1');
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
      margin-right: 0.625rem;
      margin-left: 0.625rem;
      @include ellipsis;
      span {
        font-size: 16px;
        vertical-align: middle;
        &:last-child {
          font-size: 14px;
          color: #9a9a9a;
        }
      }
    }
    .iconfont {
      font-size: 24px;
    }
    .icon-bofang1,
    .icon-zanting1,
    .progress {
      margin-right: 0.625rem;
    }
  }
</style>
