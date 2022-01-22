<template>
  <div class="videoList-wrap">
    <div class="videoList-item" v-for="item in videoList" :key="item.id">
      <div class="item-img">
        <img :src="item.data.coverUrl" alt="" />
        <div class="item-avatar">
          <img
            v-if="item.data.creator"
            :src="item.data.creator.avatarUrl"
            alt=""
          />
        </div>
        <span class="item-time">{{
          durationTrans(item.data.durationms, 1000)
        }}</span>
      </div>
      <div class="item-title">{{ item.data.title }}</div>
      <div class="item-desc">
        <span
          ><i class="iconfont icon-bofang4"></i
          >{{ formatCount(item.data.playTime) }}</span
        >
        <span
          ><i class="iconfont icon-zan"></i
          >{{ formatCount(item.data.praisedCount) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, onMounted } from 'vue'
  import { village_video } from '@/api/village/index'
  import { formatCount, durationTrans } from '@/assets/ts/common'
  export default {
    name: 'videoList',
    components: {},
    setup(props, context) {
      const videoList = ref({})
      onMounted(() => {
        village_video()
          .then((res) => {
            if (res.code === 200) {
              videoList.value = res.datas
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
      return {
        videoList,
        formatCount,
        durationTrans,
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '@/assets/scss/mixin.scss';
  .videoList-wrap {
    display: flex;
    flex-wrap: wrap;
    font-size: 24px;
    .videoList-item {
      width: 330px;
      height: 540px;
      border-radius: 20px;
      background: #fff;
      margin-right: 20px;
      margin-bottom: 20px;
      box-sizing: border-box;
      &:nth-child(even) {
        margin-right: 0;
      }
      .item-img {
        position: relative;
        height: 380px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px 20px 0 0;
        }
        .item-avatar {
          position: absolute;
          bottom: 20px;
          left: 20px;
          width: 75px;
          height: 75px;
          border-radius: 50%;
          border: 4px solid #fff;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .item-time {
          position: absolute;
          bottom: 10px;
          right: 20px;
          color: #999;
        }
      }
      .item-title {
        padding: 12px 20px;
        font-size: 28px;
        height: 110px;
        box-sizing: border-box;
        @include ellipsisBasic(2);
      }
      .item-desc {
        color: #999;
        transform: scale(0.9);
        span {
          margin-right: 20px;
          .iconfont {
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>
