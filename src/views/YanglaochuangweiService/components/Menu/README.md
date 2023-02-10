# 公共菜单组件

```
1、菜单数据存储位置：
  该组件的数据源为 store.js 中的 menuData 数据，若是动态获取的菜单数据，可通过 store 中的 setMenuData 方法进行修改。

2、菜单数据结构：
  [{
    title: "一级菜单",
    alias: "",
    class: "iconfont iconchengshiyunnao",
    key: 1,
    children: [{
      title: "二级菜单1",
      alias: "",
      href: "",
      type: "",
      key: 11,
      notclick: "",
      tips: ""
    }]
  }]
  （为了展示效果请至少放置三个一级菜单）

3、字段说明：
  title: 菜单的名称，必填
  alias: 菜单的别名，可选，当 alias 存在时显示的是 alias 的内容
  class: 一级菜单展示的icon图标，必填，目前有.iconchengshiyunnao .iconchanyelianzhaoshang .iconchanyefazhan .iconchanyedianshang .iconzhengceyun 五个，新增需要在iconfont中增加
  key: 该菜单的唯一标识，必填
  children: 该菜单是否有子菜单，目前要求一级菜单至少有一个二级菜单，暂不支持三级菜单
  href: 菜单跳转的目标地址，可以是内部路由或外链，需要与type配合，目前只支持二级菜单跳转
  type: 菜单的跳转类型，可选，默认为空表示跳转到内部路由，'goto'表示跳转到外链
  notclick: 菜单是否可以点击跳转， 可选，默认false可以点击跳转，目前只支持二级菜单
  tips: 鼠标划入菜单时展示的描述内容弹窗，可选，默认无弹窗，目前只支持二级菜单
        
```
