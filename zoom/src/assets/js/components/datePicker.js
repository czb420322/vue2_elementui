/**
 * 日期选择控件，直接页面<date-picker/>引用
 * 参数：
 *  参数使用  vue v-bind绑定 除value值外
 *  value
 *    可v-model绑定对象值  可双向传递
 * type
 *  - date
 *  使用datePicker日期选择插件
 *  选用此插件后 minDate maxData 的入参为 yyyy-MM-dd
 * 返回值格式:yyyy-MM-dd
 *  -dateMonth
 *  使用dateMonth月份选择插件
 *  选用此插件后 minDate maxData 的入参为 yyyy-MM
 *  返回值格式:yyyy-MM
 *  -time
 *  使用time选择插件
 *  选用此插件后 minDate maxData 的入参为 hh:mm
 *  返回值格式:hh:mm
 *  -dateTime
 *  使用dateTime选择插件
 *  选用此插件后 minDate maxData 的入参为 yyyy-MM-dd hh:mm
 *  返回值格式:yyyy-MM-dd hh:mm
 *
 *  placeholder
 *      显示文本
 *
 *  minDate
 *      最小日期/时间 格式按照type类型指定 默认格式 yyyy-MM-dd HH:mm
 *  maxDate
 *      最大日期/时间 格式按照type类型指定 默认格式 yyyy-MM-dd HH:mm
 *
 */
