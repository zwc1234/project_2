$( function () {
  let form=layui.form
  let layer=layui.layer
  form.verify( {
    nickname: function (value) {
      if ( value.length>6 ) {
        return '昵称长度在1-6字符之间'
      }
    }
  } )
  
  function userInfo() {
    $.ajax( {
      method: 'GET',
      url: '/my/userinfo',
      success:function (res) {
        if ( res.status!==0 ) {
          return layer.msg(res.message)
        }
        form.val('user-form' , res.data)
      }
    })
  }
  userInfo()
  $('#btnRest').click(function (e) {
    e.preventDefault()
    userInfo()
  })
  $( '.layui-form' ).submit( function ( e ) {
    e.preventDefault()
    $.ajax( {
      method: 'POST',
      url: '/my/userinfo',
      data: $( this ).serialize(),
      success: function (res) {
        if ( res.status!==0 ) {
          return layer.msg(res.message)
        }
        layer.msg( res.message )
        window.parent.getUserinfo()
      }
    })
    
  })

})