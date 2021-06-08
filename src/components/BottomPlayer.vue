<template>
  <div class="player-wrap">
    <div class="player-img">
      <img src="https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg" alt="">
    </div>
    <div class="song-info">
      <span>阿拉斯加海湾</span>
      <span> - 袁潇崴</span>
    </div>
    <i class="iconfont icon-bofang1"></i>
    <i class="iconfont icon-xiangqing"></i>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  name: 'BottomPlayer',
  components: {
  },
  setup (props, context) {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.player-wrap{
  position: fixed;
  bottom: 140px;
  left: 0;
  right: 0;
  display: flex;
  height: 120px;
  padding: 0 30px;
  border-top: 1px solid #ccc;
  background: #fff;
  line-height: 120px;
  z-index: 2;
  font-size: 24px;
  .player-img{
    position: relative;
    border-radius: 50%;
    width: 110px;
    height: 110px;
    box-sizing: border-box;
    background: #000;
    background: linear-gradient(-45deg, #545454 0%, #000 100%);
    margin: -10px 20px 0 0;
    img{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }
  }
  .song-info{
    flex: 1;
    margin-right: 70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      font-size: 36px;
      &:last-child {
        font-size: 28px;
        color: #9A9A9A;
      }
    }
  }
  .iconfont{
    font-size: 48px;
  }
  .icon-bofang1{
    margin-right: 50px;
  }
}
</style>
