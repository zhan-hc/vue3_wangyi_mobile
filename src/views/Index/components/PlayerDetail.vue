<template>
  <div class="playerDetail-wrap">
    <div class="player-header">
      <i class="iconfont icon-bottom" @click="handleClose"></i>
      <div class="song-info">
        <div class="song-name" @click="handleChangeStatus">四块五</div>
        <div class="song-author" @click="handleChangeStatus1">隔壁老樊</div>
      </div>
      <i class="iconfont icon-fenxiangpt"></i>
    </div>
    <div class="player-content">
      <img class="content-needle" src="@/assets/images/needle.png" alt="">
      <div class="content-disc">
        <img src="https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg" alt="">
      </div>
    </div>
    
    <div class="player-operate">
      <div class="icon-list">
        <i class="iconfont" v-for="item in iconList" :key="item.id" :class="item.icon"></i>
      </div>
      <div class="song-progress">
        <span>00:00</span>
        <div class="progress">
          <div class="progress-spot"></div>
        </div>
        <span>04:36</span>
      </div>
      <div class="song-operate">
        <i class="iconfont" v-for="item in operateList" :key="item.id" :class="item.icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, inject } from "vue"
import { iconList, operateList } from "@/assets/ts/playerDetailData";
export default {
  name: 'PlayerDetail',
  setup (props, context) {
    const isShowPlayer = inject('isShowPlayer')
    const handleClose = () => {
      isShowPlayer.value = false
    }
    return {
      status,
      iconList,
      operateList,
      isShowPlayer,
      handleClose,
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/mixin.scss';
@keyframes play {
  0% {
    transform: rotate(0);
  }
  // 100% {
    // transform: rotate(30deg);
    // transform-origin: 10px 10px;
  // }
}
.playerDetail-wrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  padding: 30px;
  color: #fff;
  font-size: 24px;
  background: #ccc;
  .player-header{
    display: flex;
    margin-bottom: 30px;
    .song-info{
      flex: 1;
      text-align: center;
      letter-spacing: 1px;
      .song-name {
        color: #fff;
        font-size: 32px;
        width: 400px;
        margin: 0 auto;
        @include ellipsis;
      }
      .song-author{
        color: #B3B3B3;
      }
    }
    .iconfont{
      font-size: 48px;
    }
  }
  .player-content{
    text-align: center;
    .content-needle{
      margin-left: 250px;
      width: 300px;
      height: 250px;
      transform: rotate(30deg);
      transform-origin: 10px 10px;
      animation:play 3s linear;
    }
    .content-disc{
      position: relative;
      background-image: url(../../../assets/images/disc.png);
      width: 500px;
      height: 500px;
      background-size: cover;
      margin: 0 auto;
      z-index: -1;
      img{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 330px;
        height: 330px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .player-operate{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .icon-list{
      display: flex;
      .iconfont{
        font-size: 48px;
        flex: 1;
        text-align: center;
        display: block;
      }
    }
    .song-progress{
      display: flex;
      padding: 0 30px;
      color: #B3B3B3;
      .progress{
        position: relative;
        flex: 1;
        margin: 0 30px 17px;
        border-bottom: 3px solid #B3B3B3;
        &-spot{
          position: absolute;
          left: 0;
          top: 14px;
          width: 10px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
        }
      }
      
    }
    .song-operate{
      display: flex;
      height: 150px;
      line-height: 150px;
      .iconfont{
        font-size: 48px;
        flex: 1;
        display: block;
        text-align: center;
      }
      .icon-bofang3{
        font-size: 100px;
      }
    }
  }
}
</style>
