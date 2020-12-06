$( function () {
  $( '.login-form a' ).on( 'click', function () {
    $( '.login-form' ).hide()
    $('.reg-form').show()
  })
  $( '.reg-form a' ).on( 'click', function () {
    $( '.login-form' ).show()
    $('.reg-form').hide()
  } )
  var form=layui.form
  form.verify( {
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  })
})