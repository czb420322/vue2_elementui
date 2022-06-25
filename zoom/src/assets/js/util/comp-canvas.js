/*********
 *   
 */
define([ 'sm', 'html2canvas', 'jspdf', 'util/util' ], function($, html2canvas, jspdf, util) {
	
	function canvasModal(params) {
		this.init(params);
	}
	
	canvasModal.prototype = {
			
		modal : null,
		uploadUrl : '',
		
		init : function(params) {
		   //当前
		   var tempThis = this;
           //上传url
           tempThis.uploadUrl = params.uploadUrl ? params.uploadUrl : '';
           tempThis.fileName = params.fileName ? params.fileName : 'fileName';
           //pre callback
           tempThis.preCallBack = params.preCallBack;
           //完成callback
           tempThis.callBack = params.callBack;
		},
		
		process : function(obj, type) {
		   
		   var tempThis = this;
		   
		   //needsFormDataShim
		   var needsFormDataShim = (function () {
               try {
                   new Blob();
                   return true;
               } catch (e) {
                   return false;
               }
          })(),
          blobConstruct = !!(function () {
               try { return new Blob(); } catch (e) {}
          })(),
          XBlob = blobConstruct ? window.Blob : function (parts, opts) {
               var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
               parts.forEach(function (p) {
                   bb.append(p);
               });
               return bb.getBlob(opts ? opts.type : undefined);
          };

		  //newBlob
          function newBlob(data, datatype){
             var out;
             try {
                 out = new Blob([data], {type: datatype});
             }
             catch (e) {
                 window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                 if (e.name == 'TypeError' && window.BlobBuilder) {
                     var bb = new BlobBuilder();
                     bb.append(data.buffer);
                     out = bb.getBlob(datatype);
                 }else if (e.name == "InvalidStateError") {
                     out = new Blob([data], {type: datatype});
                 }else{ }
             }
             return out;
          }
		  
          //工具方法
          function dataURLtoBlob(base64, mimetype) {
             var tmp = base64.split(',');
             tmp[1] = tmp[1].replace(/\s/g,'');
             var binary = atob(tmp[1]);
             var array = [];
             for(var i = 0; i < binary.length; i++) {
                 array.push(binary.charCodeAt(i));
             }
             return new newBlob(new Uint8Array(array), mimetype);
          }
          
          //FormDataShim
          function FormDataShim () {
             // Store a reference to this
             var o = this,
                 parts = [],// Data to be sent
                 boundary = Array(6).join('-') + (+new Date() * (1e16*Math.random())).toString(32),
                 oldSend = XMLHttpRequest.prototype.send;

             this.append = function (name, value, filename) {
                 parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

                 if (value instanceof Blob) {
                     parts.push('; filename="'+ (filename || 'blob') +'"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                     parts.push(value);
                 } else {
                     parts.push('\r\n\r\n' + value);
                 }
                 parts.push('\r\n');
             };

             // Override XHR send()
             XMLHttpRequest.prototype.send = function (val) {
                 var fr,
                     data,
                     oXHR = this;

                 if (val === o) {
                     //注意不能漏最后的\r\n ,否则有可能服务器解析不到参数.
                     parts.push('--' + boundary + '--\r\n');
                     data = new XBlob(parts);
                     fr = new FileReader();
                     fr.onload = function () { oldSend.call(oXHR, fr.result); };
                     fr.onerror = function (err) { throw err; };
                     fr.readAsArrayBuffer(data);

                     this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                     XMLHttpRequest.prototype.send = oldSend;
                 }
                 else {
                     oldSend.call(this, val);
                 }
             };
          }


          function uploadFile(parmas, callback){

             var blob = parmas.data;
             var fd = null;
             if(blob){
                 fd = needsFormDataShim ? new FormData : new FormDataShim();
             }else{
                 fd = new FormData();
             }

             fd.append('type', parmas.type);
             fd.append('system', parmas.system);

             fd.append('token', parmas.token?parmas.token:'');

             fd.append("fileName", parmas.fileName);
             fd.append('upload'+parmas.fileName, blob , parmas.fileName);
             fd.append('proposalPdfNum', parmas.proposalPdfNum?parmas.proposalPdfNum:'');

             var xhr = new XMLHttpRequest();

             xhr.upload.addEventListener("progress", function (e) {

             }, false);

             xhr.addEventListener("load", function (e) {
                 var resObj = null;
                 try {
                     resObj = JSON.parse(e.target.responseText)
                 }catch (e) {
                     resObj = null;
                 }
                 if(resObj){
                     if(resObj.code == 0 && resObj.content && resObj.content.result=='0'){
                         callback({code: 1, msg: '上传文件成功', content: resObj.content});
                     }else if(resObj.code == 0 && resObj.content && resObj.content.result=='2' ){
                         callback({code: 2, msg: resObj.content.resultMessage, content: resObj.content});
                     }else{
                         callback({code: 0, msg: '上传文件失败', content: {}});
                     }
                 }else{
                     callback({code: 0, msg: '上传文件失败', content: {}});
                 }
             }, false);

             xhr.addEventListener("error", function () {
                 callback({code: 0, msg: '上传文件错误', content: {}});
             }, false);

             xhr.addEventListener("abort", function () {
                 callback({code: 0, msg: '上传文件阻断', content: {}});
             }, false);

             xhr.open("POST", parmas.url);
             xhr.send(fd);

           }
		   
		   var length = obj.length;
		   
		   if(obj && obj.length > 1){
			   
			   var count = obj.length;
			   var imgArray = [];
			   var c = 0;
//			   var proposalPdfNum=0;
			   
			   $.showMessageIndicator('处理中');
			   
			   for (var i = 0; i < count; i++) { 
//				       proposalPdfNum=i;
					   var width = obj[i].offsetWidth; //获取dom 宽度
					   var height = obj[i].offsetHeight; //获取dom 高度
					   var canvas = document.createElement("canvas"); //创建一个canvas节点
					   var scale = 2; //定义任意放大倍数 支持小数
					   canvas.width = width * scale; //定义canvas 宽度 * 缩放
					   canvas.height = height * scale; //定义canvas高度 *缩放
					   canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
					    
					    var opts = {
					        scale: scale, // 添加的scale 参数
					        canvas: canvas, //自定义 canvas
					        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
					        background: "#FFFFFF",
					        width: width, //dom 原始宽度
					        allowTaint: false,
					        height: height,
					        useCORS: true // 【重要】开启跨域配置
					        /* height:1200,
			                width:900 */
					   };
					   html2canvas(obj[i], opts).then((function() {
						   var pNum = i+1;
						   return function (canvas) {
					           	
			        		   //获取原生的img  dom
			                   var canvasBlob = dataURLtoBlob(canvas.toDataURL(), 'image/png');
			                   
			                   var systemType = util.getSystemAndTypeParams();
			                   
			        		   var uploadParams = {token : util.getToken(),  fileName : tempThis.fileName+'.png', proposalPdfNum : pNum, data : canvasBlob, type : systemType.type, system : systemType.system, url : tempThis.uploadUrl};
			        		   
			        		   //tempThis.preCallBack(uploadParams);
			                   
			                   uploadFile(uploadParams, callBakUpload);
			                   
			                   function callBakUpload(res){
			                	   
		                		   if(res && res.code=='1' && res.content && res.content.result=='0' && res.content.imgUrl){
		                			   imgArray.push(res.content.imgUrl);
		                		   }
		                       
		                		   c = c + 1;
			                       if(c == count){
			                          $.hideMessageIndicator();
			                          tempThis.callBack(imgArray);
			                       } 
			                   }
						   }
						 })());
			   }
			   
		   }else{
			   var width = obj.offsetWidth; //获取dom 宽度
			   var height = obj.offsetHeight; //获取dom 高度
			   var canvas = document.createElement("canvas"); //创建一个canvas节点
			   var scale = 2; //定义任意放大倍数 支持小数
			   canvas.width = width * scale; //定义canvas 宽度 * 缩放
			   canvas.height = height * scale; //定义canvas高度 *缩放
			   canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
			    
			    var opts = {
				        scale: scale, // 添加的scale 参数
				        canvas: canvas, //自定义 canvas
				        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
				        background: "#FFFFFF",
				        width: width, //dom 原始宽度
				        allowTaint: false,
				        height: height,
				        useCORS: true // 【重要】开启跨域配置
				       /* height:1200,
	                   width:900 */
			   };
			    
	           html2canvas(obj, opts).then(function (canvas) {
		           //获取原生的img  dom
	               var canvasBlob = dataURLtoBlob(canvas.toDataURL(), 'image/png');
	               
	               var systemType = util.getSystemAndTypeParams();
	               
	    		   var uploadParams = {token : util.getToken(),  fileName : tempThis.fileName+'.png', data : canvasBlob, type : systemType.type, system : systemType.system, url : tempThis.uploadUrl};
	    		   
	    		   tempThis.preCallBack(uploadParams);
	    		   
	               $.showMessageIndicator('处理中');
	               
	               uploadFile(uploadParams, callBakUpload);
	               
	               function callBakUpload(res){
	
	                   $.hideMessageIndicator();
	                   
	                   tempThis.callBack(res);
	                   
	               }
	           });
		   }
		   
		} 
		
	};
 
	return canvasModal;
});