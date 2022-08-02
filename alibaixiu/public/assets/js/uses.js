

$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(){
            location.reload();
        },
        error:function(){
            alert("用户添加失败")
        }
    })
    return false;
});


$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 告诉ajax方法不要解析请求参数
        processData:false,
        contentType:false,
        success:function(response){
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }

    })
});

$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        var html = template('userTpl',{data:response});
        // console.log(response[0].avatar)
        $('#userBox').html(html);
    }
});


//点击编辑时触发的事件
$('#userBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(response){
            console.log(response)
            var html = template('modifyTp1',response);
            // console.log(html);
            $('#modifyBox').html(html);
        }
    })
});

$('#modifyBox').on('submit','#modifyForm',function(){
    var formData = $(this).serialize();
    // console.log(formData);
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data:formData,
        success:function(resonse){
            location.reload();
        }
    })
    return false;
});

// 当删除按钮被点击的时候
$('#userBox').on('click','.delete',function(){
    if( confirm('您真的要删除用户吗？') ){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/' + id,
            success:function(){
                location.reload();
            }
        })
    }
});
// 获取全选按钮
var seleAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
// 当全选按钮的状态发生改变时
seleAll.on('change',function(){
    // 获取到全选按钮当前的状态
    var status = $(this).prop('checked');

    if(status){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
    // 获取到所有用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked',status);
});

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change','.userStatus',function(){
    // 获取到所有用户 在所有用户中过滤出选中的用户
    // 判断选中用户的树立和所有用户的数量是否一致
    // 如果一致，则说明所用用户都是选中的，否则不是
    var inputs = $('#userBox').find('input');
    if(inputs.length == inputs.filter(':checked').length){
        seleAll.prop('checked',true);
    }else{
        seleAll.prop('checked',false);
    }

    if(inputs.filter(':checked').length > 0){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
});

// 批量删除操作
deleteMany.on('click',function(){
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环复选框 从复选框元素的身上获取data-id属性的值
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'));
    });
    if(confirm('您真的确定要进行批量删除操作吗？')){
        $.ajax({
            type:'delete',
            url:'/users/'+ids.join('-'),
            success:function(){
                location.reload();
            }
        })
    }
})


