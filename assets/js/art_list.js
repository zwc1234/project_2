$( function () {
  let layer = layui.layer
  let q={
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  initTable()
  function initTable() {
    $.ajax( {
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function ( res ) {
        if ( res.status!==0 ) {
          return layer.msg('获取失败')
        }
        layer.msg( '获取成功' )
        console.log(res.data);
        let htmlStr=template( 'tpl-table', res )
       
        $('tbody').html(htmlStr)
      }
    })
  }

  template.defaults.imports.dateFormat=function (date) {
    const dt=new Date( date )
    console.log(dt);
    let y=padZore(dt.getFullYear())
    let m=padZore(dt.getMonth()+1)
    let d=padZore(dt.getDate())
    let hh=padZore(dt.getHours())
    let mm=padZore(dt.getMinutes())
    let ss=padZore(dt.getSeconds())
    return y + '-' + m +'-' + d + '  ' + hh + ':' + mm + ':' + ss
  }

  function padZore(d) {
   return d > 9 ? d : '0' +d
  }
} )