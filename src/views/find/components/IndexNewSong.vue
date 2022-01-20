<template>
  <div class="song-container">
    <div class="song-header">
      <span class="title" v-for="(tab,i) in songTab" :key="i" :class="{'active': currentTab === i}" @click="currentTab=i;setSCroll()">{{tab}}</span>
      <span class="more"><CaretRightOutlined/>更多</span>
    </div>
    <div class="song-wrapper" ref="wrapper">
      <div class="song-content" ref="content">
        <div class="song-list" v-for="(list, i) in newSongList" :key="i">
          <div class="song-item" v-for="(item, i) in list.resources" :key="i">
            <div class="song-img">
              <img :src="item.uiElement.image.imageUrl" alt="">
              <CaretRightOutlined/>
            </div>
            <div class="song-info">
              <div class="info-base" :class="{'nodesc': !item.uiElement.subTitle}">
                <span class="info-name">{{item.uiElement.mainTitle.title}}</span>
                <span v-if="item.resourceExtInfo && item.resourceExtInfo.artists">{{getAuthor(item.resourceExtInfo.artists)}}</span>
              </div>
              <div class="info-desc" v-if="item.uiElement.subTitle">{{item.uiElement.subTitle.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import BScroll from "better-scroll";
import { getAuthor } from "@/assets/ts/common";
export default {
  name: 'IndexNewSong',
  props: {
    data: {
      type: Object
    }
  },
  setup (props) {
    const songList = reactive(props.data.creatives)
    const songTab = Object.keys(newSongMap(songList))
    const currentTab = ref(0)
    const songheader = reactive(props.data.uiElement)
    const wrapper = ref(null)
    const content = ref(null)
    const newSongList = computed(() => {
      return newSongMap(songList)[songTab[currentTab.value]]
    })
    onMounted(() => {
      setSCroll()
    })

    // 重新设置bscroll
    function setSCroll () {
      let recWidth = 650 // icon宽度
      let width = (recWidth * newSongList.value.length)/2
      content.value.style.width = width + 'px' // 给container设置了宽度
      new BScroll(wrapper.value, {
        click: true,
        scrollX: true,
        bounce: true,
        eventPassthrough: 'vertical'
      })
    }

    // 将新歌里的数据存入map
    function newSongMap (list) {
      const songObj = {}
      list.forEach(item => {
        const {title} = item.uiElement.mainTitle
        if (!songObj[title]) {
          songObj[title] = []
        }
         songObj[title].push(item)
      });
      return songObj
    }
    return {
      content,
      songTab,
      wrapper,
      songList,
      newSongList,
      currentTab,
      getAuthor,
      setSCroll,
      newSongMap,
      songheader
    }
  }
}
</script>

<style scoped lang="scss">
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
      margin-right: 10px;
      border-right: 1px solid #ccc;
      padding-right: 10px;
      color: #808080;
      &.active{
        color: #000;
      }
      &:last-child{
        border-right: none;
      }
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
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
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
