<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    :style="popStyle"
    @click-overlay="$emit('update:show', false)"
  >
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <div class="title">当前播放</div>
        <div
          class="song-item"
          v-for="(item, i) in currentPlayList"
          :key="item.id"
        >
          <div class="item-info">
            <span>{{ item.title }}</span> - <span>{{ item.title }}</span>
          </div>
          <van-icon name="cross" @click="deletePlaylist(i)" />
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="title">上次播放</div>
        <div
          class="song-item"
          v-for="(item, i) in currentPlayList"
          :key="item.id"
        >
          <div class="item-info">
            <span>{{ item.title }}</span> - <span>{{ item.title }}</span>
          </div>
          <van-icon name="cross" @click="deletePlaylist(i)" />
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="title">历史播放</div>
        <div
          class="song-item"
          v-for="(item, i) in currentPlayList"
          :key="item.id"
        >
          <div class="item-info">
            <span>{{ item.title }}</span> - <span>{{ item.title }}</span>
          </div>
          <van-icon name="cross" @click="deletePlaylist(i)" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </van-popup>
</template>

<script lang="ts">
  import { useStore } from 'vuex'
  import { defineComponent, reactive, toRefs, computed } from 'vue'

  export default defineComponent({
    name: 'playListPopup',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    setup(props, context) {
      const store = useStore()
      const currentPlayList: any = computed(() => store.state.currentPlayList)
      const popStyle = {
        height: '60%',
        margin: '.3125rem',
        width: '9.4rem',
        background: '#fff',
        'border-radius': '20px',
      }
      const handleClick = () => {
        context.emit('update:show', false)
      }

      const deletePlaylist = (i: number) => {
        store.commit(
          'setCurrentPlayList',
          currentPlayList.value.splice(i - 1, 1)
        )
      }
      return {
        popStyle,
        deletePlaylist,
        currentPlayList,
      }
    },
  })
</script>

<style scoped lang="scss">
  .my-swipe .van-swipe-item {
    font-size: 20px;
    background-color: #fff;
    padding: 0.3125rem;
    .song-item {
      display: flex;
      align-items: center;
      height: 1rem;
      .item-info {
        flex: 1;
        span {
          font-size: 14px;
          width: 240px;
          @include ellipsis;
          &:last-child {
            font-size: 10px;
            color: #999;
          }
        }
      }
    }
  }
</style>
