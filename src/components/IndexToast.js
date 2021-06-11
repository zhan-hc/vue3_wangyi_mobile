import Toast from './Toast.vue'
import { provide, inject, createApp, ref } from 'vue'
const ToastSymbol = Symbol()

const globalConfig = {
    // type: 'bottom', // toast位置
    duration: 3000, // 持续时长
    // wordWrap: false, // 是否自动换行
    // width: 'auto' // 宽度
}

const show = ref(false)
const msg = ref('')
let [toastTimer, toastVM, toastWrapper] = [null, null, null]

const _toast = text => {
    msg.value = text
    show.value = true
    if (!toastVM) {
        // 如果toast实例存在则不重新创建
        toastVM = createApp(Toast,{
          msg: msg,
          isShow: show
        })
    }

    if (!toastWrapper) {
        // 如果该节点以经存在则不重新创建
        toastWrapper = document.createElement('div')
        toastWrapper.id = 'index-toast'
        document.body.appendChild(toastWrapper)
        toastVM.mount('#index-toast')
    }
    if (toastTimer) clearTimeout(toastTimer)
    // 定时器，持续时长之后隐藏
    toastTimer = setTimeout(() => {
        show.value = false
        clearTimeout(toastTimer)
    }, globalConfig.duration)
}

export function provideToast(config = {}) {
    for (const key in config) {
        globalConfig[key] = config[key]
    }
    provide(ToastSymbol, _toast)
}

export function useToast() {
    const toast = inject(ToastSymbol)
    if (!toast) {
        throw new Error('error')
    }
    return toast
}