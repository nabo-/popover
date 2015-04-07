/// <reference path="definitions/jquery.d.ts" />
var Dialog;
(function (Dialog) {
    var Popover = (function () {
        function Popover(arg) {
            this.arg = arg;
            this.page_scrollY = 0;
            this.open();
            this.close();
            this.render();
        }
        Popover.prototype.render = function () {
            if ($('#popover-bg').length > 0) {
                return;
            }
            $('body').append('<div id="popover-bg"></div>');
        };
        Popover.prototype.getScrollY = function () {
            var scroll_y = $(window).scrollTop();
            return scroll_y;
        };
        Popover.prototype.getWindowHeight = function () {
            var window_height = $(window).innerHeight();
            return window_height;
        };
        Popover.prototype.backgroundLayerControl = function () {
            var bg_layer = $('#popover-bg');
            bg_layer.css({ 'display': 'block' });
            setTimeout(function () {
                bg_layer.css({ 'opacity': '1' });
            }, 1);
            setTimeout(function () {
                bg_layer.css({ 'opacity': '0' });
            }, 300);
            setTimeout(function () {
                bg_layer.css({ 'display': 'none' });
            }, 501);
        };
        Popover.prototype.open = function () {
            var _this = this;
            var scroll_y = 0;
            $(_this.arg.button).on('click', function (event) {
                event.preventDefault();
                var window_height = _this.getWindowHeight();
                $(_this.arg.targetId).css('min-height', window_height);
                // close の際に元の位置までスクロールするため、ここで現在のscrolltopを取得しておく
                _this.page_scrollY = _this.getScrollY();
                _this.showDialog();
                _this.backgroundLayerControl();
            });
        };
        Popover.prototype.close = function () {
            var _this = this;
            $('.js-popover-close', _this.arg.targetId).on('click', function (event) {
                event.preventDefault();
                _this.closeDialog();
                _this.backgroundLayerControl();
            });
        };
        Popover.prototype.showDialog = function () {
            var _this = this;
            setTimeout(function () {
                $(_this.arg.targetId).show();
            }, 200);
            setTimeout(function () {
                $('#page').hide();
                $(window).scrollTop(0);
            }, 301);
        };
        Popover.prototype.closeDialog = function () {
            var _this = this;
            setTimeout(function () {
                $(_this.arg.targetId).hide();
            }, 200);
            setTimeout(function () {
                $('#page').show();
                $(window).scrollTop(_this.page_scrollY);
            }, 201);
        };
        return Popover;
    })();
    Dialog.Popover = Popover;
})(Dialog || (Dialog = {}));
