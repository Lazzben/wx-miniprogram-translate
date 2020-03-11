const app = getApp()
Page({

  data: {
    history: [],
    hideClearBtn: false
  },

  onShow: function() {
    this.setData({
      'history': wx.getStorageSync('history')
    })
    if (this.data.history.length > 0) {
      this.setData({
        'hideClearBtn': true
      })
    }
  },

  onRemoveHistory: function(e) {
    const sign = e.currentTarget.dataset.sign
    this.data.history.forEach((his, index) => {
      if (sign === his.sign) {
        let history = this.data.history
        history.splice(index, 1)
        this.setData({
          'history': history
        })
      }
    })
    if (this.data.history.length === 0) {
      this.setData({
        'hideClearBtn': false
      })
    }
    wx.setStorageSync('history', this.data.history)
  },

  onRemoveall: function() {
    this.setData({
      'history': []
    })
    wx.setStorageSync('history', [])
    this.setData({
      'hideClearBtn': false
    })
  },

  onCollect: function(e) {
    app.globalData.onCollect(e.currentTarget.dataset)
    this.setCollected.call(this, true, e.currentTarget.dataset.sign)
  },

  onRemoveCollect: function(e) {
    app.globalData.onRemoveCollect(e.currentTarget.dataset.sign)
    this.setCollected.call(this, false, e.currentTarget.dataset.sign)
  },

  setCollected: function(bool, sign) {
    let history = this.data.history
    this.data.history.forEach((his, index) => {
      if (his.sign === sign) {
        history[index].collected = bool
        return
      }
    })
    this.setData({
      'history': history
    })
    wx.setStorageSync('history', this.data.history)
  }
})