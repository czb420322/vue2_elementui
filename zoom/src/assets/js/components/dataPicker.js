/**
 *  下拉选择控件，直接页面<data-picker/>引用
 *  入参
 *  value
 *      可v-model绑定对象值  可双向传递
 *      v-model绑定是返回的是个{value:'',displayValue:''}对象
 *      可使用v-bind:value绑定传入参数  v-bind:input事件中接受参数
 *      例：
 *           <data-picker :params="idTypeData" :placeholder="'选择证件类型'" v-model="policyInsuredList[0].idType"></data-picker>
 *          <data-picker :params="idTypeData" :placeholder="'选择证件类型'" @input="policyInsuredList[0].idType= $event.value" :value="policyInsuredList[0].idType"></data-picker>
 *  params
 *      下拉选项,格式[{value,text}]
 *  placeholder
 *      显示文本
 */
define(function (require) {
    return { //edit 可以编辑 0   不可以编辑 1
        props: ['value', 'edit', 'params', 'placeholder'],
        data: function () {
            return {
                'displayValue': '',
                init: false,
                values: [],
                displayValues: []
            }
        },
        template: '<input type="text" readonly="readonly" :value="displayValue" @click="initPicker()" :placeholder="placeholder"/>',
        
        mounted: function () {
        	
        	this.initData();
        	
        	console.log('data mounted start'); 
        	  
        	console.log(this.edit);
        	
            console.log('data mounted end');
            
        },
        updated: function () {
        	
        	var vm = this;
        	 
            //console.log('======updated事件value============');
            //console.log(vm.value);
            //console.log(vm.displayValue);
            //console.log('======updated事件value============');
            
        },
        methods: {
        	
            initData() {
                var vm = this;
                if (this.params) {
                    var values = [];
                    var displayValues = [];
                    //处理列表对象
                    this.params.forEach(param => {
                    	if (vm.displayValue == param.text)
                    		vm.value = param.value
                  	});
                    //处理列表对象
                    this.params.forEach(param => {
                        values.push(param.value);
                        displayValues.push(param.text);
                        //如果value绑定有值，显示值对应的文本
                        if (this.value == param.value)
                            vm.displayValue = param.text;
                    });
                    vm.values = values;
                    vm.displayValues = displayValues;
                }
            },
             
            initPicker() {
            	
            	
                this.initData();
                
                var vm = this;
                
                console.log('======vm.init======' + vm.init);
                
                if(!vm.init){
                	
                	$(this.$el).picker({
                        value: vm.value,
                        smooth: false,
                        auto: true,
                        onConfirm: function (date) {
                            var _this = this;
                            _this.value = date;
                            $(this.$el).val(this.value);
                            vm.displayValue = _this.cols[0].displayValue;
                            
                            vm.$emit('input', {value: date.value[0], text: _this.cols[0].displayValue});
                            vm.$emit('change', {value: date.value[0], text: _this.cols[0].displayValue});
                        },
                        
                        cols: [
                            {
                                textAlign: 'center',
                                values: vm.values,
                                displayValues: vm.displayValues
                            }
                        ],
                        formatValue: function (picker, value, displayValue) {
                        	
                            return displayValue;

                        }
                    });
                	
                	vm.init = true;
                	
                }
                
                console.log('==============edit:'+this.edit);
                
                if(this.edit && ( this.edit=='1' || this.edit=='N' )){ //存在  切等于1 或  N  不可以编辑
                	
                	return;
                	
                }else{
                	
                	$(this.$el).picker("openEvent", vm.value);
                	
                }

                //console.log('==================');
                //console.log(vm.value);
                //console.log(vm.displayValue);
                //console.log('==================');
                
                //绑定插件
                //var initDataObj = 
                
            }
        },

        watch: {
            value: function (curVal, oldVal) {
            	
                var vm = this;
                console.log('watch value:'+curVal);
                
                if (this.params) {
                    //处理列表对象
                    this.params.forEach(param => {
                        if (curVal == param.value)
                            vm.displayValue = param.text
                    });
                }
                
            }
        },
        
        destroyed: function () {
            //console.log("destroyed")
        	console.log('destroyed');
            $(this.$el).off();
        }

    }
})