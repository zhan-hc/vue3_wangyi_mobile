<template>
  <div class="recommend-container">
    <div class="recommend-header">
      <span class="title">{{recommendheader.subTitle.title}}</span>
      <span class="more">{{recommendheader.button.text}}></span>
    </div>
    <div class="recommend-wrapper" ref="wrapper">
      <div class="recommend-content" ref="content">
        <div class="recommend-item" 
          v-for="item in recommendList" 
          :key="item.creativeId" 
          @click="handleClickJump(item.resources[0].resourceId)">
          <div class="recommend-img">
            <img :src="item.uiElement.image.imageUrl" alt="推荐歌单">
          </div>
          <div class="recommend-playCount">
            <i class="iconfont icon-bofang4"></i>
            {{formatCount(item.resources[0].resourceExtInfo.playCount)}}
          </div>
          <div class="recommend-name">{{item.resources[0].uiElement.mainTitle.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps } from "vue";
import BScroll from "better-scroll";
import { useRouter } from "vue-router";
import { formatCount } from "@/assets/ts/common";

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    }
  })
    const recommendList = reactive(props.data.creatives)
    const recommendheader = reactive(props.data.uiElement)
    const wrapper = ref(null)
    const content = ref(null)
    const route = useRouter()

    onMounted(() => {
      let recWidth = 200 // icon宽度
      let margin = 30 // margin-right
      let width = ((recWidth + margin) * recommendList.length)/2
      content.value.style.width = width + 'px' // 给container设置了宽度
      new BScroll(wrapper.value, {
        click: true,
        scrollX: true,
        bounce: true,
        eventPassthrough: 'vertical'
      })
    })

    // 歌单详情跳转
    const handleClickJump = (id) => {
      route.push(`/songListDetail/${id}`)
    }
</script>

<style scoped lang="scss">
.recommend-container{
  font-size: 24px;
  background: #fff;
  padding: 20px 0;
  margin-bottom: 20px;
  .recommend-header{
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
  .recommend-wrapper{
    width: 720px;
    box-sizing: border-box;
    margin: 0 30px;
    padding-bottom: 20px;
    overflow: hidden;
    .recommend-content{
      touch-action: none;
      .recommend-item{
        position: relative;
        display: inline-block;
        margin-right: 30px;
        width: 200px;
        vertical-align: top;
        .recommend-img{
          border-radius: 10px;
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
          img{
            vertical-align: middle;
            border-radius: 10px;
            width: 100%;
            height: 100%;
          }
        }
        .recommend-playCount{
          position: absolute;
          top: 10px;
          right: 10px;
          color: #fff;
          padding: 5px 15px;
          background: rgba($color: #000, $alpha: 0.3);
          border-radius: 30px;
          .icon-bofang4{
            font-size: 22px;
          }
        }
        .recommend-name{
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
