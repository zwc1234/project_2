$( function () {
  $( '.login-form a' ).on( 'click', function () {
    $( '.login-form' ).hide()
    $('.reg-form').show()
  })
  $( '.reg-form a' ).on( 'click', function () {
    $( '.login-form' ).show()
    $('.reg-form').hide()
  } )
  let form=layui.form
 
  form.verify( {
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repwd: function ( value ) {
      let pwd=$( '.reg-form [name="password"]' ).val()
      if ( pwd!==value ) {
        return '两次密码不一致！'
      }
    }
  } )
  let layer = layui.layer
  $( '#reg-form' ).on( 'submit', function (e) {
    e.preventDefault()
    
    let data={
      username: $( '#reg-form [ name="username"]' ).val(),
      password: $( '#reg-form [name="password"]' ).val()
    }
    console.log(data);
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg( '注册成功，请登录！' )
      $( '.reg-form a' ).click()
    })
  } )
  $( '#login-form' ).submit( function (e) {
    e.preventDefault()
    $.ajax( {
      method: 'POST',
      url: '/api/login',
      data: $( this ).serialize(),
      success: function ( res ) {
        if ( res.status!==0 ) {
          return layer.msg(res.message)
        }
        localStorage.setItem( 'token', res.token )
        location.href = './index.html'
      }
      
    })
  })
})