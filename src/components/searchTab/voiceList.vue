<template>
  <div class="voiceList-wrap">
    <div class="voiceList-item" v-for="item in dataList" :key="item.id">
      <div class="item-img">
        <img v-lazy="item.coverImgUrl + '?param=50y50'" alt="歌单图片" />
      </div>
      <div class="item-info">
        <div class="info-title">{{ item.name }}</div>
        <div class="info-desc">
          {{ item.trackCount }}首，by {{ item.creator.nickname }}，播放{{
            formatCount(item.playCount)
          }}次
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { formatCount } from '@/assets/ts/common'
  export default defineComponent({
    name: 'voiceList',
    props: {
      dataList: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      return {
        formatCount,
      }
    },
  })
</script>

<style scoped lang="scss">
  .voiceList-wrap {
    .voiceList-item {
      display: flex;
      align-items: center;
      height: 1.5rem;
      margin-bottom: 0.3125rem;
      .item-img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 5px;
        margin-right: 0.3125rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .item-info {
        flex: 1;
        width: 240px;
        .info-title {
          @include ellipsis;
        }
        .info-desc {
          font-size: 10px;
          color: #999;
          @include ellipsis;
        }
      }
    }
  }
</style>
