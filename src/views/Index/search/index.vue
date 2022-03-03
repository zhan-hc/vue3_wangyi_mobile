<template>
  <div class="search-wrap">
    <div class="search-header">
      <van-icon name="arrow-left" class="header-icon" @click="handleBack" />
      <input
        type="text"
        v-model="keyword"
        class="search-input"
        :placeholder="hotKeyword"
        @input="onSearch"
        @keyup.enter="isSearch=true"
      />
    </div>
    <div class="search-content" v-if="keyword && !isSearch">
      <div v-if="searchList">
        <div class="search-item" v-for="(item, i) in searchList" :key="i"  @click="handleClickWord(item.keyword)">
          <van-icon name="search" />
          <span class="search-current">{{
            item.keyword.slice(0, keyword.length)
          }}</span>
          <span>{{ item.keyword.slice(keyword.length) }}</span>
        </div>
      </div>
      <div v-else>
        <div class="search-item"  @click="handleClickWord(item.keyword)">
          <span class="search-null">{{ `搜索 "${keyword} "` }}</span>
        </div>
      </div>
    </div>
    <search-tab v-else-if="isSearch" :keywords="keyword"></search-tab>
    <div v-else class="hot-content">
      <p>热搜榜</p>
      <div class="search-hot" v-if="hotList.length">
        <div class="hot-item" v-for="(item, i) in hotList" :key="i">
          <span :class="{ hot: i <= 3 }">{{ i + 1 }}</span>
          <span>{{ item.searchWord }}</span>
        </div>
      </div>
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
        isSearch: false
      })

      onMounted(async () => {
        const hotRes = search_hot()
        const keyRes = search_default()
        const res = await Promise.all([hotRes, keyRes])
        state.hotList = res[0].data
        state.hotKeyword = res[1].data.showKeyword
      })

      // 搜索建议
      const onSearch = () => {
        state.isSearch = false
        state.keyword !== '' &&
          search_suggest(state.keyword).then((res) => {
            state.searchList = res.result.allMatch
          })
      }


      // 点击查询
      const handleClickWord = (keyword) => {
        state.keyword = keyword
        state.isSearch = true
      }

      // 回退
      const handleBack = () => {
        if (state.keyword) {
          state.keyword = ''
          state.isSearch = false
        } else {
          handleRouterBack()
        }
      }

      return {
        ...toRefs(state),
        handleBack,
        handleClickWord,
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
      margin-bottom: .125rem;
      .header-icon {
        margin-right: .3125rem;
      }
      .search-input {
        flex: 1;
        background: none;
        outline: none;
        border: none;
        border-bottom: 1px solid #ccc;
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
        padding: .625rem;
        border-radius: 20px;
        box-shadow: 0 0 5px 5px #ccc;
        .hot-item {
          width: 50%;
          padding: .0625rem;
          @include ellipsis;
          span {
            &:first-child {
              display: inline-block;
              width: .625rem;
              margin-right: .125rem;
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
