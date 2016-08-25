$(document).ready(function() {
	//对我要求助我要帮忙的处理
	var mainHelpS = $('.main-help input + span');
	//alert (mainHelpS);
	mainHelpS.each(function(index) {
		$(this).click(function() {
			$(this).addClass('hactive').siblings().removeClass('hunactive');
		});
	});
	var pubsel = $("#pubTime").find("option:selected").text(); 
	//if (pubsel == '有效期') {
	//	pubsel = '';
	//}
    $("form").submit(function(e){
    	if(pubsel == '有效期') {
		    e.preventDefault();
	    	//alert("请选择有效期");
		}
	});
	//alert(pubsel);
	//帖子内容的上传
	/*var userId =  ;
	var postType = $("input[name='postType']:checked").val()；
	var title = $("input[name='title']").val()；
	var content = $("textarea[name='content']").val()；
	var pubsel = $("#pubTime").find("option:selected").text(); 
	var phone = $("input[name='phone']").val()；
	var missionCoin = $("input[name='missionCoin']").val()；
	//处理日期
	var pubTime = new Date();
	var t = 0;
	switch (pubsel){
		case 有效期 : t =  break;
		case 1天 : t =  break;
		case 1天 : t = t =  break;
		case 1天 : t =  break;
		case 1天 : t =  break;
		case 1天 : t =  break;
		case 1天 : t =  break;
		case 1天 : t =  break;
		default : t =  break;
	} 
	pubTime.setUTCDate(pubTime.getDay()+t);
	pubTime.setUTCMonth(pubTime.getMonth());
	var formdata = new FormData();
	formdata.append("userId", userId);	
	formdata.append("postType", postType);
	formdata.append("title", title);
	formdata.append("content", content);
	formdata.append("pubTime", pubTime);
	formdata.append("phone", phone);
	formdata.append("missionCoin", missionCoin);*/
	//图片的处理
	$(function(){
		var picture = $('#picture');
		picture.click(function(){
			$("#demo").toggle(500);
		});
		$("#demo").zyUpload({
			width            :   "415px",                 // 宽度
			height           :   "400px",                 // 宽度
			itemWidth        :   "120px",                 // 文件项的宽度
			itemHeight       :   "100px",                 // 文件项的高度
			url              :   "/upload/UploadAction",  // 上传文件的路径
			/* 外部获得的回调接口 */
			onSelect: function(files, allFiles){             // 选择文件的回调方法
				console.info("当前选择了以下文件：");
				console.info(files);
				console.info("之前没上传的文件：");
				console.info(allFiles);
			},
			onDelete: function(file, surplusFiles){         // 删除一个文件的回调方法
				console.info("当前删除了此文件：");
				console.info(file);
				console.info("当前剩余的文件：");
				console.info(surplusFiles);
			},
			onSuccess: function(file){                    // 文件上传成功的回调方法
				console.info("此文件上传成功：");
				console.info(file);
			},
			onFailure: function(file){                    // 文件上传失败的回调方法
				console.info("此文件上传失败：");
				console.info(file);
			},
			onComplete: function(responseInfo){           // 上传完成的回调方法
				console.info("文件上传完成");
				console.info(responseInfo);
			}
		});
	});
	//控制层插件 
	(function($,undefined){
		$.fn.zyUpload = function(options,param){
			var otherArgs = Array.prototype.slice.call(arguments, 1);
			if (typeof options == 'string') {
				var fn = this[0][options];
				if($.isFunction(fn)){
					return fn.apply(this, otherArgs);
				}else{
					throw ("zyUpload - No such method: " + options);
				}
			}
			return this.each(function(){
				var para = {};    // 保留参数
				var self = this;  // 保存组件对象				
				var defaults = {
					width            : "700px",  					// 宽度
					height           : "400px",  					// 宽度
					itemWidth        : "100px",                     // 文件项的宽度
					itemHeight       : "120px",                     // 文件项的高度
					url              : "/upload/UploadAction",  	// 上传文件的路径
					/* 提供给外部的接口方法 */
					onSelect         : function(selectFiles, files){},// 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
					onDelete		 : function(file, files){},     // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
				};				
				para = $.extend(defaults,options);				
				this.init = function(){
					this.createHtml();  // 创建组件html
					this.createCorePlug();  // 调用核心js
				};
				var addHtml = '<div class="add_upload"><a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" title="点击添加文件" id="rapidAddImg" class="add_imgBox" href="javascript:void(0)"><div class="uploadImg"><img class="upload_image" src="assets/img/add_img.png"/></div></a></div>';
				//功能：创建上传所使用的html
				this.createHtml = function(){
					var html = '';					
					html += '<div class="upload_box">';
					html += '	<div class="upload_main single_main">';
		            html += '		<div class="status_bar">';
		            html += '			<div id="status_info" class="info">选中0个文件。</div>';
		            html += '				<div class="btns">';
		            html += '					<input id="fileImage" type="file" size="30" name="fileselect[]">';
		            html += '				</div>';
		            html += '			</div>';
		            html += '			<div id="preview" class="upload_preview">';
		            html += '				<div class="upload_middle">';
					html += '				</div>';
		            html += addHtml;
					html += '			</div>';
					html += '		</div>';
					html += '		<div class="upload_submit">';
					html += '			<button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
					html += '		</div>';
					html += '		<div id="uploadInf" class="upload_inf"></div>';
					html += '	</div>';
					html += '</div>';
					
		            $(self).append(html).css({"width":para.width,"height":para.height});
		            
		            // 初始化html之后绑定按钮的点击事件
		            this.addEvent();
				};				
				// 功能：显示统计信息和绑定继续上传和上传按钮的点击事件
				this.funSetStatusInfo = function(files){
					var size = 0;
					var num = files.length;
					$.each(files, function(k,v){
						// 计算得到文件总大小
						size += v.size;
					});					
					// 转化为kb和MB格式。文件的名字、大小、类型都是可以现实出来。
					if (size > 1024 * 1024) {                    
						size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';                
					} else {                    
						size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';                
					}  					
					// 设置内容
					$("#status_info").html("选中" + num + "个文件，还剩" + (9-num) + "个可选。");
				};				
				//功能：过滤上传的文件格式等
				this.funFilterEligibleFile = function(files){
					var arrFiles = [];  // 替换的文件数组
					for (var i = 0, file; file = files[i]; i++) {
						if (file.size >= 1024 * 1024 * 2) {
							alert('您这个"'+ file.name +'"文件大小过大');	
						} else {
							// 在这里需要判断当前所有文件中
							arrFiles.push(file);	
						}
					}
					return arrFiles;
				};				
				//功能： 处理参数和格式上的预览html
				this.funDisposePreviewHtml = function(file, e){
					var html = "";			
					// 处理配置参数删除按钮
					var delHtml = "";
					delHtml = '<span class="file_del" data-index="'+file.index+'" title="删除"></span>';
					// 图片上传的是图片还是其他类型文件
					if (file.type.indexOf("image") == 0) {
						html += '<div id="uploadList_'+ file.index +'" class="upload_append_list fl">';
						html += '	<div class="file_bar">';
						html += '		<div style="padding:5px;">';
						html += delHtml;  
						html += '		</div>';
						html += '	</div>';
						html += '	<a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" href="#" class="imgBox">';
						html += '		<div class="uploadImg">';				
						html += '			<img id="uploadImage_'+file.index+'" class="upload_image" src="' + e.target.result + '"/>';                                                                 
						html += '		</div>';
						html += '	</a>';
						html += '	<p id="uploadProgress_'+file.index+'" class="file_progress"></p>';
						html += '	<p id="uploadFailure_'+file.index+'" class="file_failure">上传失败，请重试</p>';
						html += '	<p id="uploadSuccess_'+file.index+'" class="file_success"></p>';
						html += '</div>';                	
					}else{
						alert('请上传PNG，JPG或GIF格式的图片');
					}					
					return html;
				};				
				//功能：调用核心插件
				this.createCorePlug = function(){
					var params = {
						fileInput: $("#fileImage").get(0),
						uploadInput: $("#publish").get(0),
						url: $("#uploadForm").attr("action"),
						filterFile: function(files) {
							// 过滤合格的文件
							return self.funFilterEligibleFile(files);
						},
						onSelect: function(selectFiles, allFiles) {
							para.onSelect(selectFiles, allFiles);  // 回调方法
							self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());  // 显示统计信息
							var html = '', i = 0;
							var flag = 0; 
							// 组织预览html
							var funDealtPreviewHtml = function() {
								file = selectFiles[i];
								if (file) {
									var reader = new FileReader();
									
									reader.onload = function(e) {
										// 处理下配置参数和格式的html
										html += self.funDisposePreviewHtml(file, e);								
										i++;
										var num = allFiles.length;
										// 再接着调用此方法递归组成可以预览的html
										if (num > 2) {
											flag = 1;
											funDealtPreviewHtml();
											$(".add_upload").remove();	
										} else {
											funDealtPreviewHtml();
										}
									}
									reader.readAsDataURL(file);
								} else {
									// 走到这里说明文件html已经组织完毕，要把html添加到预览区
									funAppendPreviewHtml(html);
								}
							};							
							// 添加预览html
							var funAppendPreviewHtml = function(html){
								// 添加到添加按钮前
								$(".upload_middle").before(html);
								// 绑定删除按钮
								funBindDelEvent();
								funBindHoverEvent();
							};
							// 绑定删除按钮事件
							var funBindDelEvent = function(){
								if($(".file_del").length>0){
									// 删除方法
									$(".file_del").click(function() {
										if (flag == 1) {
											$(".upload_middle").after(addHtml);
											flag = 0;
											// 绑定添加点击事件
											$("#rapidAddImg").bind("click", function(e){
												$("#fileImage").click();
								            });
										}
										ZYFILE.funDeleteFile(parseInt($(this).attr("data-index")), true);
										return false;	
									});
								}		
							};						
							// 绑定显示操作栏事件
							var funBindHoverEvent = function(){
								$(".upload_append_list").hover(
									function (e) {
										$(this).find(".file_bar").addClass("file_hover");
									},function (e) {
										$(this).find(".file_bar").removeClass("file_hover");
									}
								);
							};							
							funDealtPreviewHtml();		
						},
						onDelete: function(file, files) {
							// 移除效果
							$("#uploadList_" + file.index).fadeOut();
							// 重新设置统计栏信息
							self.funSetStatusInfo(files);
							console.info("剩下的文件");
							console.info(files);
						},
					};
					
					ZYFILE = $.extend(ZYFILE, params);
					ZYFILE.init();
				};			
				//功能：绑定事件
				this.addEvent = function(){			
					// 如果快捷添加文件按钮存在
					if($("#rapidAddImg").length > 0){
						// 绑定添加点击事件
						$("#rapidAddImg").bind("click", function(e){
							$("#fileImage").click();
			            });
					}
				};		
				// 初始化上传控制层插件
				this.init();
			});
		};
	})(jQuery);
	//核心层插件
	var ZYFILE = {
		fileInput : null,             // 选择文件按钮dom对象
		uploadInput : null,           // 上传文件按钮dom对象
		url : "",  					  // 上传action路径
		uploadFile : [],  			  // 需要上传的文件数组
		lastUploadFile : [],          // 上一次选择的文件数组，方便继续上传使用
		perUploadFile : [],           // 存放永久的文件数组，方便删除使用
		fileNum : 0,                  // 代表文件总个数，因为涉及到继续添加，所以下一次添加需要在它的基础上添加索引
		/* 提供给外部的接口 */
		filterFile : function(files){ // 提供给外部的过滤文件格式等的接口，外部需要把过滤后的文件返回
			return files;
		},
		onSelect : function(selectFile, files){      // 提供给外部获取选中的文件，供外部实现预览等功能  selectFile:当前选中的文件  allFiles:还没上传的全部文件
			
		},
		onDelete : function(file, files){            // 提供给外部获取删除的单个文件，供外部实现删除效果  file:当前删除的文件  files:删除之后的文件
			
		},
		// 获取文件
		funGetFiles : function(e){  
			var self = this;
			// 从事件中获取选中的所有文件
			var files = e.target.files || e.dataTransfer.files;
			self.lastUploadFile = this.uploadFile;
			this.uploadFile = this.uploadFile.concat(this.filterFile(files));
			var tmpFiles = [];			
			// 因为jquery的inArray方法无法对object数组进行判断是否存在于，所以只能提取名称进行判断
			var lArr = [];  // 之前文件的名称数组
			var uArr = [];  // 现在文件的名称数组
			$.each(self.lastUploadFile, function(k, v){
				lArr.push(v.name);
			});
			$.each(self.uploadFile, function(k, v){
				uArr.push(v.name);
			});			
			$.each(uArr, function(k, v){
				// 获得当前选择的每一个文件   判断当前这一个文件是否存在于之前的文件当中
				if($.inArray(v, lArr) < 0){  // 不存在
					tmpFiles.push(self.uploadFile[k]);
				}
			});			
			// 如果tmpFiles进行过过滤上一次选择的文件的操作，需要把过滤后的文件赋值
			//if(tmpFiles.length!=0){
				this.uploadFile = tmpFiles;
			//}			
			// 调用对文件处理的方法
			this.funDealtFiles();			
			return true;
		},
		// 处理过滤后的文件，给每个文件设置下标
		funDealtFiles : function(){
			var self = this;
			// 目前是遍历所有的文件，给每个文件增加唯一索引值
			$.each(this.uploadFile, function(k, v){
				// 因为涉及到继续添加，所以下一次添加需要在总个数的基础上添加
				v.index = self.fileNum;
				// 添加一个之后自增
				self.fileNum++;
			});
			// 先把当前选中的文件保存备份
			var selectFile = this.uploadFile;  
			// 要把全部的文件都保存下来，因为删除所使用的下标是全局的变量
			this.perUploadFile = this.perUploadFile.concat(this.uploadFile);
			// 合并下上传的文件
			this.uploadFile = this.lastUploadFile.concat(this.uploadFile);	
			// 执行选择回调
			this.onSelect(selectFile, this.uploadFile);
			console.info("继续选择");
			console.info(this.uploadFile);
			return this;
		},
		// 处理需要删除的文件  isCb代表是否回调onDelete方法  
		// 因为上传完成并不希望在页面上删除div，但是单独点击删除的时候需要删除div ，所以用isCb做判断
		funDeleteFile : function(delFileIndex, isCb){
			var self = this;  // 在each中this指向没个v  所以先将this保留
			
			var tmpFile = [];  // 用来替换的文件数组
			// 合并下上传的文件
			var delFile = this.perUploadFile[delFileIndex];
			console.info(delFile);
			// 目前是遍历所有的文件，对比每个文件  删除
			$.each(this.uploadFile, function(k, v){
				if(delFile != v){
					// 如果不是删除的那个文件 就放到临时数组中
					tmpFile.push(v);
				}else{
					
				}
			});
			this.uploadFile = tmpFile;
			if(isCb){  // 执行回调
				// 回调删除方法，供外部进行删除效果的实现
				self.onDelete(delFile, this.uploadFile);
			}
			
			console.info("还剩这些文件没有上传:");
			console.info(this.uploadFile);
			return true;
		},
		// 上传多个文件
		funUploadFiles : function(){
			var self = this;  // 在each中this指向没个v  所以先将this保留
			// 遍历所有文件  ，在调用单个文件上传的方法
			$.each(this.uploadFile, function(k, v){
				self.funUploadFile(v);
			});
		},
		// 上传单个个文件
		funUploadFile : function(file){
			var self = this;  // 在each中this指向没个v  所以先将this保留
			formdata.append("fileList", file);	        		
		},
		// 返回需要上传的文件
		funReturnNeedFiles : function(){
			return this.uploadFile;
		},
		// 初始化
		init : function(){  // 初始化方法，在此给选择、上传按钮绑定事件
			var self = this;  // 克隆一个自身
			// 如果选择按钮存在
			if(self.fileInput){
				// 绑定change事件
				this.fileInput.addEventListener("change", function(e) {
					self.funGetFiles(e); 
				}, false);	
			}
			// 如果上传按钮存在
			if(self.uploadInput){
				// 绑定click事件
				this.uploadInput.addEventListener("click", function(e) {
					self.funUploadFiles(e); 
					var xhr = new XMLHttpRequest();			
					xhr.open("POST",self.url, true);
					xhr.setRequestHeader("X_FILENAME", file.name);
					xhr.send(formdata);
				}, false);	
			}
		}
	};
	//表情的处理
	$(function() {
		$('.emotion').qqFace({
			id : 'facebox', //表情盒子的ID
			assign:'content', //给那个控件赋值
			path:'assets/img/face/'	//表情存放的路径
		});
	});
	// 自动播放的焦点图
	(function () {
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var iNow = 0;
		var timer = null;		
		fnFade();
		aOlLi.hover(function (){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);		
		function autoPlay() {
			timer = setInterval(function () {
				iNow++;
				iNow%=3;
				fnFade();
			}, 2000);
		}
		autoPlay();
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');
					aOlLi.eq(i).addClass('unactive');
				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).removeClass('unactive');
					aOlLi.eq(i).addClass('active');
				}
			});
		}
	})();
	//切换帖子，求助广场的操作
	(function () {
		var mainCardLi = $('#main-card li');
		var lastestCard = $('#lastest-card');
		var askHelpGround = $('#ask-help-ground');
		var helpGround = $('#help-ground');
		var ic = 0;
		lastestCard.click(function(){
			//alert('a');
			
		});
		askHelpGround.click(function(){
			
		});
		askHelpGround.click(function(){
			
		});
		//改变样式
		mainCardLi.each(function(index) {
			$(this).click(function() {
				$(this).addClass('cactive').siblings().removeClass('cactive');
			});
			$(this).hover(function() {
				$(this).addClass('chover').siblings().removeClass('chover');
			});
		});

	})();
	//切换红人榜，富豪榜的操作
	(function () {
		var sidList = $('#side-list');
		var sidListLi = $('#side-list li');
		var sidListD = $('#side-list div');
		var redPerson = $('#red-person');
		var richPerson = $('#rich-person');
		redPerson.click(function (){
			
			//alert('a');
		});
		richPerson.click(function (){
			
		});
		//改变样式
		sidListLi.each(function(index) {
			$(this).click(function() {
				$(this).addClass('lactive').siblings().removeClass('lactive');
			});
			$(this).hover(function() {
				$(this).addClass('chover').siblings().removeClass('chover');
			});
		});
	})();
	//点击刷新的操作
	(function () {
		var renovate = $('#renovate');
		renovate.click(function (){
			//alert('a');
			//changeS1(0);
		});
	})();
	//个人信息的获取
	//分页的效果和获取
});
$(document).ready(function() {
	//对我要求助我要帮忙的处理
	var postType = 1;
	var nopostType = 0;
	$('#main-help li').each(function(index) {
		$(this).click(function() {
			nopostType = index;
			if (nopostType == 0) {
				$("input[name='missionCoin']").attr('placeholder','悬赏时间币');
			} else {
				$("input[name='missionCoin']").attr('placeholder','支付时间币');
			}
		});
	});
	$("form").submit(function(e){
		var userId = 1;
		var postType = 1;
		var title = $("input[name='title']").val();
		var content = $("textarea[name='content']").val();
		var pubsel = $("#pubTime").find("option:selected").val(); 
		//alert("pubsel"+pubsel)
		//alert(pubsel);
		var phone = $("input[name='phone']").val();
		var missionCoin = $("input[name='missionCoin']").val();
		if($('#main-help li:eq(1)').hasClass('active')) {
			postType = 0;
		}
		//处理日期
		if(pubsel == 0) {
		    e.preventDefault();
	    	alert("请选择有效期");
		}
		var pubTime = new Date();
		var d = pubTime.getDate() + pubsel;
	    //document.write(pubTime);
		pubTime.setUTCDate(d);
		//alert(pubsel);
		if(title == '') {
		    e.preventDefault();
		}
		if(content == '') {
		    e.preventDefault();
		}
		if (true) {}
		//帖子内容的上传
		var formdata = new FormData();
		formdata.append("userId", userId);	
		formdata.append("postType", postType);
		formdata.append("title", title);
		formdata.append("content", content);
		formdata.append("pubTime", pubTime);
		formdata.append("phone", phone);
		formdata.append("missionCoin", missionCoin);
		var xhr = new XMLHttpRequest();			
		xhr.open("POST",self.url, true);
		xhr.setRequestHeader("X_FILENAME", file.name);
		xhr.send(formdata);
	});
	//图片的处理
	//表情的处理
	$(function() {
		$('.emotion').qqFace({
			id : 'facebox', //表情盒子的ID
			assign:'content', //给那个控件赋值
			path:'assets/img/face/'	//表情存放的路径
		});
	});
	// 自动播放的焦点图
	(function () {
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var iNow = 0;
		var timer = null;		
		fnFade();
		aOlLi.hover(function (){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);		
		function autoPlay() {
			timer = setInterval(function () {
				iNow++;
				iNow%=3;
				fnFade();
			}, 2000);
		}
		autoPlay();
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');
					aOlLi.eq(i).addClass('unactive');
				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).removeClass('unactive');
					aOlLi.eq(i).addClass('active');
				}
			});
		}
	})();
	//切换帖子，求助广场的操作
	(function () {
		var mainCardLi = $('#main-card li');
		var lastestCard = $('#lastest-card');
		var askHelpGround = $('#ask-help-ground');
		var helpGround = $('#help-ground');
		var ic = 0;
		lastestCard.click(function(){
			//alert('a');
			
		});
		askHelpGround.click(function(){
			
		});
		askHelpGround.click(function(){
			
		});
		//改变样式
		mainCardLi.each(function(index) {
			$(this).click(function() {
				$(this).addClass('cactive').siblings().removeClass('cactive');
			});
			$(this).hover(function() {
				$(this).addClass('chover').siblings().removeClass('chover');
			});
		});

	})();
	//切换红人榜，富豪榜的操作
	(function () {
		var sidList = $('#side-list');
		var sidListLi = $('#side-list li');
		var sidListD = $('#side-list div');
		var redPerson = $('#red-person');
		var richPerson = $('#rich-person');
		redPerson.click(function (){
			
			//alert('a');
		});
		richPerson.click(function (){
			
		});
		//改变样式
		sidListLi.each(function(index) {
			$(this).click(function() {
				$(this).addClass('lactive').siblings().removeClass('lactive');
			});
			$(this).hover(function() {
				$(this).addClass('chover').siblings().removeClass('chover');
			});
		});
	})();
	//点击刷新的操作
	(function () {
		var renovate = $('#renovate');
		renovate.click(function (){
			//alert('a');
			//changeS1(0);
		});
	})();
	//个人信息的获取
	//分页的效果和获取
});
