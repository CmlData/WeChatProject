
// pages/me/index.js
const defaultAvatarUrl = 'https://www.xingjiangzh.cn/static/icon/0.png'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    hasUserInfo: false,
  },
  onLoad(e){},
  onShow(){
      this.data.avatarUrl = app.globalData.avatarUrl
      this.data.nickName = app.globalData.nickName
      this.data.hasUserInfo = app.globalData.hasUserInfo
      this.setData({
        hasUserInfo:app.globalData.hasUserInfo
      })

      if(this.data.hasUserInfo)
      {
          this.setData({
              avatarUrl:app.globalData.avatarUrl,
              nickName:app.globalData.nickName
          })
      }
  },

  getOpenId() {
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },

});
