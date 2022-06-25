/**
 *  下拉多选选择控件，直接页面<stack-select/>引用
 *  入参
 *  value
 *      v-model绑定对象值  可双向传递
 *  params
 *      下拉选项,格式[{id:'',code:'',name:'',level:'',subs:[{}]}]
 *  placeholder
 *      显示文本
 */
define(function (require) {
	
    require('sm-select-picker');

    return {
        template: '<input type="text" readonly="readonly" :id="id" @input="dataPull" @touchstart="initPicker" @mousedown ="initPicker" v-model="currValue" :placeholder="placeholder"/>',
        
        props: {
            value: "", //选中数据
            title: "", //标题
            edit: "", //是否可以编辑
            params: Array, //标题
            placeholder: "" //输入提示
        },
        
        data() {
            return {
                displayValue: "",
                currValue: '',
                id: '',
            }
        },
        
        created: function () {
        	
            this.id = this.uuid();
            
        },
        
        mounted: function () {
        	
	    	  var vm = this; 
	    	  let value = $.trim(vm.value);
	    	  if(value){
	    		  let valueArray = $.trim(value).split(' ');
	              var names = "";
	              //触发 @input 数据  放对象
	              for(var i = 0; i < valueArray.length; i++){
	              	  names = names + valueArray[i].split('_')[1] + "  ";
	              }
	              vm.currValue = names;
	    	  } 
	    	  
        },

        updated() {

        },

        methods: {
        	
            initPicker() {
            	
                var vm = this; 
                
                console.log('==============edit:'+this.edit);
                if(this.edit && ( this.edit=='1' || this.edit=='N' )){ //存在  切等于1 不可以编辑
                	return;
                }
                
	            //根据传入的数据 进行动态渲染  自动创建id
                $(document.getElementById(this.id)).stackSelect({
                	
                    title: vm.title != null ? vm.title : "请选择",
                    data: this.params,
                    value: vm.value,
                    callBackSelect: function (ret) {
                    	
                        console.log(ret);
                        
                        var _this = this;
                        _this.value = ret.allPath;
                        
                        ret.element.$element.val(ret.allPath);
                        ret.element.$element[0].dispatchEvent(new Event('input'));
                        
                        vm.$emit('change', {value: ret.codePath, text: ret.namePath});
                            
                    }
                });

            },
            uuid() {
            	
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;
                
            },
            //数据上传
            dataPull() {
                let vm = this
                let valueArray = vm.currValue.split(' ');
                var names = "";
                //触发 @input 数据  放对象
                for(var i = 0; i < valueArray.length; i++){
                	names = names + valueArray[i].split('_')[1] + "  ";
                }
                
                
                vm.$emit('input', {value: vm.currValue, text: names});
                vm.currValue = names;
                
            }
        },
        watch: { //监控
        	
            value: function (curVal, oldVal) {
            	
                let vm = this;
                let value = $.trim(vm.value);
                console.log('watch###:'+value);
                
                if(value){
 	  	    	   let valueArray = $.trim(value).split(' ');
 	  	           var names = "";
 	  	           //触发 @input 数据  放对象
 	  	           for(var i = 0; i < valueArray.length; i++){
 	  	               names = names + valueArray[i].split('_')[1] + "  ";
 	  	           }
 	  	           vm.currValue = names;
 	  	    	}
                
                 
            }
         },
        destroyed: function () {

        }
        

    }
})