<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <span class="title">{{ calendarheader.subTitle.title }}</span>
      <span class="more">{{ calendarheader.button.text }}></span>
    </div>
    <div class="calendar-content">
      <div class="calendar-desc">
        <p>领取你的今日好运</p>
        <p>查看运势解读 ></p>
      </div>
      <div
        class="calendar-item"
        v-for="item in calendarList"
        :key="item.creativeId"
      >
        <div class="item-left">
          <span>今天</span>
          <span
            class="item-tag"
            v-for="(tag, i) in item.resources[0].uiElement.labelTexts"
            :key="i"
          >
            {{ tag }}
          </span>
          <div class="item-title">
            {{ item.resources[0].uiElement.mainTitle.title }}
          </div>
        </div>
        <img
          v-lazy="item.resources[0].uiElement.image.imageUrl + '?param=50y50'"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, onMounted, defineComponent } from 'vue'
  import { formatCount } from '@/assets/ts/common'
  export default defineComponent({
    name: 'IndexCalendar',
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    setup(props) {
      const calendarList = reactive(props.data.creatives)
      const calendarheader = reactive(props.data.uiElement)

      return {
        calendarList,
        calendarheader,
      }
    },
  })
</script>

<style scoped lang="scss">
  .calendar-container {
    font-size: 14px;
    @include background_color('background_color1');
    padding: 0.3125rem 0;
    margin-bottom: 0.3125rem;
    border-radius: 10px;
    .calendar-header {
      position: relative;
      margin: 0.3125rem 0.3125rem;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .more {
        position: absolute;
        right: 0;
        top: 50%;
        padding: 0.0625rem 0.3125rem;
        border-radius: 30px;
        border: 1px solid #ccc;
        @include background_color('background_color1');
        transform: translateY(-50%);
      }
    }
    .calendar-content {
      box-sizing: border-box;
      margin: 0 30px;
      .calendar-desc {
        display: flex;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-bottom: 0.3125rem;
        P {
          padding: 10px;
          margin: 0;
          &:first-child {
            flex: 1;
          }
          &:last-child {
            color: #808080;
          }
        }
      }
      .calendar-item {
        display: flex;
        align-items: center;
        padding: 0.125rem;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border-bottom: none;
        }
        .item-left {
          flex: 1;
          span {
            color: #ccc;
            margin-right: 0.3125rem;
          }
          .item-tag {
            color: #ffd700;
          }
          .item-title {
            // font-size: 26px;
            margin-top: 0.125rem;
            width: 240px;
            @include ellipsis;
          }
        }
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 5px;
        }
      }
    }
  }
</style>
