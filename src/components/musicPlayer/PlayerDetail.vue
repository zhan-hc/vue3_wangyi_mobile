<template>
  <div class="playerDetail-wrap">
    <div class="player-header">
      <i class="iconfont icon-bottom" @click="handleClose"></i>
      <div class="song-info">
        <div class="song-name">{{songInfo.title}}</div>
        <div class="song-author">{{songInfo.authors}}</div>
      </div>
      <i class="iconfont icon-fenxiangpt"></i>
    </div>
    <div class="player-content">
      <div class="content-wrap" v-show="status" @click="status = !status">
        <img class="content-needle" src="@/assets/images/needle.png" alt="" :class="playStatus ? 'play': 'paused'"/>
        <div class="content-disc" :style="{'animation-play-state' : playStatus ? 'running' : 'paused'}">
          <img
            :src="songInfo.imageUrl"
            alt=""
          />
        </div>
      </div>
      <div class="content-wrap"  v-show="!status" style="padding-bottom: 200px"  @click="status = !status" ref="lyricWrap">
        <div 
          :key="i"
          class="content-lyric"
          v-for="(item, i) in currentLyric" 
          :class="{'active': (curPlayIndex === -1 ? currentLyric.length - 1 : curPlayIndex) - 1 === i}"
          :ref="`lyric${i}`"
        >
          {{item.lyric}}
        </div>
      </div>
    </div>
    <div class="player-operate">
      <div class="icon-list">
        <i
          class="iconfont"
          v-for="item in iconList"
          :key="item.id"
          :class="item.icon"
        ></i>
      </div>
      <div class="song-progress">
        <span class="progress-start">{{afterTime}}</span>
        <van-slider v-model="currentTime" active-color="#fff" inactive-color="#b3b3b3" :min="0" :max="songInfo.sumTime" @change="changeProgress" @drag-end="changeProgress">
          <template #button>
            <div class="progress-spot"></div>
          </template>
        </van-slider>
        <span>{{songInfo.duration || '00:00'}}</span>
      </div>
      <div class="song-operate">
        <i class="iconfont icon-list-loop"></i>
        <i class="iconfont icon-shangyiqu-wangyiicon"  @click="nextOrPrevPlay(1)"></i>
        <i class="iconfont" :class="playStatus ? 'icon-bofang3' : 'icon-zanting'"  @click="changePlayStatus()"></i>
        <i class="iconfont icon-shangyiqu" @click="nextOrPrevPlay(2)"></i>
        <i class="iconfont icon-caidan"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject,computed, ref, watch, getCurrentInstance, nextTick } from 'vue'
  import { iconList, operateList } from '@/assets/ts/playerDetailData'
  import { useStore } from 'vuex'
  import { durationTrans } from "@/assets/ts/common";
  import useAudioFun from '@/hooks/audio/useAudioFun'

  const store = useStore()
  const { songInfo, playStatus, currentPlayList, changePlayStatus, nextOrPrevPlay } = useAudioFun()
  const isShowPlayer = inject('isShowPlayer')
  const currentTime = computed(() => store.state.currentTime)
  const currentLyric = computed(() => store.state.currentLyric)
  const afterTime = computed(() => durationTrans(store.state.currentTime))
  const audioDuration = document.getElementById('musicAudio').duration
  const curPlayIndex = computed(() => currentLyric.value.findIndex((item,i) => item.time >= currentTime.value))
  const status = ref(true)
  const internalInstance = getCurrentInstance()
  const lyricWrap = ref(null)
  // const currentDuration = ref(0)
  watch(curPlayIndex, (newVal,old) => {
      if (!status.value) {
        if (newVal > 7) {
          lyricWrap.value.scrollTop =  newVal * 30 - 200
        } else {
          lyricWrap.value.scrollTop = 0
        }
        
      }
  })
  const handleClose = () => {
    isShowPlayer.value = false
  }

  const changeProgress = (val) => {
    const audio = document.getElementById('musicAudio')
    audio.currentTime = val
  }


</script>

<style scoped lang="scss">
  @import '@/assets/scss/mixin.scss';
  @keyframes play {
    0% {
      transform: rotate(0);
    }
  }
  @keyframes paused {
    0% {
      transform: rotate(30deg);
    }
  }
  @keyframes rotateLP {
    100% {
      width: 206px;
      height: 206px;
      transform: rotate(360deg);
    }
  }
  .playerDetail-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    padding: .3125rem;
    color: #fff;
    font-size: .75rem;
    background: #4F4F4F;
    z-index: 999;
    .player-header {
      display: flex;
      margin-bottom: .3125rem;
      .song-info {
        flex: 1;
        text-align: center;
        letter-spacing: 1px;
        .song-name {
          color: #fff;
          font-size: 16px;
          width: 240px;
          margin: 0 auto;
          @include ellipsis;
        }
        .song-author {
          font-size: 14px;
          width: 240px;
          margin: 0 auto;
          color: #b3b3b3;
          @include ellipsis;
        }
      }
    }
    .player-content {
      text-align: center;
      .content-wrap{
        height: 450px;
        overflow: auto;
        .content-needle {
          margin-left: 2.8rem;
          width: 120px;
          height: 100px;
          &.play{
            transform: rotate(30deg);
            transform-origin: .0625rem .0625rem;
            animation: play 3s linear;
          }
          &.paused{
            transform: rotate(0);
            transform-origin: .0625rem .0625rem;
            animation: paused 3s linear;
          }
        }
        .content-disc {
          position: relative;
          background-image: url(../../assets/images/coverall.png);
          background-position: -140px -580px;
          width: 206px;
          height: 206px;
          margin: 0 auto;
          z-index: -1;
          animation:rotateLP 5s linear infinite;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 135px;
            height: 135px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .content-lyric{
          font-size: 14px;
          margin-bottom: 8px;
          color: #7F7F7F;
          &.active{
            color: #fff;
          }
        }
      }
      
    }
    .player-operate {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .icon-list {
        display: flex;
        .iconfont {
          font-size: 24px;
          flex: 1;
          text-align: center;
          display: block;
        }
      }
      .song-progress {
        display: flex;
        padding: 0 .3125rem;
        color: #b3b3b3;
        font-size: 12px;
        .van-slider{
          margin-top: .2188rem;
          margin-right: .3125rem;
        }
        .progress-start {
          margin-right: .3125rem;
        }
        .progress {
          position: relative;
          flex: 1;
          margin: 0 .3125rem .125rem;
          // border-bottom: 3px solid #b3b3b3;
          &-spot {
            width: .125rem;
            height: .125rem;
            background: #fff;
            border-radius: 50%;
          }
        }
      }
      .song-operate {
        display: flex;
        height: 80px;
        line-height: 80px;
        .iconfont {
          font-size: 24px;
          flex: 1;
          display: block;
          text-align: center;
        }
        .icon-bofang3,.icon-zanting {
          font-size: 40px;
        }
      }
    }
  }
</style>
