const app = getApp()
Page({
  data: {
    collectionList: []
  },

  onShow: function () {
    this.setData({
      'collectionList': app.globalData.collectionList
    })
  },

  onRemoveCollect: function(e){
    app.globalData.onRemoveCollect(e.currentTarget.dataset.sign)
    this.setData({
      'collectionList': app.globalData.collectionList
    })
  }
})