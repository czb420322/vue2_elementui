/*********
 */
define([ 'sm' , 'util/util', 'util/validator', 'config' ], function($, util, validator, Config) {
	
	function CommonAlert(params) {
		this.init(params);
	}
	
	CommonAlert.prototype = {
		
		modal : null,
		
		init : function(params) {
			
			var tempThis = this;
			
			params = params || {};
			
			tempThis.all = false;
			if(params.all && params.all===true){
				tempThis.all = true;
			}
			
			tempThis.callbackConfirm = params.confirm;
			tempThis.callbackCancel = params.cancel;
			
	        var modal;
	        var modalHTML = '';
	        var _modalTemplateTempDiv = document.createElement('div');
	        var closeable = params.closeable ? 'modal-closeable ' : '';
	        
	        if(tempThis.all){
	        	
	        	var extraClass = params.extraClass || '';
	        	modalHTML = '<div class="modal common-alert-modal modal-closeable modal-margin-auto ' + closeable + extraClass + '"><div id="html-content" class="popupbox rankbox"></div></div>';
	        	
	        }else{
	        	
				params.afterText = [
				    '<div class="list-block" style="margin: 0;">',
					    '<ul style="border: none; max-height:' + 400 + 'px" id="html-content">',
					    '</ul>',
				    '</div>'
				].join('');
				var header = params.header ? params.header : '提示';
				
		        var headerHTML = header ? '<div class="modal-header">' + header + '</div>' : '';
		        var extraClass = params.extraClass || '';
		        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
		        var afterTextHTML = params.afterText ? params.afterText : '';
		        
		        modalHTML = '<div class="modal common-record-modal modal-closeable ' + closeable + extraClass + '">' + headerHTML + '<div class="modal-inner">' + ( textHTML + afterTextHTML) + '</div>';
	        	
		        if(tempThis.callbackConfirm && tempThis.callbackCancel){
		        	 modalHTML = modalHTML + '<div class="modal-buttons modal-buttons-vertical modal-buttons-vertical-select"><div class="row"><div class="col-50"><span id="cancel-modal-button" class="modal-button">取 消</span></div><div class="col-50"><span id="confirm-modal-button" class="modal-button" style="background: #ff8a00;">确 认</span></div></div></div>';
		        }else{
		        	 if(tempThis.callbackConfirm){
		        	 	 modalHTML = modalHTML + '<div class="modal-buttons modal-buttons-vertical modal-buttons-vertical-select"><div class="row"><div class="col-100"><span id="confirm-modal-button" class="modal-button">确 认</span></div></div></div>';
		        	 }
		        }
		        
		        modalHTML = modalHTML + '</div>';
		        
		        
	        }
	        
	        _modalTemplateTempDiv.innerHTML = modalHTML;
	        modal = $(_modalTemplateTempDiv).children();
	        
	        if(tempThis.callbackConfirm){
		        modal.find('#confirm-modal-button').each(function (index, el) {
		            $(el).on('click', function (e) { 
		            	
		            	tempThis.callbackConfirm();
		            	
		            	
		            	
		            });
		        });
	        }
	        
	        if(tempThis.callbackCancel){
	        	modal.find('#cancel-modal-button').each(function (index, el) {
		            $(el).on('click', function (e) { 
		            	
		            	$.closeModal(tempThis.modal);
		            	
		            	tempThis.callbackCancel();
		            	
		            });
		        });
	        }
	        
	        
	        this.modal = modal;
	        return modal;
	        
		},
		close : function() {
			$.closeModal(this.modal);
		},
		open : function(obj) {
		   
		   var tempThis = this;
		   var contentTemp = tempThis.modal.find('#html-content');
		   
		   if(obj && contentTemp){ 
			   
			   contentTemp.html(obj);
			   
			   tempThis.modal.find('#rank-close').each(function (index, el) {
		            $(el).on('click', function (e) {
		            	 $.closeModal(tempThis.modal);
		            });
			   });
		        
			   $('.page').append(tempThis.modal);
			   $.openModal(tempThis.modal);
			   
		   }
		
		},
		
		close : function() {
			$.closeModal(this.modal);
		}
		
		
	};
 
	return CommonAlert;
});