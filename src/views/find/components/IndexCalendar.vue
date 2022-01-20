<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <span class="title">{{calendarheader.subTitle.title}}</span>
      <span class="more">{{calendarheader.button.text}}></span>
    </div>
    <div class="calendar-content">
      <div class="calendar-desc">
        <p>领取你的今日好运</p>
        <p>查看运势解读 ></p>
      </div>
      <div class="calendar-item" v-for="item in calendarList" :key="item.creativeId">
        <div class="item-left">
          <span>今天</span>
          <span class="item-tag" v-for="(tag, i) in item.resources[0].uiElement.labelTexts" :key="i">
            {{tag}}
          </span>
          <div class="item-title">{{item.resources[0].uiElement.mainTitle.title}}</div>
        </div>
        <img :src="item.resources[0].uiElement.image.imageUrl" alt="">

        <!-- <div class="calendar-img">
          <img :src="item.uiElement.image.imageUrl" alt="推荐歌单">
        </div>
        <div class="calendar-playCount">
          <CaretRightOutlined/>
          {{formatCount(.resourceExtInfo.playCount)}}
        </div>
        <div class="calendar-name">{{item.resources[0].uiElement.mainTitle.title}}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "vue";
import BScroll from "better-scroll";
import { formatCount } from "@/assets/ts/common";
export default {
  name: 'Recommend',
  props: {
    data: {
      type: Object
    }
  },
  setup (props) {
    const calendarList = reactive(props.data.creatives)
    const calendarheader = reactive(props.data.uiElement)
    const wrapper = ref(null)
    const content = ref(null)
    return {
      content,
      wrapper,
      calendarList,
      formatCount,
      calendarheader
    }
  }
}
</script>

<style scoped lang="scss">
.calendar-container{
  font-size: 24px;
  background: #fff;
  padding: 20px 0;
  margin-bottom: 20px;
  .calendar-header{
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
  .calendar-content{
    box-sizing: border-box;
    margin: 0 30px;
    .calendar-desc{
      display: flex;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-bottom: 10px;
      P{
        padding: 10px;
        margin: 0;
        &:first-child{
          flex: 1;
        }
        &:last-child{
          color: #808080;
        }
      }
    }
    .calendar-item{
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom: none
      }
      .item-left{
        flex: 1;
        span{
          color: #ccc;
          margin-right: 15px;
        }
        .item-tag{
          color: #FFD700;
        }
        .item-title{
        font-size: 26px;
        margin-top: 5px;
        width: 540px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      }
      img{
        width: 80px;
        height: 80px;
        border-radius: 10px;
      }
    }
  }  
}

</style>
