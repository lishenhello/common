var lishen = {
		/**
		 * [上下左右四方滑动(上下和左右相互滑动过程中有bug。。)]
		 * @param  {[type]} element1 [遮罩盒子]
		 * @param  {[type]} element2 [ul盒子]
		 * @param  {[type]} leftX    [左边缓冲距离]
		 * @param  {[type]} rightX   [右边缓冲距离]
		 * @param  {[type]} topY     [顶部缓冲距离]
		 * @param  {[type]} bottomY  [底部缓冲距离]
		 * @return {[type]}          [description]
		 */
		swipeAll:(element1,element2,leftX,rightX,topY,bottomY)=>{
			//获取遮罩盒子的宽度。。
			const wid = element1.offsetWidth;
			console.log(wid);
			//获取ul盒子的最大宽度
			const maxWid = element2.offsetWidth;
			console.log(maxWid);
			//获取遮罩盒子的高度。。
			const Heg = element1.offsetHeight;
			//获取ul盒子的最大高度度
			const maxHeg = element2.offsetHeight;
			//设置左右上下缓冲距离(leftX,rightX,topY,bottomY)
			//记录当前位置
			let currentX=0;
			let currentY=0;
				//开始滑动，找到正确的落点
				//设置手指落下时的位置
				let startX,startY,endX,endY,distanceX,distanceY=0;
				element2.addEventListener('touchstart',function(e){
						// console.log(e);
						startX=e.touches[0].clientX;
						// console.log(startX);
						startY = e.touches[0].clientY;
						// console.log(startY);
				})
				element2.addEventListener('touchmove',function(e){
					// console.log(e);
					endX=e.touches[0].clientX;
					// console.log(endX);
					endY=e.touches[0].clientY;
					// console.log(endY);
					distanceX=endX-startX;
					distanceY=endY-startY;
					// console.log(distanceX,distanceY);
					//清除过渡效果
					removeTransition();
					// 盒子在区间内上下移动
					if(Math.abs(distanceX)<Math.abs(distanceY)){
						if(currentY+distanceY>=-(maxHeg-Heg)-bottomY && (currentY+distanceY)<=topY){
								moveY(currentY+distanceY);
						}
					}else{
						// 盒子在区间内左右移动
						if(currentX+distanceX>=-(maxWid-wid)-rightX && (currentX+distanceX)<=leftX){
								move(currentX+distanceX);
						}
					}
					
				})
				window.addEventListener('touchend',(e)=>{
					//在竖直方向上的缓冲设置
				if(Math.abs(distanceX)<Math.abs(distanceY)){
					if(currentY+distanceY<=-(maxHeg-Heg)){
						currentY=-(maxHeg-Heg);
						setTransition();
						moveY(currentY);
					}else if(currentY+distanceY>0){
						currentY=0;
						setTransition();
						moveY(currentY);
					}else{
						currentY=currentY+distanceY;
					}
					console.log(currentY);
				}else{
					//在水平方向上的缓冲设置
					if(currentX+distanceX<=-(maxWid-wid)){
						currentX=-(maxWid-wid);
						setTransition();
						move(currentX);
					}else if(currentX+distanceX>0){
						currentX=0;
						setTransition();
						move(currentX);
					}else{
						currentX=currentX+distanceX;
					}
				}
					
					//重置所有参数
					startY=0;
					startX=0;
					endX=0;
					endY=0;
					distanceX=0;
					distanceY=0;
				});
			//封装transform。transition属性
			function setTransition(){
				element2.style.transition='all .2s';
				element2.style.webkitTransition='all .2s';
			}
			function removeTransition(){
				element2.style.transition='';
				element2.style.webkitTransition='';
			}
			function moveY(y){
				element2.style.transform='translateY('+y+'px)';
				element2.style.webkitTransform='translateY('+y+'px)';	
			
			}
			function move(x){
				element2.style.transform='translateX('+x+'px)';
				element2.style.webkitTransform='translateX('+x+'px)';	
			
		}
	},
	/**
	 * [上下滑动]
	 * @param  {[type]} element1 [遮罩层盒子]
	 * @param  {[type]} element2 [ul盒子]
	 * @param  {[type]} topY     [顶部缓冲距离]
	 * @param  {[type]} bottomY  [底部缓冲距离]
	 * @return {[type]}          [description]
	 */
	swipeTB:(element1,element2,topY,bottomY)=>{
			//获取遮罩盒子的高度。。
			const Heg = element1.offsetHeight;
			console.log(Heg)
			//获取ul盒子的最大高度度
			const maxHeg = element2.offsetHeight;
			console.log(maxHeg)
			//设置左右缓冲距离(topY,bottomY)
			// console.log(left);
			//记录当前位置
			let currentX,currentY=0;
			// console.log(wid);
				//开始滑动，找到正确的落点
				//设置手指落下时的位置
				let startX,startY,endX,endY,distanceX,distanceY=0;
				element2.addEventListener('touchstart',function(e){
						// console.log(e);
						// startX=e.touches[0].clientX;
						// console.log(startX);
						startY = e.touches[0].clientY;
						// console.log(startY);
				})
				element2.addEventListener('touchmove',function(e){
					// console.log(e);
					// endX=e.touches[0].clientX;
					// console.log(endX);
					endY=e.touches[0].clientY;
					// console.log(endY);
					// distanceX=endX-startX;
					distanceY=endY-startY;
					// console.log(distanceX,distanceY);
					//清除过渡效果
					removeTransition();
					//盒子在区间内移动
					if(currentY+distanceY>=-(maxHeg-Heg)-bottomY && (currentY+distanceY)<=topY){
							moveY(currentY+distanceY);
					}
				})
				window.addEventListener('touchend',(e)=>{
					if(currentY+distanceY<=-(maxHeg-Heg)){
						currentY=-(maxHeg-Heg);
						setTransition();
						moveY(currentY);
					}else if(currentY+distanceY>0){
						currentY=0;
						setTransition();
						moveY(currentY);
					}else{
						currentY=currentY+distanceY;
					}
					console.log(currentY);
					//重置所有参数
					startY=0;
					endY=0;
					distanceY=0;
				});
			//封装transform。transition属性
			function setTransition(){
				element2.style.transition='all .2s';
				element2.style.webkitTransition='all .2s';
			}
			function removeTransition(){
				element2.style.transition='';
				element2.style.webkitTransition='';
			}
			function moveY(y){
				element2.style.transform='translateY('+y+'px)';
				element2.style.webkitTransform='translateY('+y+'px)';	
			
			}
	},
	/**
	 * [左右滑动]
	 * @param  {[type]} element1 [遮罩盒子]
	 * @param  {[type]} element2 [ul盒子]
	 * @param  {[type]} leftX    [左边缓冲距离]
	 * @param  {[type]} rightX   [右边缓冲距离]
	 * @return {[type]}          [description]
	 */
	swipeLR:(element1,element2,leftX,rightX)=>{
			//获取屏幕的宽度。。
			const wid = element1.offsetWidth;
			//获取盒子的最大宽度
			const maxWid = element2.offsetWidth;
			//设置左右缓冲距离(leftX,rightX)
			// console.log(left);
			//记录当前位置
			let currentX=0;
			// console.log(wid);
				//开始滑动，找到正确的落点
				//设置手指落下时的位置
				let startX,startY,endX,endY,distanceX,distanceY=0;
				element2.addEventListener('touchstart',function(e){
						// console.log(e);
						startX=e.touches[0].clientX;
						// console.log(startX);
						startY = e.touches[0].clientY;
						// console.log(startY);
				})
				element2.addEventListener('touchmove',function(e){
					// console.log(e);
					endX=e.touches[0].clientX;
					// console.log(endX);
					endY=e.touches[0].clientY;
					// console.log(endY);
					distanceX=endX-startX;
					distanceY=endY-startY;
					// console.log(distanceX,distanceY);
					//清除过渡效果
					removeTransition();
					//盒子在区间内移动
					if(currentX+distanceX>=-(maxWid-wid)-rightX && (currentX+distanceX)<=leftX){
							move(currentX+distanceX);
					}
				})
				window.addEventListener('touchend',(e)=>{
					if(currentX+distanceX<=-(maxWid-wid)){
						currentX=-(maxWid-wid);
						setTransition();
						move(currentX);
					}else if(currentX+distanceX>0){
						currentX=0;
						setTransition();
						move(currentX);
					}else{
						currentX=currentX+distanceX;
					}
					console.log(currentX);
					//重置所有参数
					startX=0;
					endX=0;
					distanceX=0;
				});
			//封装transform。transition属性
			function setTransition(){
				element2.style.transition='all .2s';
				element2.style.webkitTransition='all .2s';
			}
			function removeTransition(){
				element2.style.transition='';
				element2.style.webkitTransition='';
			}
			function move(x){
				element2.style.transform='translateX('+x+'px)';
				element2.style.webkitTransform='translateX('+x+'px)';	
			
			}
	},
};
