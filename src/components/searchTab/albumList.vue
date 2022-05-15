<template>
  <div class="albumList-wrap">
    <div class="albumList-item" v-for="item in dataList" :key="item.id">
      <div class="item-img">
        <img v-lazy="item.picUrl + '?param=50y50'" alt="专辑图片" />
      </div>
      <div class="item-info">
        <div class="info-title">
          <span v-html="highLightStr(item.name, keywords)"></span>
          <span v-if="item.alias.length" class="item-desc">{{
            `（${item.alias[0]}）`
          }}</span>
        </div>
        <div class="info-desc">{{ getAuthor(item.artists) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { formatCount, highLightStr, getAuthor } from '@/assets/ts/common'
  export default defineComponent({
    name: 'albumList',
    props: {
      dataList: {
        type: Array,
        default: () => [],
      },
      keywords: {
        type: String,
        default: () => '',
      },
    },
    setup(props) {
      return {
        getAuthor,
        formatCount,
        highLightStr,
      }
    },
  })
</script>

<style scoped lang="scss">
  .albumList-wrap {
    .albumList-item {
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
