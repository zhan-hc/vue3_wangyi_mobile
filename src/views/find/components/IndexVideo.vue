<template>
  <div class="video-container">
    <div class="video-header">
      <span class="title">{{videoheader.subTitle.title}}</span>
      <span class="more">{{videoheader.button.text}}></span>
    </div>
    <div class="video-wrapper" ref="wrapper">
      <div class="video-content" ref="content">
        <div class="video-item" v-for="item in videoList" :key="item.creativeId">
          <div class="video-img">
            <img :src="item.resource.mlogExtVO.song.coverUrl" alt="">
            <CaretRightOutlined/>
          </div>
          <div class="video-playCount">
            <CaretRightOutlined/>
            {{formatCount(item.resource.mlogExtVO.playCount)}}
          </div>
          <div class="video-name">{{item.resource.mlogBaseData.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import BScroll from "better-scroll";
import { formatCount } from "@/assets/js/common";
export default {
  name: 'IndexVideo',
  props: {
    videoInfo: {
      type: Object
    }
  },
  setup (props) {
    const videoList = reactive(props.videoInfo.extInfo)
    const videoheader = reactive(props.videoInfo.uiElement)
    const wrapper = ref(null)
    const content = ref(null)
    onMounted(() => {
      let recWidth = 170 // icon宽度
      let margin = 30 // margin-right
      let width = ((recWidth + margin) * videoList.length)/2
      content.value.style.width = width + 'px' // 给container设置了宽度
      new BScroll(wrapper.value, {
        click: true,
        scrollX: true,
        bounce: true,
        eventPassthrough: 'vertical'
      })
    })
    return {
      content,
      wrapper,
      videoList,
      formatCount,
      videoheader
    }
  }
}
</script>

<style scoped lang="scss">
.video-container{
  font-size: 24px;
  background: #fff;
  padding: 20px 0;
  border-radius: 20px;
  // margin-bottom: 150px;
  .video-header{
    position: relative;
    margin: 20px 30px;
    .title {
      font-size: 36px;
      font-weight: bold;
    }
    .more{
      position: absolute;
      right: 0;
      top: 50%;
      padding: 5px 15px;
      border-radius: 30px;
      border: 1px solid #ccc;
      background: #fff;
      transform: translateY(-50%);     
    }
  }
  .video-wrapper{
    width: 720px;
    box-sizing: border-box;
    margin: 0 30px;
    padding-bottom: 20px;
    overflow: hidden;
    .video-content{
      touch-action: none;
      .video-item{
        position: relative;
        display: inline-block;
        margin-right: 30px;
        width: 170px;
        vertical-align: top;
        .video-img{
          position: relative;
          border-radius: 10px;
          width: 170px;
          height: 200px;
          margin-bottom: 10px;
          .anticon-caret-right{
            position: absolute;
            bottom: 10px;
            right: 10px;
            padding: 10px;
            border-radius: 50%;
            background: rgba($color: #fff, $alpha: 0.3);
            color: #fff;
          }
          img{
            vertical-align: middle;
            border-radius: 10px;
            width: 100%;
            height: 100%;
          }
        }
        .video-playCount{
          position: absolute;
          top: 5px;
          right: 5px;
          color: #fff;
          padding: 5px 10px;
          background: rgba($color: #000, $alpha: 0.3);
          border-radius: 30px;
          transform: scale(0.9);
        }
        .video-name{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    
  }  
}

</style>
