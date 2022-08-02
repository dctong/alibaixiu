// 向服务器端发送请求   获取文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        var html = template('postsTpl',response);
        $('#postsBox').html(html);
        var page = template('pageTpl',response);
        $('#page').html(page);
        // console.log(response)
    }
});



//分页
function changePage(page){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success:function(response){
            var html = template('postsTpl',response);
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#page').html(page);
        }
    });
}

// 向服务器端发送请求  索要分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        var html = template('categoryTpl',{data:response});
        $('#categoryBox').html(html);
    }
});

// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit',function(){
    // 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    // 向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(response){
            var html = template('postsTpl',response);
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#page').html(page);
        }
    })
    return false;
});


// 当删除按钮被点击的时候
$('#postsBox').on('click','.delete',function(){
    // 弹出删除确认框  和管理员确认是否真的要进行删除操作
    if(confirm('您真的要进行删除操作吗？')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/posts/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})