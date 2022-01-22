<template>
  <div class="live-container">
    <div class="live-header">
      <span class="title">{{liveheader.subTitle.title}}</span>
      <span class="more">{{liveheader.button.text}}></span>
    </div>
    <div class="live-wrapper" ref="wrapper">
      <div class="live-content" ref="content">
        <div class="live-item" v-for="item in liveList" :key="item.anchorId">
          <div class="live-img">
            <img :src="item.cover" alt="">
          </div>
          <div class="live-playCount">
            <i class="iconfont icon-fire"></i>
            {{formatCount(item.popularity)}}·{{item.coverTag}}
          </div>
          <div class="live-name">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRefs } from "vue";
import BScroll from "better-scroll";
import { formatCount } from "@/assets/ts/common";

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    }
  })

  const wrapper = ref(null)
  const content = ref(null)
  const state = reactive({
    liveList: props.data.extInfo,
    liveheader: props.data.uiElement
  })

  onMounted(() => {
    let recWidth = 200 // icon宽度
    let margin = 30 // margin-right
    let width = ((recWidth + margin) * liveList.length)/2
    content.value.style.width = width + 'px' // 给container设置了宽度
    new BScroll(wrapper.value, {
      click: true,
      scrollX: true,
      bounce: true,
      eventPassthrough: 'vertical'
    })
  })

</script>

<style scoped lang="scss">
@import '@/assets/scss/mixin.scss';
.live-container{
  font-size: 24px;
  background: #fff;
  padding: 20px 0;
  border-radius: 20px;
  margin-bottom: 20px;
  .live-header{
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
  .live-wrapper{
    width: 720px;
    box-sizing: border-box;
    margin: 0 30px;
    padding-bottom: 20px;
    overflow: hidden;
    .live-content{
      touch-action: none;
      .live-item{
        position: relative;
        display: inline-block;
        margin-right: 30px;
        width: 200px;
        vertical-align: top;
        .live-img{
          position: relative;
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
        .live-playCount{
          position: absolute;
          top: 5px;
          right: 5px;
          max-width: 190px;
          color: #fff;
          padding: 5px 10px;
          background: rgba($color: #000, $alpha: 0.3);
          border-radius: 30px;
          transform: scale(0.9);
          @include ellipsis;
          .icon-fire{
            color: red;
          }
        }
        .live-name{
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
