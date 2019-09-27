import service from './axios-config'

class ServiceManger {
  // 登录
  login (username, password) {
    return new Promise((resolve, reject) => {
      return service
        .post('/auth/login', {
          username,
          password
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 登录后获取菜单
  getInfo () {
    const Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2OTIzMzM0MywiaWF0IjoxNTY5MjI2MTQzfQ.Ha8pUC-trMa-FiP6LbEE2ix4O6l98enVbVGeMGOP3NZSbCnp8bHbY9VQXmaOJhvcdoidab1Xk2vpDgjlF9eJUA'
    return new Promise((resolve, reject) => {
      return service
        .get('api/menus/build', {
          headers: {
            Authorization: Authorization
          }
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default new ServiceManger()
