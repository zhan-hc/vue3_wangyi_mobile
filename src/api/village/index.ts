import { Request } from '@/utils/request';
// 云村
export function village_video ()  {
    return Request.axiosInstance({
        url: '/video/timeline/recommend',
        method: 'post'
    })
}