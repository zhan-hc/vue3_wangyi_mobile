<template>
  <div class="search-wrap">
    <div class="search-header">
      <LeftOutlined class="header-icon" @click="handleBack" />
      <input
        v-model="keyword"
        class="search-input"
        :placeholder="hotKeyword"
        @input="onSearch"
      />
    </div>
    <div class="search-content" v-if="keyword">
      <div v-if="searchList">
        <div class="search-item" v-for="(item, i) in searchList" :key="i">
          <van-icon name="search" />
          <span class="search-current">{{
            item.keyword.slice(0, keyword.length)
          }}</span>
          <span>{{ item.keyword.slice(keyword.length) }}</span>
        </div>
      </div>
      <div v-else>
        <div class="search-item">
          <span class="search-null">{{ `搜索 "${keyword} "` }}</span>
        </div>
      </div>
    </div>
    <div v-else class="hot-content">
      <p>热搜榜</p>
      <div class="search-hot">
        <div class="hot-item" v-for="(item, i) in hotList" :key="i">
          <span :class="{ hot: i <= 3 }">{{ i + 1 }}</span>
          <span>{{ item.searchWord }}</span>
        </div>
      </div>
      <search-tab></search-tab>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
  import { useDebounceFn } from '@vueuse/core'
  import { search_suggest, search_hot, search_default } from '@/api/search/index'
  import useRouteFun from '@/hooks/router/useRouteFun'
  import searchTab from '@/components/searchTab'
  export default defineComponent({
    name: 'search',
    components: {
      searchTab
    },
    setup() {
      const { handleRouterBack } = useRouteFun()
      const state = reactive({
        keyword: '',
        hotKeyword: '',
        searchList: [],
        hotList: [],
      })

      onMounted(async () => {
        const hotRes = await search_hot()
        const keyRes = await search_default()
        state.hotList = hotRes.data
        state.hotKeyword = keyRes.data.showKeyword
      })

      function onSearch() {
        state.keyword !== '' &&
          search_suggest(state.keyword).then((res) => {
            state.searchList = res.result.allMatch
          })
      }
      const handleBack = () => {
        if (state.keyword) {
          state.keyword = ''
        } else {
          handleRouterBack
        }
      }
      return {
        ...toRefs(state),
        handleBack,
        onSearch: useDebounceFn(onSearch, 300),
      }
    },
  })
</script>

<style scoped lang="scss">
  @import '@/assets/scss/mixin.scss';
  .search-wrap {
    padding: 20px;
    font-size: 16px;
    .search-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .header-icon {
        margin-right: 20px;
      }
      .search-input {
        flex: 1;
        background: none;
        outline: none;
        border: none;
        // font-size: 24px;
        border-bottom: 1px solid #ccc;
        // font-size: 32px;
        caret-color: #cf0000;
      }
    }
    .search-content {
      .search-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        .search-current {
          color: #ccc;
        }
        .van-icon-search {
          margin-right: 10px;
          // font-size: 32px;
        }
        .search-null {
          color: #4169e1;
        }
      }
    }
    .hot-content {
      // font-size: 32px;
      p {
        // font-size: 32px;
      }
      .search-hot {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 0 5px 5px #ccc;
        .hot-item {
          width: 50%;
          padding: 10px;
          @include ellipsis;
          span {
            &:first-child {
              display: inline-block;
              width: 30px;
              margin-right: 20px;
              color: #ccc;
            }
            &.hot {
              color: red;
            }
          }
        }
      }
    }
  }
</style>
