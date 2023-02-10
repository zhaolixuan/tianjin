/*
删除数组中的某一个对象
_arr:数组
_obj:需删除的对象
*/
export function removeAaary(_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (_arr[i] == _obj) {
      if (i == 0) {
        _arr.shift(); //删除并返回数组的第一个元素
        return _arr;
      } else if (i == length - 1) {
        _arr.pop(); //删除并返回数组的最后一个元素
        return _arr;
      } else {
        _arr.splice(i, 1); //删除下标为i的元素
        return _arr;
      }
    }
  }
}

/*
导航
url 
*/
export function navigation(url) {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  if (isAndroid) {
    //android终端
    window.open(url);
  } else if (isiOS) {
    //ios终端
    window.location.href = url;
  }
}
