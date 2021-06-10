<template>
  <div class="nav-wrap">
    <div class="nav-item" v-for="(item, i) in iconList" :key="item.id" :class="{'active' : i === activeTab}" @click="handleClick(i)">
      <div class="iconfont" :class="item.icon">
      </div>
      <div class="item-text">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue"
export default {
  name: 'BottomNav',
  components: {
  },
  setup (props, context) {
    const activeTab = inject('activeTab')
    const iconList = ref([
      {
        id: '1001',
        icon: 'icon-wangyiyunyinyuemusic1193417easyiconnet',
        text: '发现'
      },
      {
        id: '1002',
        icon: 'icon-xinhao',
        text: '播客'
      },
      {
        id: '1003',
        icon: 'icon-music3',
        text: '我的'
      },
      {
        id: '1004',
        icon: 'icon-huatong',
        text: 'k歌'
      },
      {
        id: '1005',
        icon: 'icon-user-more',
        text: '云村'
      }
    ])
    const handleClick = (i) => {
      activeTab.value = i
    }
    return {
      iconList,
      activeTab,
      handleClick
    }
  }
}
</script>

<style scoped lang="scss">
.nav-wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140px;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 2;
  font-size: 24px;
  border-top: 1px solid #ccc;
  .nav-item{
    flex: 1;
    text-align: center;
    color: #9A9A9A;
    &.active {
      color: #FE3A3B;
      text-align: center;
      .iconfont {
        margin: 0 auto;
        width: 80px;
        border-radius: 50%;
        background-image: linear-gradient(to top right, #FE3A3B, #FF9D9C);
        color: #fff;
      }
    }
    .iconfont{
      font-size: 48px;
    }
  }
}
</style>
