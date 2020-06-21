App({

  /*
    注册小程序是，一般会做什么
      1. 判断小程序的进入场景（执行app.json文件）
      2. 监听生命周期函数，在生命周期中执行对应的业务逻辑，比如在某个生命周期函数中获取微信用户的信息（执行app.js文件）
      3. 因为 App() 实例只有一个，并且是全局共享的（单例对象），所以我们可以将一些共享数据放在这里
  */

  /*
    界面渲染整体流程
      1. 在渲染层，宿主环境会把 WXML 转化成对应的 JS 对象
      2. 将 JS 对象再次转成真实 DOM 树，交由渲染层线程渲染
      3. 数据变化时，逻辑层提供最新的变化数据，JS 对象发生变化比较进行diff算法对比
      4. 将最新变化的内容反映到真实的 DOM 树中，更新UI
  */

  /*
    小程序的双线程模型
      - 宿主环境为了执行小程序的各种文件：wxml文件、wxss文件、js文件
      - 提供了小程序的双线程模型
    双线程模型
      - WXML 模块和 WXSS 样式运行与渲染层，渲染层使用 WebView 线程渲染（一个程序有多个页面，会使用多个WebView的线程）
      - JS 脚本（app.js/home.js等）运行与逻辑层，逻辑层使用 JsCore 运行 JS 脚本
      - 这两个线程都会经由微信客服端（Native）进行中转交互
  */

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 主要用于获取用户信息
    // 获取用户信息有三种方式
    // 获取用户信息的第一种方式
    // 注意：此任务是异步任务
    wx.getUserInfo({
      success: function(info) {
        // console.log(info)
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // options 参数包含许多属性
    // path：路径
    // scene：场景值ID
    console.log(options)
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    name: '孟刘',
    age: 18
  }
})
