/*********
 * comp-uploader.js 版本为1.1.0  
 *
 */
define([ 'sm', 'util/util', 'then' ], function(sm, util, Thenjs ) {

    /***
     * 绑定元素id 触发
     */
    function webUploader(params) {
        //绑定的id
        this.targetId = params.targetId;//触发id

        this.maxWidth = params.maxWidth; // 压缩最大宽度
        this.maxHeight = params.maxHeight; // 压缩最大高度

        this.url = params.url;
        
        this.sizeType = params.sizeType?params.sizeType:'compressed'; // 是否压缩                           original,compressed
        this.sourceType = params.sourceType?params.sourceType:'album,camera'; // 格式为     album,camera    默认是 两者都开  只有weixin使用本参数

        //回调函数
        this.preImageCallBack = params.preImageCallBack;//预览图片处理函数   返回预览的src
        this.completeCallBack = params.completeCallBack;//文件处理完成相应的事件


    }

    webUploader.prototype = {

        init : function() {

            var content = this;

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

            //截取字符串
            function get_last_find(str, find) {
                var index = str.lastIndexOf(find);
                return index != -1 ? str.slice(index) : "";
            }

            function get_image_mimetype(ext) {
                var type = ext.slice(1);
                return "image/" + (type == "jpg" ? "jpeg" : type);
            }

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

            function readAsURL(file, callback) {
                var URL = window.URL || window.webkitURL;
                if (URL) return callback(URL.createObjectURL(file));

                if (window.FileReader) {
                    var fr = new FileReader();
                    fr.onload = function (e) {
                        callback(e.target.result);
                    };
                    fr.readAsDataURL(file);
                } else if (file.readAsDataURL) {
                    callback(file.readAsDataURL());
                }
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
                        if(resObj.code == 0 && resObj.content){
                            callback({code: 1, msg: '上传文件完成', content: resObj.content });
                        }else{
                            callback({code: 0, msg: '上传文件异常', content: null});
                        }
                    }else{
                        callback({code: 0, msg: '上传文件异常', content: null });
                    }
                }, false);

                xhr.addEventListener("error", function () {
                    callback({code: 0, msg: '上传文件错误', content: null });
                }, false);

                xhr.addEventListener("abort", function () {
                    callback({code: 0, msg: '上传文件阻断', content: null });
                }, false);

                xhr.open("POST", parmas.url);
                xhr.send(fd);

            }
            
             var fileUploadInput = $('<input id="'+content.targetId+'-UploadFile" name="'+content.targetId+'-UploadFile" style="opacity:0;position: absolute;z-index: 1;top: 0;left: 0;width: 100%;height: 100%;" type="file" accept="image/*" multiple="">');

                $('#'+content.targetId).append(fileUploadInput);

                fileUploadInput.change(function() {
                    //改变以后  替换  file 文件防止 选择同一个图片不触发  change
                    var fileInput = $(this);
                    if(fileInput && fileInput[0]){

                        var files = fileInput[0].files;//获取到 选取的file 文件
                        if(files && files.length>0){

                            var file = files[0];//获取到 选取的file 文件

                            if(file){

                                var fileName = file.name || file.fileName;
                                var fileExt = get_last_find(fileName, ".").toLowerCase();
                                var fileMin = get_image_mimetype(fileExt);

                                readAsURL(file, function (src) {
                                    if (src) {

                                        $.showMessageIndicator('上传中');
                                        
                                        if(content.preImageCallBack){
                                            content.preImageCallBack(src);
                                        }

                                        var imageCanvas = new Image();
                                        imageCanvas.src = src;
                                        //开启
                                        imageCanvas.onload = function () {

                                            var width = imageCanvas.width,
                                                height = imageCanvas.height,

                                                maxWidth = content.maxWidth,
                                                maxHeight = content.maxHeight,

                                                hasWidthScale = maxWidth && width > maxWidth,
                                                hasHeightScale = maxHeight && height > maxHeight;

                                            //根据宽度缩放
                                            if(hasWidthScale) {
                                                width = maxWidth;
                                                height = Math.floor(imageCanvas.height * width / imageCanvas.width);
                                            }

                                            //根据高度缩放
                                            if (hasHeightScale) {
                                                height = maxHeight;
                                                width = Math.floor(imageCanvas.width * height / imageCanvas.height);
                                            }

                                            var canvas = document.createElement("canvas"),
                                                ctx = canvas.getContext("2d");

                                            canvas.width = width;
                                            canvas.height = height;

                                            ctx.drawImage(imageCanvas, 0, 0, width, height);

                                            var canvasBlob = dataURLtoBlob(canvas.toDataURL(fileMin), fileMin);

                                            var systemType = util.getSystemAndTypeParams();

                                            var uploadParams = {token : util.getToken(),  fileName : fileName,  data : canvasBlob, type : systemType.type, system : systemType.system, url : content.url};

                                            uploadFile(uploadParams, callBakUpload);

                                            function callBakUpload(res){

                                                $.hideMessageIndicator();

                                                if(res && res.code=='1' && res.content){
                                                    $.alertMessage("上传文件成功");
                                                    content.completeCallBack(res.content);
                                                }else{
                                                    $.alertMessage("上传文件失败");
                                                    content.completeCallBack(res.content);
                                                }

                                            }


                                        };

                                    }

                                });

                            }

                        }

                    }

                    //替换掉 生产的file input对象
                    fileInput.val('');

                });


 


        }

    };

    return webUploader;


});