import axios from 'axios'

// axios实例对象
// 1.模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log('res', res)
})

// 2.模拟get请求，并且传入参数
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log('res.data', res.data)
  })

// 3.post请求
axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log('res.data', res.data)
  })

// 4.axios的配置选项
axios.defaults.baseURL = 'http://httpbin.org/'
axios.defaults.timeout = 10000
