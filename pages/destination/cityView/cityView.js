// pages/destination/cityView/cityView.js
Page({
    data: {},
    //   onLoad:function(options){
    //     // 页面初始化 options为页面跳转所带来的参数
    //     let cityname=options.cityname;
    //     wx.setNavigationBarTitle({
    //       title: ''+cityname+''
    //     })
    //   }

    sub01() {
        wx.navigateTo({
          url: './subProduct/sub01/sub01',
        })
    },
    
    sub02() {
        wx.navigateTo({
          url: './subProduct/sub02/sub02',
        })
    },

    sub03() {
        wx.navigateTo({
          url: './subProduct/sub03/sub03',
        })
    },

    sub04() {
        wx.navigateTo({
          url: './subProduct/sub04/sub04',
        })
    },

    sub05() {
        wx.navigateTo({
          url: './subProduct/sub05/sub05',
        })
    },

    sub06() {
        wx.navigateTo({
          url: './subProduct/sub06/sub06',
        })
    },

    sub07() {
        wx.navigateTo({
          url: './subProduct/sub07/sub07',
        })
    },

    sub08() {
        wx.navigateTo({
          url: './subProduct/sub08/sub08',
        })
    },

    tool() {
        wx.navigateTo({
          url: './Tool/tool',
        })
    }
})