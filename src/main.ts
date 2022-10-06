import { createApp } from 'vue'

import { globalRegister } from './global'

import 'element-plus/dist/index.css'

import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'
// import hyRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

import naive from 'naive-ui'

const app = createApp(App)
app.use(globalRegister)
app.use(naive)
app.use(store)
setupStore()
// app.use(setupStore)
app.use(router)
app.mount('#app')

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })
