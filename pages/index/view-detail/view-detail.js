// view-detail.js

Page({
    data: {
      active: 0,
      viewDetail: {} // 这里填充你的数据
    },
  
    // 点击抢购按钮
    buyProduct: function () {
      // 弹窗显示购买成功
      wx.showToast({
        title: '购买成功',
        icon: 'success',
        duration: 2000
      });
    },
  
    // 选项卡切换
    productClick: function () {
      this.setData({
        active: 0
      });
    }
  });
