//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '逆風的方向，更適合飛翔。',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tempVal: '',
    mottoShow: true,
    addItemShow: true,
    newTodo: '',
    todos: [],
  },
  //座右銘
  mottoInput(e) {
    this.setData({
      tempVal: e.detail.value,
    });
  },
  saveMotto() {
    const newMotto = this.data.tempVal;
    this.setData({
      motto: newMotto,
      tempVal: '',
      mottoShow: true,
    });
  },
  cancelMotto() {
    this.setData({
      mottoShow: true,
    });
  },
  showMotto() {
    this.setData({
      mottoShow: false,
    });
  },
  //新增事項
  addItemInput(e) {
    this.setData({
      newTodo: e.detail.value,
    });
  },
  saveAddItem() {
    const itemContent = {todoItem: this.data.newTodo};
    let listContent = this.data.todos;
    listContent.push(itemContent);
    this.setData({
      todos: listContent,
      newTodo: '',
      addItemShow: true,
    });
    console.log('newTodo',this.data.newTodo);
  },
  cancelAddItem() {
    this.setData({
      addItemShow: true,
    });
  },
  showAddItem() {
    this.setData({
      addItemShow: false,
    });
  },
  //刪除事項
  removeItem(e) {
    const index = e.currentTarget.dataset.index;
    let listContent = this.data.todos;
    listContent.splice(index,1);
    this.setData({
      todos: listContent,
    });
  },
  //其他事件
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
