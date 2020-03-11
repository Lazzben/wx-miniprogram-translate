const app = getApp()
Page({
  data: {
    curLang: {},
    langList : app.globalData.langList
  },

  onShow(){
    this.setData({'curLang': app.globalData.curLang})
  },

  onTapItem: function(e){
    let curLang = e.currentTarget.dataset
    wx.setStorageSync('curLang', curLang)
    this.setData({'curLang': curLang})
    app.globalData.curLang = curLang
    wx.switchTab({ url: '/pages/index/index' })  
  },

})