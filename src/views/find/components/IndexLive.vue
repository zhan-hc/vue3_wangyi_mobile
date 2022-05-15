<template>
  <div class="live-container">
    <div class="live-header">
      <span class="title">{{ liveheader.subTitle.title }}</span>
      <span class="more">{{ liveheader.button.text }}></span>
    </div>
    <div class="live-wrapper" ref="wrapper">
      <div class="live-content" ref="content">
        <div class="live-item" v-for="item in liveList" :key="item.anchorId">
          <div class="live-img">
            <img v-lazy="item.cover" alt="" />
          </div>
          <div class="live-playCount">
            <i class="iconfont icon-fire"></i>
            {{ formatCount(item.popularity) }}·{{ item.coverTag }}
          </div>
          <div class="live-name">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, onMounted, toRefs, defineComponent } from 'vue'
  import { formatCount, initScroll } from '@/assets/ts/common'

  export default defineComponent({
    name: 'IndexLive',
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    setup(props) {
      const wrapper = ref(null)
      const content = ref(null)
      const state = reactive({
        liveList: props.data.extInfo,
        liveheader: props.data.uiElement,
      })

      onMounted(() => {
        initScroll(230, liveList.length, content, wrapper)
      })
      return {
        wrapper,
        content,
        formatCount,
        ...toRefs(state),
      }
    },
  })
</script>

<style scoped lang="scss">
  .live-container {
    // font-size: 24px;
    @include background_color('background_color1');
    padding: 20px 0;
    border-radius: 20px;
    margin-bottom: 20px;
    .live-header {
      position: relative;
      margin: 20px 30px;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .more {
        position: absolute;
        right: 0;
        top: 50%;
        padding: 5px 15px;
        border-radius: 30px;
        border: 1px solid #ccc;
        @include background_color('background_color1');
        transform: translateY(-50%);
      }
    }
    .live-wrapper {
      width: 720px;
      box-sizing: border-box;
      margin: 0 30px;
      padding-bottom: 20px;
      overflow: hidden;
      .live-content {
        touch-action: none;
        .live-item {
          position: relative;
          display: inline-block;
          margin-right: 30px;
          width: 200px;
          vertical-align: top;
          .live-img {
            position: relative;
            border-radius: 10px;
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
            img {
              vertical-align: middle;
              border-radius: 10px;
              width: 100%;
              height: 100%;
            }
          }
          .live-playCount {
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
            .icon-fire {
              color: red;
            }
          }
          .live-name {
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
