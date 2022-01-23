<template>
  <div class="song-container">
    <div class="song-header">
      <span class="title">{{songheader.subTitle.title}}</span>
      <span class="more"><CaretRightOutlined/>{{songheader.button.text}}</span>
    </div>
    <div class="song-wrapper" ref="wrapper">
      <div class="song-content" ref="content">
        <div class="song-list" v-for="(list, i) in songList" :key="i">
          <div class="song-item" v-for="(item, i) in list.resources" :key="i">
            <div class="song-img">
              <img v-lazy="item.uiElement.image.imageUrl" alt="">
              <CaretRightOutlined/>
            </div>
            <div class="song-info">
              <div class="info-base" :class="{'nodesc': !item.uiElement.subTitle}">
                <span class="info-name">{{item.uiElement.mainTitle.title}}</span>
                 - {{getAuthor(item.resourceExtInfo.artists)}}
              </div>
              <div class="info-desc" v-if="item.uiElement.subTitle">{{item.uiElement.subTitle.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import BScroll from "better-scroll";
import { getAuthor } from "@/assets/ts/common";
  const props = defineProps({
    data: {
      type: Object,
      default: {}
    }
  })

    const songList = reactive(props.data.creatives)
    const songheader = reactive(props.data.uiElement)
    const wrapper = ref(null)
    const content = ref(null)

    onMounted(() => {
      let recWidth = 650 // icon宽度
      let width = (recWidth * songList.length)/2
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
.song-container{
  font-size: 24px;
  background: #fff;
  border-radius: 20px;
  padding: 20px 0 30px;
  margin-bottom: 20px;
  .song-header{
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
  .song-wrapper{
    width: 720px;
    box-sizing: border-box;
    margin: 0 30px;
    padding-bottom: 20px;
    overflow: hidden;
    .song-content{
      touch-action: none;
      overflow: hidden;
      .song-list{
        position: relative;
        display: inline-block;
        height: 330px;
        margin-bottom: 20px;
        width: 650px;
        .song-item{
          position: relative;
          display: flex;
          height: 100px;
          box-sizing: border-box;
          padding: 10px;
          margin-bottom: 20px;
          .song-img{
            position: relative;
            border-radius: 10px;
            width: 100px;
            height: 100px;
            margin-bottom: 10px;
            margin-right: 20px;
            img{
              vertical-align: middle;
              border-radius: 10px;
              width: 100%;
              height: 100%;
            }
            .anticon-caret-right{
              font-size: 48px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              color: rgba($color: #fff, $alpha: 0.8);
            }
          }
          .song-info{
            flex: 1;
            border-bottom: 1px solid #ccc;
            height: 100px;
            width: calc(100% - 120px);
            .info-base {
              font-size: 24px;
              color: #9A9A9A;
              @include ellipsis;
              span{
                display: inline-block;
              }
              .info-name {
                color: #000;
                font-size: 32px;
              }
              &.nodesc {
                margin-top: 20px;
              }
            }
            .info-desc {
               color: #9A9A9A;
            }
          }
        }
      }
    } 
  }  
}

</style>
