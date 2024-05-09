//app.js
App({
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  onLaunch: function () {

    this.globalData = {
      avatarUrl: "",
      nickName: "",
      hasUserInfo: false, // 用户信息是否已经填写好   

    };
    var that = this;

    //获取缓存中的用户信息
    wx.getStorage({
      key: 'avatarUrl',
      complete(res) {
        console.log("getStorage avatarUrl :", res.data)
        if (res.data) {
          that.globalData.avatarUrl = res.data
          console.log("头像进行了赋值")
        }
      }
    })

    wx.getStorage({
      key: 'nickName',
      complete(res) {
        console.log("getStorage nickName :", res.data)
        if (res.data) {
          that.globalData.nickName = res.data
          console.log("用户名进行了赋值")
        }
      }
    })

    setTimeout(() => {
      if (this.globalData.avatarUrl && this.globalData.nickName) {
        this.globalData.hasUserInfo = true;
      }
    }, 100);
  }
})