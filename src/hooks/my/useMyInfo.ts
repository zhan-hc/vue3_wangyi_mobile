import { onMounted, ref} from "vue"
import { user_level } from '@/api/user/index'
import { useStore } from 'vuex'
export default function useMyInfo(){

  const store = useStore()
  onMounted(() => {
    // 获取等级
    user_level()
      .then((res: any) => {
        if (res.code === 200) {
          sessionStorage.setItem('level', res.data.level)
          store.commit('setUserLevel', res.level)
        }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  })
  return {}
  
}