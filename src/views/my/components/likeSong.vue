<template>
  <div class="likesong-wrap">
    <div class="song-img">
      <img src="https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg" alt="">
      <div><i class="iconfont icon-ziyuan1"></i></div>
    </div>
    <div class="song-info">
      <div class="info-title">我喜欢的音乐</div>
      <div class="info-num">48首</div>
    </div>
    <div class="song-heart">
      <i class="iconfont icon-xindong"></i>
      心动模式
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  name: '',
  components: {
  },
  setup (props, context) {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.likesong-wrap{
  display: flex;
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  font-size: 24px;
  margin-bottom: 30px;
  .song-img{
    position: relative;
    width: 90px;
    height: 90px;
    margin-right: 30px;
    img{
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
    div{
      position: absolute;
      top: 0;
      left: 0;
      background: rgba($color: #000, $alpha: 0.4);
      width: 90px;
      height: 90px;
      border-radius: 10px;
      .icon-ziyuan1{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
      }
    }
  }
  .song-info{
    flex: 1;
    .info-title{
      font-size: 28px;
    }
    .info-num{
      color: #ccc;
    }
  }
  .song-heart{
    height: 45px;
    border: 1px solid #ccc;
    padding: 3px 10px;
    border-radius: 20px;
    margin-top: 22px;
  }
}
</style>
