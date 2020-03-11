//app.js
App({
  onLaunch: function() {
    this.globalData.curLang = wx.getStorageSync('curLang') || this.globalData.langList[0]
    this.globalData.collectionList = wx.getStorageSync('collection') || [] 
    //登陆
    wx.login({
      success: res => {
      }
    })
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null,
    curLang: {},
    langList: [{
        'chs': '英文',
        "lang": 'en',
        "index": 0
      },
      {
        'chs': '中文',
        'lang': 'zh',
        "index": 1
      },
      {
        'chs': '日语',
        'lang': 'jp',
        "index": 2
      },
      {
        'chs': '韩语',
        'lang': 'kor',
        "index": 3
      },
      {
        'chs': '法语',
        'lang': 'fra',
        "index": 4
      },
      {
        'chs': '西班牙语',
        'lang': 'spa',
        "index": 5
      },
      {
        'chs': '阿拉伯语',
        'lang': 'ara',
        "index": 6
      }
    ],
    collectionList: [],
    onCollect: function(obj){
      const { query, result, sign } = obj
      let colsign = true
      this.collectionList.forEach((col)=>{
        if(col.sign === sign) {colsign = false}
        return
      })
      if(!colsign) return
      this.collectionList.push(obj)
      wx.setStorageSync('collection', this.collectionList)
      this.setHistoryStar(sign, true)
    },
    onRemoveCollect: function(sign){
      let collectionList = this.collectionList
      this.collectionList.forEach((col, index) => {
        if(col.sign === sign){
          collectionList.splice(index,1)
        }
      }) 
      this.collectionList = collectionList
      wx.setStorageSync('collection', this.collectionList)
      this.setHistoryStar(sign, false)
    },
    setHistoryStar: function(sign, bool){
      let history = wx.getStorageSync('history')
      history.forEach((his,index)=>{
        if(his.sign === sign){
          his.collected = bool
        }
      })
      wx.setStorageSync("history", history)
    }
  }
})