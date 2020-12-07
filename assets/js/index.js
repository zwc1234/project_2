$( function () {
  getUserinfo()
  let layer=layui.layer
  $( '#btnLognout' ).click( function ( e ) {
    layer.confirm( '确认退出?', { icon: 3, title: '提示' }, function ( index ) {
      localStorage.removeItem( 'token' )
      location.href='/login.html'

      layer.close( index );
    } );
  } )
} )

//获取用户信息
function getUserinfo() {
  $.ajax( {
    method: 'GET',
    url: '/my/userinfo',
    success: function ( res ) {
      if ( res.status!==0 ) {
        return layui.layer.msg( res.message )
      }
      renderAvator( res.data )
    },

  } )
}

function renderAvator( user ) {
  let name=user.nickname||user.username
  $( '.welcome' ).html( '欢迎&nbsp;&nbsp;'+name )
  if ( user.user_pic!==null ) {
    $( '.layui-nav-img' ).prop( 'src', user.user_pic ).show()
    $( '.text-avator' ).hide()
  } else {
    let first=name[ 0 ].toUpperCase()
    $( '.text-avator' ).html( first ).show()
    $( '.layui-nav-img' ).hide()
  }

}