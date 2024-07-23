import {
    View,
    star,
    getViewData
} from "../../utils/util.js";
let app = getApp();
let cityName;
Page({
    data: {
        allCity: [],
        cityHot: [],
        viewHot: [],
        viewList: [],
        active: true,
        viewDetail: [],
        loading: true,
        animationData: {},
        userInfo: {},
        swiperIndex: 0,
        activeTab: 'tab1',
        active: 5,
        hotView: [{
            sid: 0,
            title: "研学路线",
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
    switchTab(e) {
        const tab = e.currentTarget.dataset.tab;
        if (tab !== this.data.activeTab) {
            this.setData({
                activeTab: tab
            });
        }
    },
    onShow() {},
    async init() {},
    changeSwiper(evt) {
        let swiperIndex = evt.detail.current;
        this.setData({
            swiperIndex
        });
    },
    onLoad() {
        let _this = this;
        // 获取热门城市
        new View("", "get").send((res) => {
            let data = res.data.result;
            dealCityHot(data);
            this.getCity();
        })
        // 获取热门景区
        new View("", "get").send((res) => {
            let data = res.data.result;
            dealViewHot(data);
        })
        //  处理获取到的城市数据
        function dealCityHot(data) {
            // 获取前4个信息
            let cityHot = data.splice(0, 4);
            _this.setData({
                allCity: data,
                cityHot: cityHot
            });
        }
        // 处理获取到的景点数据
        function dealViewHot(data) {
            //获取前9个景区信息
            let viewHot_1 = data.splice(0, 3);
            let viewHot_2 = data.splice(0, 3);
            let viewHot_3 = data.splice(0, 3);
            // 数据结构满足[[],[],[]]结构，页面中for使用
            let arr = [];
            arr.push(viewHot_1);
            arr.push(viewHot_2);
            arr.push(viewHot_3);
            _this.setData({
                viewHot: arr
            })
        }
        this.init();
    },

    // 相关新闻
    getaroundView() {
        this.tabGetData(true, true, "aroundViewList", cityName)
    },
    // 研学路线
    getcountryView() {
        this.tabGetData(false, true, 'countryViewList')
    },

    tabGetData(active, loading, key, city) {
        let _this = this;
        this.leaveAnimate();
        this.setData({
            active: active,
            loading: loading
        })
        if (wx.getStorageSync(key)) {
            this.setData({
                viewList: wx.getStorageSync(key),
                loading: !loading
            });
            this.enterAnimate();
        } else {
            getViewData(_this.data.allCity, city, function (res) {
                _this.spliceTwoView(res)
            })
        }
    },
    // 进入景点列表
    enterViewList() {
        let allcity = JSON.stringify({
            allcity: this.data.allCity
        })
        wx.navigateTo({
            url: 'view-list/view-list?allcity=' + allcity + ''
        })
    },
    // 动画
    enterAnimate() {
        let animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
        })
        animation.opacity(1).step()
        this.setData({
            animationData: animation.export()
        })
    },
    leaveAnimate() {
        let animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease',
        })
        animation.opacity(0).step()
        this.setData({
            animationData: animation.export()
        })
    },
    // 进入景点详情
    enterDetail(e) {
        let sid = e.currentTarget.dataset.id;
        if (sid == 0) {
            this.setData({
                activeTab: 'tab2'
            });
            wx.pageScrollTo({
                scrollTop: 480,
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
    // enterDetail(e) {
    //   let sid = e.currentTarget.dataset.id;
    //   wx.navigateTo({
    //     url: '/pages/destination/cityView/cityView?sid=' + sid + ''
    //   })
    // },

    //路线
    new1() {
        wx.navigateTo({
            url: '/pages/index/news/new1/new1',
        })
    },
    new2() {
        wx.navigateTo({
            url: '/pages/index/news/new2/new2',
        })
    },
    new3() {
        wx.navigateTo({
            url: '/pages/index/news/new3/new3',
        })
    },
    new4() {
        wx.navigateTo({
            url: '/pages/index/news/new4/new4',
        })
    },
    new5() {
        wx.navigateTo({
            url: '/pages/index/news/new5/new5',
        })
    },
    new6() {
        wx.navigateTo({
            url: '/pages/index/news/new6/new6',
        })
    },

    road1() {
        wx.navigateTo({
            url: '/pages/index/roads/road1/road1',
        })
    },
    road2() {
        wx.navigateTo({
            url: '/pages/index/roads/road2/road2',
        })
    },
    road3() {
        wx.navigateTo({
            url: '/pages/index/roads/road3/road3',
        })
    },
    road4() {
        wx.navigateTo({
            url: '/pages/index/roads/road4/road4',
        })
    },
    road5() {
        wx.navigateTo({
            url: '/pages/index/roads/road5/road5',
        })
    },
})