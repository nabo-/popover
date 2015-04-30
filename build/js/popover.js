/// <reference path="definitions/jquery.d.ts" />
var Dialog;
(function (Dialog) {
    var Popover = (function () {
        function Popover(arg) {
            this.arg = arg;
            this.page_scrollY = 0;
            this.base_duration = 300;
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
            var _this = this;
            var bg_layer = $('#popover-bg');
            bg_layer.css({ 'display': 'block' });
            setTimeout(function () {
                bg_layer.css({ 'opacity': '1' });
            }, 1);
            setTimeout(function () {
                bg_layer.css({ 'opacity': '0' });
            }, _this.base_duration + 100);
            setTimeout(function () {
                bg_layer.css({ 'display': 'none' });
            }, _this.base_duration * 2 + 101);
        };
        Popover.prototype.open = function () {
            var _this = this;
            var scroll_y = 0;
            $(_this.arg.button).on('click', function (event) {
                event.preventDefault();
                // close の際に元の位置までスクロールするため、ここで現在のscrolltopを取得しておく
                _this.page_scrollY = _this.getScrollY();
                _this.showDialog();
                _this.backgroundLayerControl();
            });
        };
        Popover.prototype.close = function () {
            var _this = this;
            $('.js-popover-close', _this.arg.targetId).on('touchstart', function (event) {
                event.preventDefault();
                _this.closeDialog();
                _this.backgroundLayerControl();
            });
        };
        Popover.prototype.showDialog = function () {
            var _this = this;
            var window_height = _this.getWindowHeight();
            $(_this.arg.targetId).show();
            $(_this.arg.targetId).css('min-height', window_height);
            setTimeout(function () {
                $(_this.arg.targetId).css('visibility', 'visible');
            }, _this.base_duration);
            setTimeout(function () {
                $(window).scrollTop(0);
                $('#page').css('display', 'none');
                // $('#page').hide();
            }, _this.base_duration + 101);
        };
        Popover.prototype.closeDialog = function () {
            var _this = this;
            setTimeout(function () {
                $(_this.arg.targetId).hide();
                $(_this.arg.targetId).css('visibility', 'hidden');
            }, _this.base_duration);
            setTimeout(function () {
                $('#page').css('display', '');
                // $('#page').show();
                $(window).scrollTop(_this.page_scrollY);
            }, _this.base_duration + 1);
        };
        return Popover;
    })();
    Dialog.Popover = Popover;
})(Dialog || (Dialog = {}));
