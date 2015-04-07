/// <reference path="definitions/jquery.d.ts" />

module Dialog {

	export interface Ipopover {
		button:string;
		targetId:string;
	}

	export class Popover {
		private page_scrollY: number;

		constructor(public arg:Ipopover){
			this.page_scrollY = 0;
			this.open();
			this.close();
			this.render();
		}

		render():void {
			if($('#popover-bg').length > 0){
				return;
			}
			$('body').append('<div id="popover-bg"></div>');
		}

		getScrollY():number {
			var scroll_y = $(window).scrollTop();
			return scroll_y;
		}

		getWindowHeight():number {
			var window_height = $(window).innerHeight();
			return window_height;
		}

		backgroundLayerControl():void {

			var bg_layer = $('#popover-bg');

			bg_layer.css({'display':'block'});

			setTimeout(function(){
				bg_layer.css({'opacity':'1'});
			},1);

			setTimeout(function(){
				bg_layer.css({'opacity':'0'});
			},300);

			setTimeout(function(){
				bg_layer.css({'display':'none'});
			},501);
		}

		open():void {
			var _this = this;
			var scroll_y:number = 0;

			$(_this.arg.button).on('click', function(event){
				event.preventDefault();

				var window_height = _this.getWindowHeight();

				$(_this.arg.targetId).css('min-height', window_height);

				// close の際に元の位置までスクロールするため、ここで現在のscrolltopを取得しておく
				_this.page_scrollY = _this.getScrollY();

				_this.showDialog();
				_this.backgroundLayerControl();
			});
		}

		close():void {
			var _this = this;
			$('.js-popover-close', _this.arg.targetId).on('click', function(event){
				event.preventDefault();
				_this.closeDialog();
				_this.backgroundLayerControl();
			});
		}

		showDialog():void {
			var _this = this;

			setTimeout(function(){
				$(_this.arg.targetId).show();
			}, 200);
			setTimeout(function(){
				$('#page').hide();
				$(window).scrollTop(0);
			}, 301);
		}

		closeDialog():void {
			var _this = this;

			setTimeout(function(){
				$(_this.arg.targetId).hide();
			}, 200);

			setTimeout(function(){
				$('#page').show();
				$(window).scrollTop(_this.page_scrollY);
			}, 201);
		}

	}
}