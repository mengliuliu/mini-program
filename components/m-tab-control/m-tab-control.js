// pages/home/childCmps/m-tab-control/m-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick(options) {
      console.log(options)
      // 1. 取出index
      const index = options.currentTarget.dataset.index

      // 2. 修改data中的currentIndex
      this.setData({
        currentIndex: index
      })

      // 3. 给页面发送事件，且传递参数index
      this.triggerEvent("titleClick", {index: index})
    }
  }
})
