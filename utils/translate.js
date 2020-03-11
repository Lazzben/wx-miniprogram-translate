import md5 from './md5.min.js'
const appid = '20200306000393854'
const key = 'vPxQSuCtaGo3YegLkNz6'

const translate = (q, to = 'zh') => {
  return new Promise((resolve, reject)=>{
    let from = 'auto'
    let salt = Math.random()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q, from, to, appid, salt, sign
      },
      success(response){
        if(response.data && response.data.trans_result){
          resolve(response.data)
        }else{
          reject('fail')
        }
      },
      fail(){
        reject('错误')
      }
    })
  })
}

export default translate