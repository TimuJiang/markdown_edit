activity_popup = function(){
    var TYPE = {
        "Loading":"activity_general_loading",
        "Notification":"Notification"
    }

    function ViewItem() {
        this.creatTime = new Date().getTime();
        this.isShow = false;
        this.$view = null;
        this.uid = "uid" + this.creatTime;
        this.callback_Ok = null;
        this.callback_Cancel = null;
    }

    function LoadingItem(uid) {
        this.creatTime = new Date().getTime();
        this.isShow = false;
        this.$view = null;
        this.uid = uid;
        this.callback = null;
    }

    var maskStyle =  {
        display: "table",
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        backgroundColor: "rgba(0,0,0,.733)",
        zIndex:"9999"

    }
    var popupBoxStyle = {
        display: "table",
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        zIndex:"10000",
    }

    var template = '<div class="popup-box">'+
                        '<div class="popup-position" style="display: table-cell;vertical-align: middle;text-align: center">'+
                            '<div class="popup" style="width:288px;display: inline-block;border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px;background-color: #FFFFFF;">'+
                                '<div class="popup-title" style=" min-height: 25px;position: relative;font-size:1.4rem">'+
                                    '<span class="close" style="display:block;position:absolute;right:0px;width:1.5rem;height:1.5rem;padding:1.5rem;">X</span>'+
                                '</div>'+
                                '<div class="popup-content" style="min-height:3.5rem;font-size:1.2rem"></div>'+
                                '<div class="popup-footer" style="min-height: 4.8rem;">'+
                                    '<div class="btn btn_ok" style="display: none">确定</div>'+
                                    '<div class="btn btn_cancel" style="display: none">取消</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';


    var notificationTemplate = '<div class="notification" style="position:fixed;color:#ffffff;bottom:40px;width: 100%;text-align:center;height: 0px">' +
                                    '<div class="notification-content" style="display:inline-block;padding:.5rem 1rem;background-color: rgba(0,0,0,.733);">' +
                                    '</div>'+
                               '</div>';


    var $mask = $('<div id="activity_popup_mask" class="mask"></div>');

    var $body;
    var _pool = {};
    var _notification = [];

    var _messageTimer = null;

    function loopMessage (){
        if(!_messageTimer){
            _messageTimer = window.setInterval(function(){
                if(_notification.length<=0){
                    window.clearInterval(_messageTimer);
                    _messageTimer = null;
                }
                var item = _notification.shift()
                if(item){
                    var bottom = parseInt(item.$view.css("bottom"));
                    item.$view.animate({bottom:bottom+40,opacity:0},function(){
                        item.$view.remove();
                        item.isShow = false;
                    })
                }
                _notificationPosition();
            },2000)
        }
    }

    $(window).resize(function() {

    });

    var _notificationPosition = function(){
        for(var i = 0; i< _notification.length;i++){
            _notification[i].$view.animate({bottom:(i+1)*(-30)+200});
        }
    }

    var _getContentTemplate = function(id){
       return $($(id).html())
    }

    var _addMask = function(){
        $mask.css(maskStyle);
        if($("#activity_popup_mask").length <= 0){
            _getBody().append($mask);
        }
    }

    var _getBody = function(){
        if(!$body || $body.length == 0){
            $body = $('body');
        }
        return $body;
    }

    var _createNewPopupItem = function(type){
        var item = new ViewItem();
        if(type){
            item.type = type;
        }
        item.$view =  $(template);
        item.$view.css(popupBoxStyle);
        item.$content = item.$view.find(".popup-content").empty();
        item.$footer = item.$view.find(".popup-footer").hide();
        item.$btnClose = item.$view.find(".close").bind("touchend click",item,closeMessage);
        item.$btnClose.hide();
        item.$btnOK = item.$view.find(".btn.btn_ok").bind("touchend click",item,closeMessage);
        item.$btnOK.hide();
        item.$btnCancel = item.$view.find(".btn.btn_cancel").bind("touchend click",item,closeMessage);
        item.$btnCancel.hide();
        _pool[item.uid] = item;
        return item;
    }

    var _createLoadingItem = function(post_api){
        var item = new LoadingItem(post_api);
        item.type = -1;
        item.$view =  $(template);
        item.$view.css(popupBoxStyle);
        item.$content = item.$view.find(".popup-content").empty();
        item.$footer = item.$view.find(".popup-footer").hide();
        item.$btnClose = item.$view.find(".close").hide();
        _pool[item.uid] = item;
        return item;
    }

    var _createNotificationItem = function(){
        var item = new ViewItem();
        item.type = TYPE.Notification;
        item.$view =  $(notificationTemplate);
        item.$content = item.$view.find(".notification-content");
        return item;
    }

    var _showNotification =function(text){
        var item = _createNotificationItem();
        item.$content.text(text)
        _getBody().append(item.$view);
        _notification.push(item);
        _notificationPosition();
        loopMessage ();
    }

    var _show = function(id,callback_Ok,callback_Cancel){
        _addMask();
        _getBody().on("touchmove",stopTouchMove);
        var item = _createNewPopupItem();
        item.callback_Ok = callback_Ok;
        item.callback_Cancel = callback_Cancel;
        var $popupContent = _getContentTemplate(id)
        item.$content.append($popupContent);
        item.$btnOK.bind("touchend click",function(e){
            if(item.callback_Ok){
                item.callback_Ok.apply(this);
            }
        });
        item.$btnCancel.bind("touchend",function(){
            if(item.callback_Cancel){
                item.callback_Cancel.apply(this);
            }
        });
        _getBody().append(item.$view);
        item.isShow = true;
    }

    var _message =function(text,callback){
        _getBody().on("touchmove",stopTouchMove);
        _addMask();
        var item = _createNewPopupItem();
        item.$content.append("<p>"+text+"</p>");
        item.$btnClose.show();
        _getBody().append(item.$view);
        item.isShow = true;
        if(callback){
            item.callback_Cancel = callback
        }
    }

    var _showLoading = function(text,callback,post_api){
        var loadingUid = TYPE.Loading;
        if(post_api){
            loadingUid =post_api;
        }
        _addMask();
        _getBody().on("touchmove click",stopTouchMove);
        var item = _createLoadingItem(loadingUid);
        item.$content.append("<p>"+text+"</p>")
        _getBody().append(item.$view);
        if(callback){
            item.callback = callback;
        }
    }

    var _needLogin =function(id,callback){}

    var closeMessage= function(e){
        e.preventDefault();
        e.stopPropagation();
        e.event
        e.data.$btnClose.unbind("touchend click",closeMessage);
        e.data.$view.fadeOut(200, function () {
            e.data.$view.remove();
            e.data.isShow = false;
            if(e.data.callback_Cancel){
                e.data.callback_Cancel.apply(this);
            }
            delete _pool[e.data.uid];
            $mask.fadeOut(100, function(){
                $mask.remove();
            });
        });
    }

    function stopTouchMove (event){
        event.preventDefault();
    }


    var _hideLoading = function(post_api){
        var item = _pool[post_api];
        if(item){
            item.$view.fadeOut(200, function () {
                item.$view.remove();
                item.isShow = false;
                if(item.callback){
                    item.callback.apply(this);
                }
                delete _pool[item.uid];
                $mask.fadeOut(100, function(){
                    $mask.remove();
                });
            });
        }
    }

    return {
        show:_show,
        message:_message,
        needLogin:_needLogin,
        showLoading:_showLoading,
        hideLoading:_hideLoading,
        showNotification:_showNotification
    };
}();
