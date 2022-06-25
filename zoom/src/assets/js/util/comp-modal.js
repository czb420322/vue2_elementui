define([ 'sm'], function($) {
 
	/**
	 * 
	 */
	function commonOpenModal(params) {
		this.init(params);
	}
	
	
	commonOpenModal.prototype = {
		
		modal : null,
		
		init : function(params) {
			
			var tempThis = this;
			var _modalTemplateTempDiv = document.createElement('div');
			
			var modal;
			params = params || [];
			
			var modalHTML;
			var buttonsHTML = '';
			
			
			buttonsHTML += '<div class="modal-inner">';
				buttonsHTML += '<div>';
					buttonsHTML += '<header class="bar bar-nav">';
						buttonsHTML += '<button class="button button-link pull-right close-picker picker-confirm comp-md-close">关闭</button>';
							buttonsHTML += '<h1 id="modal-title" class="title">'+ params.config.title +'</h1>';
					 buttonsHTML += '</header>';
					 	buttonsHTML += '</div>';
				buttonsHTML += '<div class="modal-text" style="overflow:auto;text-align:left;">';
				
					
				
				buttonsHTML += '</div>';
				
			buttonsHTML += '</div>';
			buttonsHTML += '<div class="modal-buttons"></div>';
			
			var selectBanks = {};
			
			
			var closeable = params.config.closeable ? 'modal-closeable ' : '';
			
			modalHTML = '<div class="common-open-modal modal-no-buttons ' + params.config.modalClass +' '+ closeable +'actions-modal">'+ buttonsHTML + '</div>';
			
			_modalTemplateTempDiv.innerHTML = modalHTML;
			modal = $(_modalTemplateTempDiv).children();
			
			
		    modal.find('.comp-md-close').each(function (index, el) {
                $(el).on('click', function (e) {
                    $.closeModal(modal);
                });
            });

			this.modal = modal;
			 
			return modal;
			
		},
		
		open : function(obj) {
		   
		   var tempThis = this;
		   if(obj){
			   var titleTemp = tempThis.modal.find('#modal-title');
			   var contentTemp = tempThis.modal.find('.modal-text');
			   if(titleTemp && obj.title){
				   titleTemp.html(obj.title);
			   }
			   if(contentTemp && obj.text){
				   contentTemp.html(obj.text);
			   }
			   $('.page').append(tempThis.modal);
			   $.openModal(tempThis.modal);
		   }
		   
		},
		
		close : function() {
			$.closeModal(this.modal);
		}
		
	};
 
	return commonOpenModal;
});