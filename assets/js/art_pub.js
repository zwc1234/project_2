$( function () {
  let layer = layui.layer
  let form = layui.form
  function initCate() {
    $.ajax( {
      method: 'GET',
      url: '/my/article/cates',
      success: function ( res ) {
        if ( res.status!==0 ) {
          return layer.msg(res.message)
        }
        layer.msg( res.message )
        let htmlStr =template('tpl-cate', res)
        $( '[name=cate_id]' ).html( htmlStr )
        form.render()
      }
    })
  }
  initCate()

  initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')
  
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
  $image.cropper( options )
  $( '#btnimg' ).click( function () {
    $('#coverfile').click()
  } )
  $( '#coverfile' ).change( function (e) {
    let files=e.target.files
    if ( files.length===0 ) {
      return
    }
     let file=files[ 0 ]
  
    let  newImgURL=URL.createObjectURL( file )
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  } )
  let art_state='已发布'
  $( '#btnsave' ).click( function () {
    art_state = '草稿'
  } )
  $( '#form-pub' ).submit( function (e) {
    e.preventDefault()
    let fd=new FormData( this )
    fd.append( 'state', art_state )
    $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append( 'cover_img', blob )
    console.log(fd);
    publishArtList(fd)
  })
  } )


  function publishArtList(fd) {
    $.ajax( {
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      processData: false,
          contentType: false,
      success: function (res) {
        if ( res.status!==0 ) {
          return layer.msg(res.message)
        }
        layer.msg( res.message )
        location.href= '/arcitle/art_list.html'
      }
    })
  }
  function render() {
    let data=JSON.parse( localStorage.getItem( 'data' ) )
    $.get( '/my/article/cates', function ( res ) {
      form.val( 'form-pub', data )
      localStorage.removeItem('data')
    } )
  }
  render()
  
})