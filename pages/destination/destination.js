// pages/destination/destination.js
import {
    enterDetail
} from "../index/index.js";
Page({
    data: {
        // hotcity:["热门","周边","香港","澳门","海南","云南"],
        // nearbyCity:["昆明","红河","西双版纳","大理","文山","楚雄","丽江","香港"],
        active: 5,
        hotView: [{
            sid: 0,
            title: "所有产品",
            imgUrl: "https://www.xingjiangzh.cn/static/index/index1.jpg"
        }, {
            sid: 1,
            title: "定制研学",
            imgUrl: "https://www.xingjiangzh.cn/static/index/index2.jpg"
        }, {
            sid: 2,
            title: "成品课程",
            imgUrl: "https://www.xingjiangzh.cn/static/index/index3.jpg"
        }, {
            sid: 3,
            title: "教具",
            imgUrl: "https://www.xingjiangzh.cn/static/index/index4.jpg"
        }]
    },
    activeClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            active: index
        })
    },
    // 进入景点详情
    enterDetail(e) {
        let sid = e.currentTarget.dataset.id;
        if (sid == 0) {
            wx.pageScrollTo({
                scrollTop: 390,
                duration: 500
            })
        } else if (sid == 1) {
            wx.switchTab({
                url: '/pages/destination/destination',
            })
        } else if (sid == 2) {
            wx.navigateTo({
                url: '/pages/destination/cityView/cityView?sid=' + sid + ''
            })
        } else if (sid == 3) {
            wx.navigateTo({
                url: '/pages/destination/cityView/Tool/tool'
            })
        }
    },
    enterCity(e) {
        let cityname = e.currentTarget.dataset.cityname;
        wx.navigateTo({
            url: 'cityView/cityView?cityname=' + cityname + ''
        })
    }
})