// 当管理员选择logo图片
$('#logo').on('change',function(){
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            console.log(response);
            $('#hiddenLogo').val(response[0].logo);
            $('#preview').attr('src',response[0].logo);
        }
    })
});

// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
});

// 向服务器发送请求 索要网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        if(response){
            $('#hiddenLogo').val(response.logo);
            $('#preview').attr('src',response.logo);
            $('input[name="title"]').val(response.title);
            $('input[name="comment"]').prop('checked',response.comment);
            $('input[name="review"]').prop('checked',response.review);
        }
    }
})