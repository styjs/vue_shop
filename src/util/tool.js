function format (format, time) {
  let timeObj = new Date()
  if (time) timeObj = new Date(time)

  var o = {
    'M+': timeObj.getMonth() + 1, // month
    'd+': timeObj.getDate(), // day
    'h+': timeObj.getHours(), // hour
    'm+': timeObj.getMinutes(), // minute
    's+': timeObj.getSeconds(), // second
    'q+': Math.floor((timeObj.getMonth() + 3) / 3), // quarter
    S: timeObj.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    console.log(RegExp.$1.length)
    format = format.replace(RegExp.$1, (timeObj.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export default {
  format
}
