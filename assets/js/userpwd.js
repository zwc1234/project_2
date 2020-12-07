$( function () {
  let form=layui.form
  form.verify( {
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    samepwd: function (value) {
      if ( value===$( '[name=oldPwd]' ).val()) {
        return '新旧密码不能一样'
      }
    },
    repwd: function (value) {
      if ( value!==$( '[name=newPwd]' ).val() ) {
        return '两次密码不一致'
      }
    }
  } )
  
  $( '.layui-form' ).submit( function (e) {
    e.preventDefault()
    $.ajax( {
      method: 'POST',
      url: '/my/updatepwd',
      data: $( this ).serialize(),
      success: function ( res ) {
        if ( res.data!==0 ) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg( res.message )
       
      } 
    })
    $('#restBtn').click()
  } )
  
  //$('.layui-form')[0].reset()
})