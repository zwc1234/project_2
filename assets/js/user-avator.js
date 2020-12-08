$( function () {
   // 1.1 获取裁剪区域的 DOM 元素
   var $image = $('#image')
   // 1.2 配置选项
   const options = {
     // 纵横比
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
   }
 
   // 1.3 创建裁剪区域
  $image.cropper( options )
  $( '#btnChooseImg' ).click( function () {
    $('#file').click()
  } )
  $( '#file' ).on( 'change', function ( e ) {
    console.log(e);
    let fileList=e.target.files
    if ( fileList.length === 0 ) {
      return layui.layer.msg('请选择图片!')
    }
    let file=fileList[ 0 ]
    let url=URL.createObjectURL( file )
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', url)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域

  } )
  
  $( '#btnUpload' ).click( function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL( 'image/png' )       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax( {
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar:dataURL
      },
      success: function (res) {
        if ( res.status!==0) {
          return layui.layer.msg('图片更新失败')
        }
        layui.layer.msg('图片更新成功')
        window.parent.getUserinfo()
      }
    })
  })
})