import translate from '../../utils/translate.js'
const app = getApp()
Page({

  data: {
    query: '',
    hideIconClose: true,
    result: [],
    curlang: '',
    collected: false
  },

  onShow: function() {
    this.setData({
      'curlang': app.globalData.curLang
    })
    this.onTranslate(this.data.query, this.data.curlang.lang)
    if (this.isCollected(this.data.query + this.data.curlang.lang)) {
      this.setData({
        'collected': true
      })
    }else{
      this.setData({
        'collected': false
      })
    }
  },

  onInput: function(event) {
    this.setData({
      'query': event.detail.value
    })
    if (this.data.query.length > 0) {
      this.setData({
        'hideIconClose': false
      })
    } else {
      this.setData({
        'hideIconClose': true,
        'collected': false
      })
    }!this.data.query && this.setData({
      'result': []
    })
  },

  removeInputValue: function() {
    this.setData({
      'query': '',
      'hideIconClose': true,
      'result': []
    })
  },

  onTranslate: function() {
    if (!this.data.query) return
    translate(this.data.query, this.data.curlang.lang).then((data) => {
      this.setData({
        'result': data.trans_result
      })
      //设置历史
      let history = wx.getStorageSync('history') || []
      let repeatSign = false
      history.forEach((his) => {
        if (his.sign === this.data.query + this.data.curlang.lang) {
          repeatSign = true
          return
        }
      })
      if (repeatSign) return
      history.unshift({
        'query': this.data.query,
        'result': this.data.result[0].dst,
        'sign': this.data.query + this.data.curlang.lang,
        'colleted': false
      })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
    //设置星星
    this.isCollected(this.data.query + this.data.curlang.lang) &&
      this.setData({
        'collected': true
      })
  },
  onCollect: function() {
    if (!this.data.result && !this.data.query) return
    app.globalData.onCollect({
      query: this.data.query,
      result: this.data.result[0].dst,
      sign: this.data.query + this.data.curlang.lang
    })
    this.setData({
      'collected': true
    })
  },
  onRemoveCollect: function() {
    if (!this.data.result && !this.data.query) return
    app.globalData.onRemoveCollect(this.data.query + this.data.curlang.lang)
    this.setData({
      'collected': false
    })
  },

  isCollected: function(sign) {
    let bool = false
    app.globalData.collectionList.forEach((col) => {
      if (col.sign === sign) bool = true
    })
    return bool
  },

})