
// index.ts
// 获取应用实例
const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
    data: {
        userInfo: {
            avatarUrl: defaultAvatarUrl,
            nickName: '',
        },
        hasUserInfo: false,
        canIUseGetUserProfile: wx.canIUse('getUserProfile'),
        canIUseNicknameComp: wx.canIUse('input.type.nickname'),

        nickNameFocus: false,
        palce_text: "请输入昵称"

    },
    // 事件处理函数
    onChooseAvatar(e) {
        var that = this
        if (this.data.nickNameFocus == false) {
            this.requirePrivacyAuthorize()
        }
        const { avatarUrl } = e.detail
        const { nickName } = this.data.userInfo
        this.setData({
            "userInfo.avatarUrl": avatarUrl,
            hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
        })
        console.log("userInfo:", this.data.userInfo)
        app.globalData.hasUserInfo = that.data.hasUserInfo
        app.globalData.avatarUrl = that.data.userInfo.avatarUrl
    },
    onInputChange(e) {
        var that = this
        if (this.data.nickNameFocus == false) {
            this.requirePrivacyAuthorize()
        }
        console.log("onInpputChange e:", e)
        const nickName = e.detail.value
        const { avatarUrl } = this.data.userInfo
        this.setData({
            "userInfo.nickName": nickName,
            hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
        })
        console.log("userInfo:", this.data.userInfo)
        app.globalData.hasUserInfo = that.data.hasUserInfo
        app.globalData.nickName = that.data.userInfo.nickName
    },
    getUserProfile() {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log("getUserProfile")
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    requirePrivacyAuthorize() {
        if (wx.requirePrivacyAuthorize) {
            console.warn("当前基础库支持api wx.requirePrivacyAuthorize");
            wx.requirePrivacyAuthorize({
                success: () => {
                    console.log('用户同意了隐私协议 或 无需用户同意隐私协议');
                    //用户同意隐私协议后给昵称输入框聚焦
                    this.setData({
                        nickNameFocus: true
                    })
                },
                fail: () => {
                    console.log('用户拒绝了隐私协议');
                }
            })
        } else {
            console.warn("当前基础库不支持api wx.requirePrivacyAuthorize");
            this.setData({
                nickNameFocus: true
            })
        }
    },
    // onShareAppMessage() {

    // },

    PreImage() {
        var that = this;
        var imageUrl = that.data.userInfo["avatarUrl"]
        wx.previewImage({
            urls: [imageUrl],
        })

    },
    saveuserinfo() {
        console.log("hasUserInfoF: ", app.globalData.hasUserInfo)
        if (app.globalData.hasUserInfo) {
            wx.setStorage({
                key: "avatarUrl",
                data: app.globalData.avatarUrl
            })
            wx.setStorage({
                key: "nickName",
                data: app.globalData.nickName
            })

            // 图片地址上传到服务器 (头像图片需要换成长期的网址，不然临时地址会过期)
            this.uploadImage()

            wx.showToast({
              title: '设置成功',
            })

            setTimeout(() => {
                wx.navigateBack()
            }, 1000);
        }
        else{
            //判断是头像还是用户名没有设置
            if(!app.globalData.avatarUrl)
            {
                wx.showToast({
                  title: '清先设置头像',
                  icon:"error"
                })
            }
            else if(!app.globalData.nickName)
            {
                wx.showToast({
                  title: '清先设置昵称',
                  icon:"error"
                })
            }
        }

    },
    uploadImage() {
    },

    onLoad(e) {
        console.log("userInfo onload:", e)
        var that = this
        if (app.globalData.avatarUrl) {
            that.data.userInfo.avatarUrl = app.globalData.avatarUrl;
        }
        that.data.userInfo.nickName = app.globalData.nickName;
        console.log("app.globalData.avatarUrl:", app.globalData.avatarUrl, "  app.globalData.nickName:", app.globalData.nickName)
        if(app.globalData.avatarUrl && app.globalData.nickName)
        {
            console.log("用户名称用户头像都存在了？")
            that.data.hasUserInfo = true
            app.globalData.hasUserInfo = true;
        }

        var palce = that.data.palce_text
        if (that.data.userInfo.nickName) {
            that.data.palce_text = that.data.userInfo.nickName
            palce = that.data.palce_text
        }
        that.setData({
            "userInfo.avatarUrl": that.data.userInfo.avatarUrl,
            "userInfo.nickName": app.globalData.nickName,
            palce_text: palce,
        })
    },

})
