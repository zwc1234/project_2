$( function () {
  $( '.login-form a' ).on( 'click', function () {
    $( '.login-form' ).hide()
    $('.reg-form').show()
  })
  $( '.reg-form a' ).on( 'click', function () {
    $( '.login-form' ).show()
    $('.reg-form').hide()
  })
})