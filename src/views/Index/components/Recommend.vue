<template>
  <div class="reconmmend-container">
    <div class="reconmmend-header">
      <span class="title">推荐歌单</span>
      <span class="more">更多></span>
    </div>
    <div class="reconmmend-wrapper" ref="wrapper">
      <div class="reconmmend-content" ref="content">
        <div class="recommend-item" v-for="item in recommendList" :key="item.id">
          <div class="recommend-img">
            <img :src="item.picUrl" alt="推荐歌单">
          </div>
          <div class="recommend-playCount">
            <CaretRightOutlined/>
            {{formatCount(item.playCount)}}
          </div>
          <div class="recommend-name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import BScroll from "better-scroll";
import { formatCount } from "@/assets/js/common";
export default {
  name: 'Recommend',
  props: {
    recommendList: {
      type: Array
    }
  },
  setup (props) {
    const recommendList = reactive(props.recommendList)
    const wrapper = ref(null)
    const content = ref(null)
    onMounted(() => {
      let recWidth = 200 // icon宽度
      let margin = 30 // margin-right
      let width = ((recWidth + margin) * recommendList.length)/2
      content.value.style.width = width + 'px' // 给container设置了宽度
      new BScroll(wrapper.value, {
        click: true,
        scrollX: true,
        bounce: true,
        eventPassthrough: 'vertical'
      })
    })
    return {
      content,
      wrapper,
      recommendList,
      formatCount
    }
  }
}
</script>

<style scoped lang="scss">
.reconmmend-container{
  font-size: 24px;
  .reconmmend-header{
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
  .reconmmend-wrapper{
    width: 720px;
    box-sizing: border-box;
    margin: 0 30px;
    padding-bottom: 20px;
    overflow: hidden;
    .reconmmend-content{
      touch-action: none;
      .recommend-item{
        position: relative;
        display: inline-block;
        margin-right: 30px;
        width: 200px;
        vertical-align: top;
        .recommend-img{
          border-radius: 10px;
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
          img{
            vertical-align: middle;
            border-radius: 10px;
            width: 100%;
            height: 100%;
          }
        }
        .recommend-playCount{
          position: absolute;
          top: 10px;
          right: 10px;
          color: #fff;
          padding: 5px 15px;
          background: rgba($color: #000, $alpha: 0.3);
          border-radius: 30px;
          .anticon-caret-right{
            font-size: 24px;
          }
        }
        .recommend-name{
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
