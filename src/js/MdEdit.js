var template = require('../template/mdEdit.tpl.html');
module.exports = function(){

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
		})
	}

	return {
		getInstance:_getInstance,
	}
};