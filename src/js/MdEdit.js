var MdEdit = (function(){

	var _config = {


	}

	var _instance = null;
	function _getInstance(){
		if(!_instance){
			_instance =new Edit();
		}
		return  _instance;
	}

	function Edit(){}

	var template = '<div class="edit-content">'+
						'<div class="edit_layout">'+
							'<div class="toolBar"></div>'+
							'<div class="edit-box"><textarea class="edit"></textarea></div>'+
						'</div>'+
						'<div class="preview_layout">'+
							'<div class="preview"></div>'+
						'</div>'+
					'</div>';

	var popupTemplate = '<div class="popup-box">'+
                        '<div class="popup-position" style="display: table-cell;vertical-align: middle;text-align: center">'+
                            '<div class="popup" style="">'+
                                '<div class="popup-title" style="">'+
                                    '<span class="close" style=""></span>'+
                                '</div>'+
                                '<div class="popup-content" style=""></div>'+
                                '<div class="popup-footer" style="">'+
                                    '<div class="btn btn_ok" style="">确定</div>'+
                                    '<div class="btn btn_cancel" style="">取消</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

	  var maskStyle =  {
        display: "table",
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        backgroundColor: "rgba(0,0,0,.733)",
        zIndex:"9999"

    }


	var $mdEdit= null;
	var $preview,$edit,$toolBar;
	Edit.prototype.init = function(id){
		$mdEdit = $(id).empty().html(template);
		$preview = $mdEdit.find(".preview");
		$edit = $mdEdit.find(".edit");
		$toolBar = $mdEdit.find(".toolBar");
		$edit.on("keyup",this.upPreview)
		this.initToolBar()
	}

	var $tempcontent;
	var editContent;

	Edit.prototype.upPreview = function(e){
		$tempcontent = $("<div></div>")
		editContent = $edit.val();
		$tempcontent.html($(markdown.toHTML(editContent)));
		$tempcontent.find('img').parent().addClass("p-images");
		$preview.html($tempcontent);
	}

	Edit.prototype.initToolBar = function(){
		var $upload = $("<li id='toolBar-upload' class='toolBar-item'>img</li>")
		$("<ul></ul>").addClass("tool-group").appendTo($toolBar).append($upload);
		$upload.bind('click',function(e){
			console.log(e)
			_addMask();
		})
	}

	Edit.prototype.popup = function(){

	}

	 var _addMask = function(){
	 	var $mask = $('<div id="mask" class="mask"></div>');
        $mask.css(maskStyle);
         $(".edit_layout").append($mask);
    }

	return {
		getInstance:_getInstance,
	}

}());