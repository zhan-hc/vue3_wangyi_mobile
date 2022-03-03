<template>
  <div class="song-container">
    <div class="song-header">
      <span class="title">{{songheader.subTitle.title}}</span>
      <span class="more" @click="playAllMusic"><van-icon name="play" />{{songheader.button.text}}</span>
    </div>
    <div class="song-wrapper" ref="wrapper">
      <div class="song-content" ref="content">
        <div class="song-list" v-for="(list, i) in songList" :key="i">
          <div class="song-item" v-for="(item, i) in list.resources" :key="i" @click="playMusic(item)">
            <div class="song-img">
              <img v-lazy="item.uiElement.image.imageUrl + '?param=50y50'" alt="">
              <van-icon name="play" />
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

<script>
import { ref, reactive, onMounted, defineComponent } from "vue";
import { getAuthor, playMusic, initScroll } from "@/assets/ts/common";
import { useStore } from 'vuex'
export default defineComponent({
  name: 'IndexSong',
  props:{
    data: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const store = useStore()
    const songList = reactive(props.data.creatives)
    const songheader = reactive(props.data.uiElement)
    const wrapper = ref(null)
    const content = ref(null)

    onMounted(() => {
      initScroll(600, songList.length, content, wrapper)
    })

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

    function playAllMusic () {
      const songLists = songList.map(item => item.resources).flat(Infinity).map(item => {
        return {
          id: item.resourceId,
          imageUrl: item.uiElement.image.imageUrl,
          title: item.uiElement.mainTitle.title,
          authors: getAuthor(item.resourceExtInfo.artists)
        }
      })
      store.commit('setCurrentPlayList', songLists)
      playMusic(songLists[0])
    }

    return {
      songList,
      songheader,
      wrapper,
      content,
      getAuthor,
      playAllMusic,
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
    }
    .more{
      position: absolute;
      right: 0;
      top: 50%;
      padding: .0625rem .125rem;
      border-radius: 10px;
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
        width: 300px;
        margin-bottom: .625rem;
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
            .van-icon-play{
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
