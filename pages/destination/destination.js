// pages/destination/destination.js
Page({
  data:{
    // hotcity:["热门","周边","香港","澳门","海南","云南"],
    // nearbyCity:["昆明","红河","西双版纳","大理","文山","楚雄","丽江","香港"],
    active:5,
    hotView:[{
      title:"研学路线",
      imgUrl:"/images/destination/view1.png"
    },{
      title:"定制研学",
      imgUrl:"/images/destination/view2.png"
    },{
      title:"成品课程",
      imgUrl:"/images/destination/view3.png"
    },{
      title:"教具",
      imgUrl:"/images/destination/view4.png"
    }]
  },
  activeClick (e){
    let index=e.currentTarget.dataset.index;
     this.setData({
       active:index
     })
  },
    // 进入景点详情
  enterDetail(e) {
    let sid=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../index/view-detail/view-detail?sid='+sid+''
    })
  },
  enterCity(e){
    let cityname=e.currentTarget.dataset.cityname;
    wx.navigateTo({
      url: 'cityView/cityView?cityname='+cityname+''
    })
  }
})