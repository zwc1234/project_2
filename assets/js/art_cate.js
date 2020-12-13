$( function () {
  let layer=layui.layer
  let form = layui.form
  function initArtCateList() {
    $.ajax( {
      mtthod: 'GET',
      url: '/my/article/cates',
      success: function ( res ) {
        let htmlList=template( 'tpl-table', res )
        $( 'tbody' ).html( htmlList )
      }
    } )
  }
  initArtCateList()
  var index=null
  $( '#btnAddCate' ).click( function () {
    index=layer.open( {
      type: 1,
      area: [ '500px', '250px' ],
      title: '添加文章分类',
      content: $( '#dialog-add' ).html()
    } );
  } )

  $( 'body' ).on( 'submit', '#form-add', function ( e ) {
    e.preventDefault()
    console.log(this);
    $.ajax( {
      method: 'POST',
      url: '/my/article/addcates',
      data: $( this ).serialize(),
      success: function ( res ) {
        if ( res.status!==0 ) {
          return layer.msg( '添加失败' )
        }
        initArtCateList()
        layer.msg( '添加成功' )
        layer.close( index )
      }
    } )
  } )
  let indexEdit = null
  $( 'tbody' ).on( 'click', '#btn-edit', function () {
    indexEdit=layer.open( {
      type: 1,
      area: [ '500px', '250px' ],
      title: '添加文章分类',
      content: $( '#dialog-edit' ).html()
    } );
    let id = $(this).attr('data-Id')
    $.ajax( {
      method: 'GET',
      url: '/my/article/cates/'+id,
      success: function ( res ) {
        if ( res.status!==0 ) {
          return layer.msg('获取失败')
        }
       layer.msg( '获取成功' )
        form.val( 'formEdit', res.data)
      }
    })

  } )


  $( 'body' ).on( 'submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax( {
      method: 'POST',
      url: '/my/article/updatecate',
      data: $( this ).serialize(),
      success: function (res) {
        if ( res.status!==0 ) {
          return layer.msg('获取失败')
        }
       layer.msg( '获取成功' )
        initArtCateList()
        layer.closeAll(  )
      }
      
    })
  } )
  
  $( 'tbody' ).on( 'click', '.btn-delete', function () {
    let id=$( this ).attr( 'data-id' )

    layer.confirm( '确认删除?', { icon: 3, title: '提示' }, function ( index ) {
      $.ajax( {
        method: 'GET',
        url: '/my/article/deletecate/'+id,
        success: function (res) {
          if ( res.status!==0 ) {
            return layer.msg(res.message)
          }
          layer.msg( res.message )
  

          initArtCateList()
        }
      })
     
      layer.close(index);
    } );
   
  } )


} )