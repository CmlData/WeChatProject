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
            title: "研学路线",
            imgUrl: "/images/destination/view1.png"
        }, {
            title: "定制研学",
            imgUrl: "/images/destination/view2.png"
        }, {
            title: "成品课程",
            imgUrl: "/images/destination/view3.png"
        }, {
            title: "教具",
            imgUrl: "/images/destination/view4.png"
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
        wx.navigateTo({
            url: 'view-detail/view-detail?sid=' + sid + ''
        })
    }
})