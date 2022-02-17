<template>
  <div class="song-container">
    <div class="song-header">
      <span class="title" v-for="(tab,i) in songTab" :key="i" :class="{'active': currentTab === i}" @click="changeTab(i)">{{tab}}</span>
      <span class="more"><CaretRightOutlined/>更多</span>
    </div>
    <div class="song-wrapper" ref="wrapper">
      <div class="song-content" ref="content">
        <div class="song-list" v-for="(list, i) in newSongList" :key="i">
          <div class="song-item" v-for="(item, i) in list.resources" :key="i" @click="playMusic(item)">
            <div class="song-img">
              <img v-lazy="item.uiElement.image.imageUrl" alt="">
              <CaretRightOutlined/>
            </div>
            <div class="song-info">
              <div class="info-base" :class="{'nodesc': !item.uiElement.subTitle}">
                <span class="info-name">{{item.uiElement.mainTitle.title}}</span>
                <span v-if="item.resourceExtInfo && item.resourceExtInfo.artists">- {{getAuthor(item.resourceExtInfo.artists)}}</span>
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
import { ref, reactive, onMounted, computed, toRefs, defineComponent } from "vue";
import { getAuthor, playMusic, initScroll } from "@/assets/ts/common";
export default defineComponent({
  name: 'IndexNewSong',
  props:{
    data: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
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
      initScroll(650, newSongList.value.length, content, wrapper)
    })

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

    // 切换tab重新初始化滚动插件
    const changeTab = (i) => {
      currentTab.value=i
      initScroll(600, newSongList.value.length, content, wrapper)
    }

    // 播放音乐
    function playMusicParams(item) {
      const songInfo = {
        id: item.resourceId,
        imageUrl: item.uiElement.image.imageUrl,
        title: item.uiElement.mainTitle.title,
        authors: getAuthor(item.resourceExtInfo.artists)
      }
      playMusic(songInfo)
    }

    return {
      songList,
      songTab,
      wrapper,
      content,
      currentTab,
      songheader,
      newSongList,
      changeTab,
      getAuthor,
      playMusic: playMusicParams
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/mixin.scss';
.song-container{
  font-size: 14px;
  background: #fff;
  border-radius: 10px;
  padding: .3125rem 0 .3125rem;
  margin-bottom: .625rem;
  .song-header{
    position: relative;
    margin: .3125rem .5rem;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-right: .3125rem;
      border-right: 1px solid #ccc;
      padding-right: .3125rem;
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
      padding: .0625rem .125rem;
      border-radius: 30px;
      border: 1px solid #ccc;
      background: #fff;
      transform: translateY(-50%);     
    }
  }
  .song-wrapper{
    // width: calc(100vh-.625rem);
    // box-sizing: border-box;
    margin: 0 .5rem;
    padding-bottom: 1rem;
    overflow: hidden;
    .song-content{
      touch-action: none;
      // overflow: hidden;
      .song-list{
        position: relative;
        display: inline-block;
        height: 1rem;
        margin-bottom: .625rem;
        width: 300px;
        .song-item{
          position: relative;
          display: flex;
          align-items: center;
          height: 1.25rem;
          box-sizing: border-box;
          padding: 10px;
          margin-bottom: 20px;
          .song-img{
            position: relative;
            border-radius: 5px;
            width: 1rem;
            height: 1rem;
            margin-right: .3125rem;
            img{
              vertical-align: middle;
              border-radius: 5px;
              width: 100%;
              height: 100%;
            }
            .anticon-caret-right{
              font-size: 16px;
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
            height: 1.25rem;
            width: calc(100% - 120px);
            .info-base {
              // font-size: 24px;
              color: #9A9A9A;
              @include ellipsis;
              span{
                display: inline-block;
              }
              .info-name {
                color: #000;
                // font-size: 32px;
              }
              &.nodesc {
                margin-top: .3125rem;
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
