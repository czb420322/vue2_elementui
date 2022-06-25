/*********
 * comp-signa.js
 */
define([ 'sm', 'signature-pad', 'util/util' ], function($, SignaturePad, util) {
	
	function signaModal(params) {
		this.init(params);
	}
	
	signaModal.prototype = {
			
		modal : null,
		signaObj : null,
		uploadUrl : '',
		isStart : false,
		
		init : function(params) {
			
			var tempThis = this;
			
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

		     //工具方法
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
            
            
            function FormDataShim () {
                // Store a reference to this
                var o = this,
                    parts = [],// Data to be sent
                    boundary = Array(5).join('-') + (+new Date() * (1e16*Math.random())).toString(32),
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
            
			
			params = params || {};
			params.header = '电子签名';
			
			tempThis.saveCallBack = params.saveCallBack;
			tempThis.resetCallBack = params.resetCallBack;
			tempThis.cancelCallBack = params.cancelCallBack;
			
			tempThis.uploadUrl = params.uploadUrl ? params.uploadUrl : '';
			tempThis.closeLoader = false;
			
			if(params.closeLoader && params.closeLoader===true){
				tempThis.closeLoader = true;
			}
			
			params.extraClass = 'common-signa-modal';
			params.afterText = [
			    '<div class="list-block" style="margin: 0 0 0 0;">',
				    '<canvas class="signa-canvas" id="signa-canvas" style="width:100%;"></canvas>',
			    '</div>'
			].join('');
			
	        var modalHTML = '';
	        var buttonsHTML = ''; 
			
	        var _modalTemplateTempDiv = document.createElement('div');
	        
	        buttonsHTML += '<span id="cancel-modal-button" class="modal-button">取 消</span>';
	        
	        buttonsHTML += '<span id="reset-modal-button" class="modal-button">重 置</span>';
	        
	        buttonsHTML += '<span id="save-modal-button" class="modal-button">确 认</span>';
	        
	        var extraClass = params.extraClass || '';
	        
	        var closeable = '';
	        var headerHTML = '';
	        
	        closeable =  'modal-closeable ';
     	    headerHTML = params.header ? '<div class="modal-header">' + params.header + '</div>' : '';
     	   
	        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
	        var afterTextHTML = params.afterText ? params.afterText : '';
	        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical modal-buttons-vertical-select' : '';
	        
	        modalHTML = '<div class="modal ' + closeable + extraClass + '">'+headerHTML+'<div class="modal-inner">' + (textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div></div>';
	        _modalTemplateTempDiv.innerHTML = modalHTML;

	        var modal = $(_modalTemplateTempDiv).children();
	      
	        modal.find('#cancel-modal-button').each(function (index, el) {
	        	$(el).on('click', function (e) {
        		    $.closeModal(tempThis.modal);
        		    if(tempThis.cancelCallBack)  tempThis.cancelCallBack();
        	    });
	        });
	         
	        modal.find('#reset-modal-button').each(function (index, el) {
	            $(el).on('click', function (e) { 
	            	tempThis.signaObj.clear();
	            	tempThis.isStart = false;
	            	if(tempThis.resetCallBack)  tempThis.resetCallBack();
                   
	            });
	        });
	         
	        modal.find('#save-modal-button').each(function (index, el) {
	        	
	            $(el).on('click', function (e) { 
	            	
	            	 if(!tempThis.isStart){
	            		 return $.alertMessage("请完成电子签名!");
	            	 }
	        		
	        		 var canvasBlob = dataURLtoBlob(tempThis.signaObj.toDataURL(), 'image/png');

                     var systemType = util.getSystemAndTypeParams();
                     
                     var uploadParams = {token : util.getToken(),  fileName : 'signaFile.png',  data : canvasBlob, type : systemType.type, system : systemType.system, url : tempThis.uploadUrl};

                     $.showMessageIndicator('处理中');
                     
                     uploadFile(uploadParams, callBakUpload);

                     function callBakUpload(res){

                         $.hideMessageIndicator();
                         
                         tempThis.saveCallBack(res, tempThis.signaObj.toDataURL());
                         
                     }
	            	
	            	
	            });
	        });
	        
	        this.modal = modal;
	        return modal;
	        
		},
		
		open : function() {
		   
		   var tempThis = this;
		  
		   tempThis.signaObj = new SignaturePad(tempThis.modal.find('#signa-canvas')[0], {
				backgroundColor: 'rgba(0,0,0,0)',
				onBegin: function() {
					tempThis.isStart = true;
				},
				onEnd: function() {
					tempThis.isStart = true;
				}
		   });
		   
		   $('.page').append(tempThis.modal);
		   $.openModal(tempThis.modal);
		   
		},
		close : function() {
			$.closeModal(this.modal);
		},
 
		
	};
 
	return signaModal;
});