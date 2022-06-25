<template>
  <div>
    <!-- <input type="file" name="" @load="ffff" @change="changes($event)" id=""> -->
    <input type="file" @change="importFileDemo" />

    <div>
      <span>
        IMEI码
        <el-select :disabled="isdisable" v-model="value">
          <el-option v-for="(item,index) in options" :key="index" :disabled="item.disabled"
           :label="'第'+ (item.type + 1) +'列'" :value="index"></el-option>
        </el-select>
      </span>
      <span>
        IMSI码
       <el-select :disabled="isdisable" v-model="value1">
          <el-option v-for="(item,index) in options" :key="index" :disabled="item.disabled"
           :label="'第'+ (item.type + 1) +'列'" :value="index"></el-option>
        </el-select>
      </span>
      <span>
        经度
       <el-select :disabled="isdisable" v-model="value2">
          <el-option v-for="(item,index) in options" :key="index" :disabled="item.disabled"
           :label="'第'+ (item.type + 1) +'列'" :value="index"></el-option>
        </el-select>
      </span>
      <span>
        纬度
        <el-select :disabled="isdisable" v-model="value3">
          <el-option v-for="(item,index) in options" :key="index" :disabled="item.disabled"
           :label="'第'+ (item.type + 1) +'列'" :value="index"></el-option>
        </el-select>
      </span>
      <span>
        时间
        <el-select :disabled="isdisable" v-model="value4">
          <el-option v-for="(item,index) in options" :key="index" :disabled="item.disabled"
           :label="'第'+ (item.type + 1) +'列'" :value="index"></el-option>
        </el-select>
      </span>
      <span>
        基站名
        <el-select :disabled="isdisable" v-model="value5">
          <el-option v-for="(item,index) in options" :key="index" :disabled="item.disabled"
           :label="'第'+ (item.type + 1) +'列'" :value="index"></el-option>
        </el-select>
      </span>

      <el-button type="primary" @click="seachList">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="exportExcel">导入</el-button>
    </div>

    <el-table stripe :data="tableData" highlight-current-row ref="refTable">
      <!--数据源-->
      <el-table-column v-for="(col, index) in columns" :prop="col.prop" :label="col.label" 
      :show-overflow-tooltip="true" :key="index"></el-table-column>

    </el-table>
  </div>
</template>

<script>
import xlsx from 'xlsx'
export default {
    data() {
        return {
            tableData: [],
            columns: [],
            xlsList: [], // 存储原始数据
            xlsColumns: [], //存储原始的列
            options:[],
            value:'',
            value1:'',
            value2:'',
            value3:'',
            value4:'',
            value5:'',
            isdisable:false,
            relationship:[], //对应关系
        }
    },
    components: {},
    computed:{
        //同时监听一个对象的改变
        linstne() {
            const {value,value1,value2,value3,value4,value5} = this
            return {value,value1,value2,value3,value4,value5}
        }
    },
    watch:{
        linstne: {
            handler(val) {
                //每次监听列数改变之前先清空下拉框的禁用样式
                this.options.forEach(function(item){
                    item.disabled = false
                })
                if(val.value || val.value===0){
                    this.options[val.value].disabled = true
                }if(val.value1 || val.value1===0){
                    this.options[val.value1].disabled = true
                }if(val.value2  || val.value2===0){
                    this.options[val.value2].disabled = true
                }if(val.value3  || val.value3===0){
                    this.options[val.value3].disabled = true
                }if(val.value4  || val.value4===0){
                    this.options[val.value4].disabled = true
                }if(val.value5  || val.value5===0){
                    this.options[val.value5].disabled = true
                }
            },
            deep: true,
            
        },
    },
    mounted() {

       let arr = [{id:1,name:'张三1'},{id:2,name:'张三2'},{id:3,name:'张三3'},{id:4,name:'张三4'}]
       let arr1 = [{id:5,name:'张三5'},{id:6,name:'张三6'},{id:7,name:'张三7'},{id:8,name:'张三8'}]
       let arr2 = [{id:9,name:'张三9'},{id:22,name:'张三22'},{id:32,name:'张三32'},{id:43,name:'张三43'}]
       let tasks = []
       tasks.push(arr,arr1,arr2)
       console.log(tasks)
        let list = {
            data:[]
        }
        if(tasks.length > 0){
            
            let list = (Promise.all(tasks)).reduce((acc, cur) => {
                console.log(acc,cur)
            })
        //     (acc, cur) => {
        //         return {
        //         data: acc.data.concat(cur.data)
        //         }
        //     }
        //     )
        }
        console.log(list,222)
    },
    methods: {
        //读取文件
        importFileDemo(e) {
            this.tableData = []
            this.columns = []
            this.isdisable = false
            var files = e.target.files[0]
            var reader = new FileReader()
            reader.onload = ev => {
                var data = ev.target.result
                //8.利用XLSX解析二进制文件为xlsx对象
                var wb = xlsx.read(data, { type: 'binary' })
                //9.利用XLSX把wb第一个sheet转换成JSON对象
                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据
                var j_data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                //10.在终端输出查看结果
                if (j_data.length) {
                    //取出数组的第一项，获取所有的对应的值
                    this.xlsColumns = Object.keys(j_data[0])
                    //如果数组大于100个，就取前100个，否则就取全部
                    if (j_data.length >= 100) {
                        this.xlsList = j_data.splice(0, 100)
                    }else{
                        this.xlsList = j_data
                    }
                }
                //渲染列表
                this.tableData = this.xlsList
                //渲染table列表中的字段列
                this.xlsColumns.forEach(item=>{
                    this.columns.push({prop:item,label:item})
                })
                // this.columns = this.xlsColumns
                //循环当前列数，给下拉框赋值当前列数的条数以及加上属性
                this.columns.forEach((item,index)=>{
                    this.options.push({type:index,disabled:false})
                })
                console.log(this.options,3333)
            }
            reader.readAsBinaryString(files)
        },
        //重新获取数据库列表
        seachList(){
            console.log(this.xlsColumns)
            console.log(this.linstne)
            let arr1 = []
            //["id", "phy_id", "姓名", "lat", "lng", "type", "sms_number", "addr", 
            // "version", "online_report_flag", "board_type", "camera_flag",
            //  "creator_id", "create_time", "dcode"]
            // {value: 1, value1: 4, value2: 3, value3: 2, value4: 6, value5:0}
            let arr = ['IMEI码','IMSI码','经度','纬度','时间','基站名']
            //循环选中对象，取出里面的数字，有数字是空
            for (const key in this.linstne) {
                arr1.push(this.linstne[key])
            }
            this.columns = []
            this.relationship = []
            for (let i = 0; i < arr1.length; i++) {
                this.relationship.push({prop:this.xlsColumns[arr1[i]],label:arr[i]})
            }
            this.isdisable = true
            for (let i = 0; i < this.relationship.length; i++) {
                if(this.relationship[i].prop !== undefined){
                    this.columns.push(this.relationship[i])
                }
            }
            console.log(this.columns,4444)
        },
        reset(){
            this.isdisable = false
            this.columns = []
            this.xlsColumns.forEach(item=>{
                this.columns.push({prop:item,label:item})
            })
        },
        exportExcel(){
            console.log(this.linstne)
            console.log(this.relationship)
        },
    }
}
</script>

<style>
.el-select {
  width: 100px;
}
</style>
