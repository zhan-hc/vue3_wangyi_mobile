import { onMounted, onActivated,computed} from "vue"
import { user_level, user_likeList} from '@/api/user/index'
import { useStore } from 'vuex'
export default function useMyInfo(){

  const store = useStore()

  const uid:any = computed(() => store.state.uid)
  const likeIds = store.state.likeIds
  const level = store.state.level


  // 获取等级
  const getUserLevel = async () => {
    const levelRes:any = await user_level()
    localStorage.setItem('level', levelRes.data.level)
    store.commit('setUserLevel', levelRes.level)
  }

  // 获取喜欢的列表
  const getUserLike = async (uid: number) => {
    const likeRes:any = await user_likeList(uid)
    likeIds.value = likeRes.ids
    store.commit('setLikeIds', likeRes.ids)
  }
  // localStorage.setItem('level', levelRes.data.level)
  // store.commit('setUserLevel', levelRes.level)

  onMounted(() => {
    if (uid) {
      !level && getUserLevel()
      !likeIds.length && getUserLike(uid)
    }
  })

  // 登录进来取消缓存从新获取数据
  onActivated(() => {
    console.log('onActivated被处罚', uid)
    if (uid) {
      !level && getUserLevel()
      !likeIds.length && getUserLike(uid)
    }
  })

  return {
    uid
  }
  
}