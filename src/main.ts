import { createApp } from 'vue'

// import './service/axios_demo'
import hyRequest from './service'

import App from './App.vue'
import router from './router'
import store from './store'

import naive from 'naive-ui'

const app = createApp(App)
app.use(naive)
app.use(router)
app.use(store)
app.mount('#app')

hyRequest.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独响应的response')
      return res
    }
  }
})

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })
