var $ = require("jquery");
require("../css/edit.css");
require("../css/preview.css");

$(document).ready(function(){
	var Edit= require('./mdEdit.js');
	var edit = new Edit();
	edit.getInstance().init("#jane-edit");
})


