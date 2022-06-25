/****
 * 选择控件 1.0
 */
+ function($) {
    "use strict";
    
    function StackSelect(element, options){
    	this.$element = $(element);
    	this.options = $.extend(options || {});
    	this.init();
    }
    
    StackSelect.prototype.setValue = function (value) {
    	
    	 var _this = this;
    	 
    	 if(value){
    		 
    		 var valueArrays = value.split(' ');
    		 
    		 if(valueArrays && valueArrays.length>0){
    			 
    			 _this.defaultSet.splice(0, _this.defaultSet.length);
    			 
    			 for (var i = 0; i < valueArrays.length; i++){
    				 _this.defaultSet.push({"id" : valueArrays[i],"code" : "","name" : "", "level" : ""});
    			 }
    			 
    		 }
    		 
    	 }
    	 
    };
    
    StackSelect.prototype.getLastValue = function (callback) {
    	 var _this = this;
    	 if(_this.defaultSet && _this.defaultSet.length>0){
    		 var len = _this.defaultSet.length;
    		 if(len > 0 && callback){
    			 callback(_this.defaultSet[len-1]);
    		 }
    	 }
    };
    
    StackSelect.prototype.init = function () {
    	
        var _this = this,
            options = _this.options;

        if (typeof options.data == 'undefined') {
            return;
        }
        
        _this.defaultSet = [];

        _this.value = options.value;//选中值
        
        if(_this.value){
	   		 var valueArrays = _this.value.split(' ');
	   		 if(valueArrays && valueArrays.length>0){
	   			 _this.defaultSet.splice(0, _this.defaultSet.length);
	   			 for (var i = 0; i < valueArrays.length; i++){
	   				 _this.defaultSet.push({"id" : valueArrays[i], "code" : "", "name" : "", "level" : ""});
	   			 }
	   		 }
	   	 }
        
        _this.items = options.data;
        
        _this.navIndex = 0;
        
        _this.$element.on('click', function (event) {
			event.stopPropagation();
			_this.open();
		});
        
        _this.$mask = $('<div class="modal-overlay modal-overlay-visible"></div>');

        _this.$stackElement = $('' + 
            '<div class="picker-stack-select">' + 
            '    <div class="picker-stack-header">' + 
            '    	<div class="header-cancel">&nbsp;</div>' + 
            '    	<div class="header-title">'+(!options.title?"请选择":options.title)+'</div>' + 
            '    	<div class="header-confirm">&nbsp;</div>' + 
            '    </div>' + 
            '    <div class="picker-stack-crumbs">' + 
            '        <span href="javascript:;"></span>' + 
            '    </div>' + 
            '    <div class="picker-stack-content">' + 
            '     <div class="picker-stack-column">' + 
            '      <ul class="picker-select-content">' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '        <li class="picker-select-item">' + 
            '            <div class="stack-select-item-box"></div>' + 
            '        </li>' + 
            '       </ul>' + 
            '     </div>' + 
            '    </div>' + 
            '</div>');
        
        _this.$itemBox = _this.$stackElement.find('.stack-select-item-box');

        _this.$stackElement.on('click.stack.select', '.picker-stack-crumbs span', function () {
            var $this = $(this);
            $this.addClass('crt').siblings().removeClass('crt');
            _this.indexOffView($this.index());
            //$this.index() < 2 ? _this.backOffView() : _this.ForwardView(true);
        });
        
    };

    StackSelect.prototype.open = function () {
    	
        var _this = this;
        
        $('.page').append(_this.$mask);
        $('.page').append(_this.$stackElement);

        _this.$mask.on('click.stack.select.mask', function () {
            _this.close();
        });

        var $stackElement = _this.$stackElement;

        
        $stackElement.find('.picker-stack-column').removeClass('column-move-animate');
        $stackElement.find('.picker-select-content').removeClass('itemselect-next itemselect-prev');

        //根据值初始化
        if(_this.defaultSet && _this.defaultSet.length > 0){
        	
        	//end
        	for (var int = 0; int < _this.defaultSet.length; int++) {
        		 _this.loadData(int);
        	     _this.indexOffView(int);
        		 if(int<_this.defaultSet.length-1){
        			 _this.setNavTxt(int, _this.defaultSet[int], 1);
        		 } else {
        			 _this.setNavTxt(int, _this.defaultSet[int], 0);
        		 }
			}
        	
        } else {
        	
        	 _this.loadData(0);
        	 $stackElement.find('.picker-stack-crumbs span').eq(0).addClass('crt').html('请选择');
        	 
        }
        
        $stackElement.addClass('stack-show');
        
    };

    StackSelect.prototype.close = function () {
    	
        var _this = this;
        
        _this.$mask.remove();
        _this.$stackElement.removeClass('stack-show').find('.picker-stack-crumbs span').removeClass('crt').html('');
        _this.$stackElement.find('.picker-stack-crumbs').html('<span href="javascript:;"></span>');
        
        _this.$itemBox.html('');
        _this.indexOffView(0);
        _this.$stackElement.remove();
        
    };

   
    StackSelect.prototype.setNavTxt = function (index, obj, next) {
    	var _this = this;
    	
    	//console.log('setNavTxt');
    	//console.log(obj);
    	
    	var $nav = _this.$stackElement.find('.picker-stack-crumbs');
        var $nava = $nav.find('span');
        var $navaLeng = $nava.length;
        
        
        var selId = (obj.code?obj.code:'') + "_" + (obj.name?obj.name:'') + "_" + (obj.level?obj.level:'');
        
        $nava.eq(index).attr('data-id', selId);
        
        $nava.eq(index).attr('data-code', obj.code?obj.code:'');
        $nava.eq(index).attr('data-name', obj.name?obj.name:'');
        $nava.eq(index).attr('data-level', obj.level?obj.level:'');
         
        $nava.eq(index).html(obj.name);
        
        $nava.removeClass('crt');
        
        if(index == $navaLeng-1){
        	if(next==1){
        		$nav.append($('<span class="crt" href="javascript:;">请选择</span>'));
        	}else{
        		$nava.eq(index).addClass('crt');
        	}
        }else{
        	var start = index + 1;
        	for (var i = start; i < $nava.length; i++) {
				if(i==start && next==1){
					
					$nava.eq(i).addClass('crt').html('请选择');
					$nava.eq(i).attr('data-id', '');
					$nava.eq(i).attr('data-code', '');
				    $nava.eq(i).attr('data-name', '');
				    $nava.eq(i).attr('data-level', '');
			 
				}else{
					
					$nava.eq(i).remove();
					
				}
			}
        }
        //index < 2 && $nav.removeClass('crt');
        
    };

    
    StackSelect.prototype.indexOffView = function (index) {
    	
    	var itemselectContent = this.$stackElement.find('.picker-stack-column');
    	
    	itemselectContent.addClass('column-move-animate');
    	itemselectContent.css('-webkit-transform', 'translate(-'+(parseInt(index)*100)+'%, 0)');
    	itemselectContent.css('transform', 'translate(-'+(parseInt(index)*100)+'%, 0)');
    	
    };

    StackSelect.prototype.bindItemEvent = function () {
    	
        var _this = this, $stackElement = _this.$stackElement;

        $stackElement.on('click.stack.select', '.stack-select-item-box a', function () {
        	
            var $this = $(this);
            
            if ($this.hasClass('crt'))return;
            $this.addClass('crt').siblings().removeClass('crt');

            var tag = $this.data('items').tag;
            var items = $this.data('items').items;
            
			if(items && items.length > 0){
				
				_this.setNavTxt(tag, {id : $this.attr('data-id'), code : $this.attr('data-code'), name : $this.attr('data-name'), level : $this.attr('data-level')}, 1);
				_this.loadData(tag + 1);
                _this.indexOffView(tag + 1);
                $stackElement.find('.stack-select-item-box').eq(tag + 1).find('a').removeClass('crt');
                
			}else{
				
				_this.setNavTxt(tag, {id : $this.attr('data-id'), code : $this.attr('data-code'), name : $this.attr('data-name'), level : $this.attr('data-level')}, 0);
				
				var $nav = $stackElement.find('.picker-stack-crumbs span');
				
				_this.defaultSet.splice(0, _this.defaultSet.length);
				
				if($nav && $nav.length>0){
					for (var j = 0; j < $nav.length; j++) {
						_this.defaultSet.push({id : $nav.eq(j).attr('data-id'), code : $nav.eq(j).attr('data-code'), name : $nav.eq(j).attr('data-name'), level : $nav.eq(j).attr('data-level') });
					}
				}
	            _this.returnValue();
			}
            
        });
    };

    StackSelect.prototype.returnValue = function () {
    	
        var _this = this;
        
        if(_this.options.callBackSelect){
        	
        	var allArray = [], codeArray = [], nameArray = [], levelArray = [];
        	if(_this.defaultSet && _this.defaultSet.length>0){
        		for (var index = 0; index < _this.defaultSet.length; index++) {
        			
        			allArray.push(_this.defaultSet[index].id);
        			codeArray.push(_this.defaultSet[index].code);
        			nameArray.push(_this.defaultSet[index].name);
        			levelArray.push(_this.defaultSet[index].level);
        			
        		}
        	}
        	
        	_this.options.callBackSelect({
        		element: _this,
        		
        		selectObj : _this.defaultSet,
        		lastObj : _this.defaultSet[_this.defaultSet.length-1],
        		
        		allPath : allArray.join(' '),
        		codePath : codeArray.join(' '),
        		namePath : nameArray.join(' '),
        		levelPath : levelArray.join(' ')
        		
             });
        	
        }
        
        _this.close();
        
    };

    //自动滚动
    StackSelect.prototype.scrollPosition = function (index) {
    	
        var _this = this,
            $itemBox = _this.$itemBox.eq(index),
            itemHeight = $itemBox.find('a.crt').height(),
            itemBoxHeight = $itemBox.parent().height();

        $itemBox.parent().animate({
            scrollTop: $itemBox.find('a.crt').index() * itemHeight - itemBoxHeight / 3
        }, 0, function () {
            _this.bindItemEvent();
        });
        
    };

    StackSelect.prototype.fillItems = function (index, arr) {
    	
        var _this = this;

        _this.$itemBox.eq(index).html(arr).parent().animate({scrollTop: 0}, 10);

        _this.scrollPosition(index);
        
    };

    StackSelect.prototype.loadData = function (index) {
    	
        var _this = this;
        
        //第一次取得全局
        var itemData = _this.items;
        
        //二级子对象 获取绑定
        if(index>0){
        	var acrto = _this.$itemBox.eq(index-1).find('a.crt');
        	if(acrto && acrto.length>0){
        		itemData = acrto.data('items').items;
        	}
        }
        
        var arr = [];
        
        $.each(itemData, function (k, v) {
        	
        	var subs = [];
        	if(v.subs && v.subs.length>0){ subs = v.subs; }
        	
        	var _selectProv = {};
        	if(_this.defaultSet && _this.defaultSet.length >= (index+1)){
        		_selectProv = _this.defaultSet[index];
        	}
        	
        	//id自动根据code和那个还有leve生成
        	//v.code?v.code:''
        	var vid = ((v.code?v.code:'') + '_' + (v.name?v.name:'')+ '_' + (v.level?v.level:''));
        	
        	var isSelect = vid == _selectProv.id;
        	
        	if(isSelect){
        		if(!_selectProv.code) _selectProv.code = v.code?v.code:'';
            	if(!_selectProv.name)  _selectProv.name = v.name?v.name:'';
            	if(!_selectProv.level)  _selectProv.level =v.level?v.level:'';
        	}
        	
        	if(subs && subs.length>0) {
        		
        		var dataTemp = $('<a data-id="' + vid + '" data-code="' + (v.code ? v.code:'') + '" data-name="' + (v.name ? v.name:'')+ '" data-level="' + (v.level ? v.level:'') + '" class="' + (isSelect ? 'crt' : '') + '" href="javascript:;"><span>' + (v.name ? v.name:'') + '</span></a>');
        		dataTemp.data('items', { items : subs, tag : index });
        		arr.push(dataTemp);
        		
        	} else {
        		
        		var dataTemp = $('<a data-id="' + vid + '" data-code="' + (v.code ? v.code:'') + '" data-name="' + (v.name ? v.name:'')+ '" data-level="' + (v.level ? v.level:'') + '" class="nolink ' + (isSelect ? 'crt' : '') + '" href="javascript:;"><span>' + (v.name ? v.name:'') + '</span></a>');
        		dataTemp.data('items', { items : subs, tag : index });
        		arr.push(dataTemp);
        		
        	}
            
        });
        
        _this.fillItems(index, arr);
        
    };
 
    function Plugin (option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var $this = $(this),
                stackSelect = $this.data('stack.select');

            if (!stackSelect) {
                $this.data('stack.select', (stackSelect = new StackSelect(this, option)));
            }

            if (typeof option == 'string') {
                stackSelect[option] && stackSelect[option].apply(stackSelect, args);
            }
        });
    }

    $.fn.stackSelect = Plugin;
    
}(Zepto);