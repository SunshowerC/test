$(function(){
			$("#login").click(function(){	//按钮点击事件
				var phone = $("#phone").val();//手机号
				var password = $("#password").val();//密码
				var param = {
					phone: $("#phone").val(),
					password: $("#password").val()
					}
				if (!phone){
		               alert('手机号不能为空！');
		               return;
		            }
		        if (!password){
		               alert('密码不能为空！');
		               return;
		            }
				$('#login').val("登录中...");
				$('#login').prop('disabled',true);
				$.ajax({
					type: "POST", //与后端沟通好用get还是post
					dataType:"json",
					url: "http://192.168.20.21:3000/user/login",//与后端沟通好发送的地址
					cache:false,//忽略缓存
					data: param,//与后端沟通好名称，那个newDate（）是为了读取最新的数据
					success: function(data){
						$('#login').val("登录");
						$('#login').prop('disabled',false);
						if(data.statusCode == 102){//与后端沟通好什么符号表示成功
							window.location = "indexAfterLogin.html";//加载登录后的页面
							}
						else{
							alert("用户名或密码错误！");
							return false;
							}
						},
					error : function() {
							  $('#login').val('重新登录');
							  $('#login').prop('disabled',false);
							  alert('登录失败，请检查网络连接！');
							}
					
				});	
			});
		})	