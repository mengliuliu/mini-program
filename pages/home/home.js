// pages/home/home.js
import request from '../../service/network.js'

const types = ['pop', 'new', 'sell']
const TOP_DISTANCE = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 请求轮播图及推荐数据
    this.getMultiData()
    // 2. 请求商品数据
    this.getGoodData("pop")
    this.getGoodData("new")
    this.getGoodData("sell")
  },

  // ------------事件监听函数-------------
  handleClick: function (options) {
    console.log("点击了title")
    console.log(options)
    // 获取点击的索引
    const index = options.detail.index

    // 设置currentType
    this.setData({
      currentType: types[index]
    })
  },
  handleBackTop: function() {
    // 点击按钮，回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  // ------------网络请求函数-------------
  getMultiData: function () {
    request({
      url: "http://123.207.32.32:8000/home/multidata"
    }).then(res => {
      // console.log(res)
      // 2. 取出轮播图和推荐数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      // 3. 将取出的数据放到data中
      this.setData({
        banners,
        recommends
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getGoodData: function(type) {
    // 1. 获取页码
    const page = this.data.goods[type].page + 1

    // 2. 发送网络请求
    request({
      url: "http://152.136.185.210:8000/api/n3/home/data",
      data: {
        type,
        page
      }
    }).then(res => {
      // 2.1 取出数据
      const list = res.data.data.list

      // 2.2 将数据设置到对应的type的list中
      const oldList = this.data.goods[type].list
      oldList.push(...list)

      // 2.3 将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  onReachBottom: function() {
    // 实现上拉加载更多
    this.getGoodData(this.data.currentType)
  },
  // 监听页面的滚动
  onPageScroll: function(options) {
    console.log(options)
    // 1. 取出scrollTop
    const scrollTop = options.scrollTop

    // 2. 修改 showBackTop 属性
    // 官方：不要在滚动的函数回调中频繁的调用this.setData,应当节流和防抖
    const flag = scrollTop >= TOP_DISTANCE
    if(flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
  }
})