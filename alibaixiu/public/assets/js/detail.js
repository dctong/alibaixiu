// 从地址栏中获取文章id
var postId = getUrlParams('id');
// 评论是否经过人工审核
var review;
$.ajax({
    type:'get',
    url:'/posts/'+postId,
    success:function(response){
        var html = template('postTpl',response);
        // console.log(html);
        $('#article').html(html);
    }
});

// 当点赞按钮发生点击事件时
$('#article').on('click','#like',function(){
    $.ajax({
        type:'post',
        url:'/posts/fabulous/' + postId,
        success:function(){
        }
    })
});

// 获取网站的配置信息
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        // 判断管理员是否开启评论功能
        if(response.comment){
            review = response.review;
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
});

// 评论提交事件
$('#comment').on('submit','form',function(){
    // 获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    // 代表评论的状态
    var state;
    if(review){
        // 要经过人工审核
        state = 0;
    }else{
        // 不要经过人工审核
        state = 1;
    }
    // 向服务器端发送请求 执行添加评论操作
    $.ajax({
        type:'post',
        url:'/comments',
        data:{
            content:content,
            post:postId,
            state:state
        },
        success:function(){
            alert('评论成功')
            location.reload();
        },
        error:function(){
        }
    })
    return false;
})