define(function (require) {
	
    require('sm-date-picker');
    
    return {
        props: ['value', 'edit', 'placeholder', 'minDate', 'maxDate', 'type'],
        data: function () {
            return {
                init: false
            }
        },
        template: '<input type="text" readonly="readonly" :value="value" @click ="initPicker"  :placeholder="placeholder"/>',
        mounted: function () {
        	
        	console.log('date mounted start');
        	console.log(this.edit);
            console.log('date mounted end');
            
        },
        updated: function () {
        	
            console.log('updated事件value:' + this.value);
            
        },
        methods: {
        	
            initPicker() { 
            	
              var vm = this; 
                
              console.log('======vm.init======'+vm.init);
                
              if(!vm.init){
                	
                 if (vm.type)
                    switch (vm.type) {
                        case 'date':
                        	var nowDate = new Date();
                        	var tmDate = new Date((nowDate/1000+86400)*1000);
                        	var y = tmDate.getFullYear();//获取完整的年份(4位,1970-????)
                            var m = tmDate.getMonth() + 1;//获取当前月份(0-11,0代表1月)
                            if (m <= 9) m = "0" + m;
                            var d = tmDate.getDate();
                            if (d <= 9) d = "0" + d;
                            var defVal = y + "-" + m + "-" + d;
                            $(this.$el).datePicker({
                                smooth: false,
                                auto: true,
                                minDate: vm.minDate ? vm.minDate : defVal,//'1950-02-01',
                                maxDate: vm.maxDate ? vm.maxDate : '2030-12-31',
                                value: vm.value ? vm.value : defVal,
                                change: function (date) {
                                	
                                },
                                confirm: function (date) {
                                    vm.$emit('input', {value: date, text:date});
                                    vm.$emit('change', {value: date, text:date});
                                },
                            });
                            break;
                        case 'dateMonth':
                            $(this.$el).dateMonthPicker({
                                smooth: false,
                                auto: true,
                                minDate: vm.minDate ? vm.minDate : '1950-01',
                                maxDate: vm.maxDate ? vm.maxDate : '2030-12',
                                value: vm.value,
                                change: function (dateMonth) {
                                	
                                },
                                confirm: function (dateMonth) {
                                    vm.$emit('input', {value: dateMonth, text:dateMonth});
                                    vm.$emit('change', {value: dateMonth, text:dateMonth});
                                },
                            });
                            break
                        case 'time':
                            $(this.$el).timePicker({
                                smooth: false,
                                auto: true,
                                minTime: vm.minDate ? vm.minDate : '00:00',
                                maxTime: vm.maxDate ? vm.maxDate : '23:00',
                                value: vm.value,
                                change: function (time) {
                                },
                                confirm: function (time) {
                                    vm.$emit('input', {value: time, text:time});
                                    vm.$emit('change', {value: time, text:time});
                                },
                            });
                            break;
                        case 'dateAndTime':
                            $(this.$el).dateAndTimePicker({
                                smooth: false,
                                auto: true,
                                minDateTime: vm.minDate ? vm.minDate : '1950-01-01 00:00',
                                maxDateTime: vm.maxDate ? vm.maxDate : '2030-12-31 23:59',
                                value: vm.value,
                                change: function (dateTime) {
                                },
                                confirm: function (dateTime) {
                                	vm.$emit('input', {value: dateTime, text:dateTime});
                                	vm.$emit('change', {value: dateTime, text:dateTime});
                                },
                            });
                            break;
                        default:
                            $(this.$el).dateAndTimePicker({
                                smooth: false,
                                auto: true,
                                minDateTime: vm.minDate ? vm.minDate : '1950-01-01 00:00',
                                maxDateTime: vm.maxDate ? vm.maxDate : '2030-12-31 23:59',
                                value: vm.value,
                                change: function (dateTime) {
                                },
                                confirm: function (dateTime) {
                                	vm.$emit('input', {value: dateTime, text:dateTime});
                                	vm.$emit('change', {value: dateTime, text:dateTime});
                                },
                            });
                            break;
                    }
                else
                    $(this.$el).dateAndTimePicker({
                        smooth: false,
                        auto: true,
                        minDateTime: vm.minDate ? vm.minDate : '1950-01-01 00:00',
                        maxDateTime: vm.maxDate ? vm.maxDate : '2030-12-31 23:59',
                        value: vm.value,
                        change: function (dateTime) {
                        	
                        },
                        confirm: function (dateTime) {
                            vm.$emit('input', {value: dateTime, text:dateTime});
                            vm.$emit('change', {value: dateTime, text:dateTime});
                        },
                    });
                 
                 	vm.init = true;
                 	
                }
                
                console.log('==============edit:'+this.edit);
                
                if(this.edit && ( this.edit=='1' || this.edit=='N' )){ //存在  切等于1 不可以编辑
                	return;
                }else{
                	
                	var valueArray = [];
                	
                	if(vm.value){
                		
                        if (vm.type){
                           switch (vm.type) {
                               case 'date':
                            	   valueArray = [vm.value.split('-')[0], vm.value.split('-')[1], vm.value.split('-')[2]];
                                   break;
                               case 'dateMonth':
                            	   valueArray = [vm.value.split('-')[0], vm.value.split('-')[1]];
                                   break
                               case 'time':
                            	   valueArray = [vm.value.split(':')[0], vm.value.split(':')[1]];
                                   break;
                               case 'dateAndTime':
                            	   var dateTime = vm.value.split(' ');
                            	   valueArray = [dateTime[0].split('-')[0], dateTime[0].split('-')[1], dateTime[0].split('-')[2], dateTime[1].split(':')[0], dateTime[1].split(':')[1]];
                                   break;
                               default:
                            	   var dateTime = vm.value.split(' ');
                        	   	   valueArray = [dateTime[0].split('-')[0], dateTime[0].split('-')[1], dateTime[0].split('-')[2], dateTime[1].split(':')[0], dateTime[1].split(':')[1]];
                                   break;
                           }
                        } else{
                        	 var dateTime = vm.value.split(' ');
                  	   	     valueArray = [dateTime[0].split('-')[0], dateTime[0].split('-')[1], dateTime[0].split('-')[2], dateTime[1].split(':')[0], dateTime[1].split(':')[1]];
                        } 
                        
                	}
                	
                    console.log('====--------------=vm.value:'+vm.value);
                    console.log(valueArray);
                    
                	$(this.$el).picker("openEvent", valueArray);
                }
            	
                
            }
            
        },
        watch: {
            value: function (curVal, oldVal) {
            	console.log('watch:'+curVal);
                $(this.$el).val(curVal);
                
                //.trigger('change');
            }
        },
        destroyed: function () {
            $(this.$el).off();
        }
    }

})