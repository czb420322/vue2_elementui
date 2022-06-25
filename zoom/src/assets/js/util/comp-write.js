define([ 'sm', 'controller', 'paper', 'write', 'canvas2image', 'util/comp-canvas'], function($, controller, paper, write, canvas2image, canvasModal) {
    
	
	function writeModal(params) {
		this.init(params);
	}
 
	writeModal.prototype = {
		
		modal : null,
		canvasModal : null,
		
		init : function(params) {
			
			var tempThis = this;
			
			
			var _modalTemplateTempDiv = document.createElement('div');
			
			var modal;
			params = params || [];
			
			var modalFonts = ['本','人','已','阅','读','保','险','条','款','、','产','品','说','明','书','和','投','保','提','示','书','了','解','本','产','品','的','特','点','和','保','单','利','益','的','不','确','定','性','。'];
			
			var modalHTML;
			
			var insertFont = '';
			var insertImg = '';
			//启动 书写下表
			var currentFont = 0;
			
			$.each(modalFonts, function(_index, _obj){
				 insertFont = insertFont + '<span style="display: inline-block;" id="font_'+_index+'">'+_obj+'</span>';
			});
			
			$.each(modalFonts, function(_index, _obj){
				insertImg = insertImg + '<span style="display: inline-block;" id="img_'+_index+'"></span>';
			});
			
			var buttonsHTML = '';
			
			buttonsHTML += '<div class="modal-inner">';
				buttonsHTML += '<div>';
					buttonsHTML += '<header class="bar bar-nav">';
						buttonsHTML += '<button class="button button-link pull-right close-picker picker-confirm comp-md-close">关闭</button>';
							buttonsHTML += '<h1 class="title">'+ params.config.title +'</h1>';
					 buttonsHTML += '</header>';
					 	buttonsHTML += '</div>';
					 	
					buttonsHTML += '<div class="modal-text" style="text-align: center;">';
					 buttonsHTML += '<div>&nbsp;'; 
				      buttonsHTML += '</div>';
				      buttonsHTML += '<div>&nbsp;'; 
				      buttonsHTML += '</div>';
				      buttonsHTML += '<div>&nbsp;'; 
				      buttonsHTML += '</div>';
					buttonsHTML += '<div style="">';
					 buttonsHTML += '<div>'; 
						buttonsHTML += insertFont;
				      buttonsHTML += '</div>';
					buttonsHTML += '</div>';
					buttonsHTML += '<div id="imgAll" style="">';
						buttonsHTML += insertImg;
					buttonsHTML += '</div>';
					
					buttonsHTML += '<div style="position:relative;">';
				    	buttonsHTML += '<div style="display: block;" class="modal-buttons"><span id="save-modal-button" class="modal-button">下一个</span></div>';
				    buttonsHTML += '</div>';
			    
					buttonsHTML += '<div style="position:relative;">';
							buttonsHTML += '<canvas id="canvasbg" style="border: #ff1722 5px solid; position:absolute;left:0;top:0">';
							buttonsHTML += '</canvas>';
							buttonsHTML += '<canvas id="canvas" style="border: #ff1722 5px solid; position:absolute;left:0;top:0;">';
							buttonsHTML += '</canvas>';
					buttonsHTML += '</div>';
					
				buttonsHTML += '</div>';
				
			buttonsHTML += '</div>';
			buttonsHTML += '';
			
			
			var closeable = params.config.closeable ? 'modal-closeable ' : '';
			modalHTML = '<div style="height: 90%; background-color: #ffffff;" class="common-open-write modal-no-buttons ' + params.config.modalClass +' '+ closeable +'actions-modal">'+ buttonsHTML + '</div>';
			
			_modalTemplateTempDiv.innerHTML = modalHTML;
			modal = $(_modalTemplateTempDiv).children();
			
			
		    modal.find('.comp-md-close').each(function (index, el) {
                $(el).on('click', function (e) {
                    $.closeModal(modal);
                });
            });
		    
		    modal.find('#canvasbg').each(function (index, el) {
		    	
		    	paper.init(el);
		    	
		    });
		    
		    modal.find('#canvas').each(function (index, el) {
		    	
		    	controller.init(el);
		    	
		    	controller.draw(modalFonts[currentFont]);
		    	
		    	console.log($('#font_'+currentFont));
		    	
		    	$('#font_'+currentFont).css("color", "red");
		    	
            	currentFont ++ ;
            	
	            write.init(el);
	            
		    });
		    
		    modal.find('#save-modal-button').each(function (index, el) {
	        	
	            $(el).on('click', function (e) { 
	            	
	            	$('#img_'+currentFont).append(controller.convertToImage(40, 40));
	            	
	            	controller.draw(modalFonts[currentFont]);
	            	
	            	$('#font_'+currentFont).css("color","red");
	            	
	            	
	            	
	            	tempThis.canvasModal.process($('#imgAll')[0]);
	            	
	            	currentFont ++ ;
	            	
	            	console.log(el);
	            	 
	            });
	            
	        });
		    

		    this.canvasModal = new canvasModal({
		    	uploadUrl: $.moduleConfig.life_server_url + '/uploader/common',
		    	callBack: function (res) {
		    		
		    		console.log('canvasModal callBack');
		    		console.log(res);
		    		
	            }
	        });

			this.modal = modal;
			 
			return modal;
			
		},
		
		open : function() {
		   
		   var tempThis = this;
		   var contentTemp = tempThis.modal.find('.modal-text');
		   
		   $('.page').append(tempThis.modal);
		   $.openModal(tempThis.modal);
		   
		},
		
		close : function() {
			
			$.closeModal(this.modal);
			
		}
		
	};
 
	return writeModal;
});