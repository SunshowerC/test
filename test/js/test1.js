
var btn = document.getElementsByTagName("input");
var wrap = document.getElementsByClassName("block")[0];

function add_block() {
	
	var block = document.createElement("div");
	block.innerHTML= btn[0].value;

	switch(this.value) {
		case '左侧入':
			wrap.insertBefore(block,wrap.firstChild);
			break;
		case '右侧入':
			wrap.appendChild(block);
			break;
		case '左侧出':
			if ( !wrap.firstElementChild) {
				alert('没有存在的div可删除');
				return false;
			}
			wrap.removeChild(wrap.firstElementChild);
			break;
		default :
			if ( !wrap.lastElementChild) {
				alert('没有存在的div可删除');
				return false;
			}		
			wrap.removeChild(wrap.lastElementChild);
			break;
	}

}

function init() {
	for (var i = 1; i < btn.length; i++) {
		btn[i].onclick = add_block;
	}

	wrap.onclick = function(e) {
		var target = e.target;
		if (target.tagName.toLowerCase() == 'div') {
			wrap.removeChild(target);
		}
	}
}

init();

