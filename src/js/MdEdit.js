var MdEdit = (function(){

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
							'<textarea class="edit"></textarea>'+
						'</div>'+
						'<div class="preview_layout">'+
							'<div class="preview"></div>'+
						'</div>'+
					'</div>';

	var $mdEdit= null;
	var $preview,$edit,$toolBar;
	Edit.prototype.init = function(id){
		$mdEdit = $(id).empty().html(template);
		$preview = $mdEdit.find(".preview");
		$edit = $mdEdit.find(".edit");
		$toolBar = $mdEdit.find(".toolBar");
		$edit.on("keyup",this.upPreview)
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

	return {
		getInstance:_getInstance,
	}

}());