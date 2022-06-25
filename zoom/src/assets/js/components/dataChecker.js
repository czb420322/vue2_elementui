/**
 * 单选控件  后续扩展 多选
****/
define(function (require) {
	
    return {
    	
        data() {
            return {
            	checked: '',
            	checkedText: ''
            };
        },
        
        props: {
            data: {
                type: Array,
                default: []
            },
            checkVal: {
                type: String,
                default: ''
            },
            edit: {
                type: String,
                default: ''
            }
        },
        
        template: '<div class="common-checker-box">' + 
				      '<div v-for="item in data" @click="checkData(item)" class="common-checker-item common-tap-active checker-item" :class="{\'checker-item-selected\': item.value == checked}">{{item.text}}</div>'+
				  '</div>',
				  
        mounted: function () {
        	
        	var vm = this;
        	vm.initData();
        	
        },
        updated: function () {
        	
        	var vm = this;
        	console.log('change');
        	console.log({value: vm.checked, text: vm.checkedText});
        	vm.$emit('change', {value: vm.checked, text: vm.checkedText});
        	 
        },
        methods: {
        	
            initData() {
                var vm = this;
                if (this.data) {
                	this.data.forEach(item => {
                    	if (item.value == this.checkVal){//如果 和 赋值的数据一直时候
                    		vm.checked = item.value;
                    		vm.checkedText = item.text;
                		}
                  	});
                }
            },
            
            //点击选择
            checkData(item){
            	
            	var vm = this;
            	
        	    console.log('==============edit:'+this.edit);
                if(this.edit && ( this.edit=='1' || this.edit=='N' )){ //存在  切等于1 不可以编辑
              	   return;
                }
                
        	    //再设置当前点击项选中
            	vm.checked = item.value;
            	vm.checkedText = item.text;
            	//往上级组件通信
            	vm.$emit('input', {value: vm.checked, text: vm.checkedText});
            	vm.$emit('click', {value: vm.checked, text: vm.checkedText});
            	 
            } 
        },
        computed: {
        	
        },
        watch: {
        	
        	checkVal: function (curVal, oldVal) {
                var vm = this; 
                if (this.data) {
                    //处理列表对象
                    this.data.forEach(item => {
                    	if (item.value == curVal){
                    		vm.checked = item.value;
                    		vm.checkedText = item.text;
                    	}
                    });
                }
                
            }
        },
        
        destroyed: function () {
        	
        	console.log('destroyed');
           
        }

    }
    
});