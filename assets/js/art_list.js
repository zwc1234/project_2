$( function () {
  let layer=layui.layer
  let form=layui.form
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
          return layer.msg( '获取失败' )
        }
        layer.msg( '获取成功' )

        let htmlStr=template( 'tpl-table', res )

        $( 'tbody' ).html( htmlStr )
        renderPage( res.total )
      }
    } )
  }

  template.defaults.imports.dateFormat=function ( date ) {
    const dt=new Date( date )
    let y=padZore( dt.getFullYear() )
    let m=padZore( dt.getMonth()+1 )
    let d=padZore( dt.getDate() )
    let hh=padZore( dt.getHours() )
    let mm=padZore( dt.getMinutes() )
    let ss=padZore( dt.getSeconds() )
    return y+'-'+m+'-'+d+'  '+hh+':'+mm+':'+ss
  }

  function padZore( d ) {
    return d>9? d:'0'+d
  }

  function initCate() {
    $.ajax( {
      method: 'GET',
      url: '/my/article/cates',
      success: function ( res ) {

        if ( res.status!==0 ) {
          return layer.msg( '获取失败' )
        }
        let htmlStr=template( 'tpl-cate', res )
        $( '[name="cate_Id"]' ).html( htmlStr )
        form.render()
      }
    } )
  }
  initCate()

  $( '#form-search' ).submit( function ( e ) {
    e.preventDefault()
    let cate_Id=$( '[name="cate_Id"]' ).val()
    let state=$( '[name="state"]' ).val()
    q.cate_id=cate_Id
    q.state=state
    initTable()
  } )
  //分页
  var laypage=layui.laypage;
  function renderPage( total ) {
    laypage.render( {
      elem: 'pageBox',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      limits:[2,3,5,10],
      layout:['count','limit','prev', 'page', 'next','skip'],
      jump: function ( obj,first ) {
        q.pagenum=obj.curr
        q.pagesize = obj.limit
        if ( !first ) {
          initTable()
        }
      }
    } )
  }
  

  $( 'tbody' ).on( 'click', '.btn-delete', function () {
    let id=$( this ).attr( 'data-id' )
    let len=$( '.btn-delete' ).length

    layer.confirm( '确认删除?', { icon: 3, title: '提示' }, function ( index ) {
      $.ajax( {
        method: 'GET',
        url: '/my/article/delete/'+id,
        success: function (res) {
          if ( res.status!==0 ) {
            return layer.msg(res.message)
          }
          layer.msg( res.message )
          if ( len ===1 ) {
            q.pagenum=q.pagenum===1? 1:q.pagenum-1;
          }

          initTable()
        }
      })
     
      layer.close(index);
    } );
   
  } )
  
  $( 'body' ).on( 'click', '.btn-edit',function () {
    let id=$( this ).attr( 'data-id' )
    $.ajax( {
      method: 'GET',
      url: '/my/article/'+id,
      success: function ( res ) {

        if ( res.status!==0 ) {
          return layer.msg(res.message)
        }

        localStorage.setItem('data',JSON.stringify(res.data))
        location.href = '/arcitle/art_pub.html'
      

        }
    } )
    
    
  })
} )