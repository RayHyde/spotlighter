/* ----------------------------------------------------------------------
* File name:		jquery.spotlighter.js
* Description:	A jQuery plugin that highlights areas on a webpage and 
								adds explanations
* Website:			generic jQuery plugin
* Version:			0.9
* Date:					20-02-2016
* Author:				Ray Hyde - www.rayhyde.nl
---------------------------------------------------------------------- */

(function ($) {
	$.fn.spotlighter = function (options) {

		// default settings
		var settings = $.extend({
			json: false,
			json_file: '',
			default_spotlight_width: 150,
			showNumbers: true
		}, options);

		$(document).ready(function () {
			
			/*** INITAL VARS ***/
			
			var $tip, $tipText, $tipLink, elem, tipText, tipSize, tipAdjustX, tipAdjustY, qty,
					counter = 1, borderWidth = 10000;
			
			/*** FUNCTIONS ***/

			/* this is where the tootltip is filled with the ncesssary info */
			function activateTip() {
				$tipLink = $('[data-splseq=' + counter + ']');
				tipSize = $tipLink.attr('data-splsize');
				if ( options.json == true) {
					tipAdjustX = parseInt($tipLink.attr('data-spladjustx'));
					tipAdjustY = parseInt($tipLink.attr('data-spladjusty'));
				} else {
					tipAdjustX = 0;
					tipAdjustY = 0;
				}
				if (tipSize == undefined) {
					tipSize = settings.default_spotlight_width;
				}

				if ( settings.showNumbers == true) {
					$tip.find('.spotlighter-seq').text(counter);
				}
				$tipText.html($tipLink.attr('data-spltext'));
				
				// show or hide the prev/next buttons
				if (counter == $('[data-spltext]').length) {
					$tip.find('.spotlighter-next').fadeOut();
					$tip.find('.spotlighter-actions .spotlighter-close').fadeIn();
				}
				
				if (counter > 1) {
					$tip.find('.spotlighter-prev').fadeIn();
				}
				
				positionTip($tipLink, tipSize, tipAdjustX,tipAdjustY);
				counter++
			}

			/* this is where the tooltip is positioned on the page */
			function positionTip($tipLink, tipSize, tipAdjustX,tipAdjustY) {
				var total = tipAdjustX + tipAdjustY;
				var offset = $tipLink.offset(),
						tipW = $tipLink.width(),
						tipH = $tipLink.height(),
						posY = offset.top  + (tipH / 2)  + tipAdjustY,
						posX = ((offset.left - $(document).scrollLeft()) + (tipW / 2)) + 0 + tipAdjustX,
						size = parseInt(tipSize),
						marginAdjust = (size / 2) * -1,
						$text = $tip.find('.spotlighter-text'),
						th = $text.height();
				// before positioning the tooltip, scroll to the new position 
				//  so you see it moving towards its new position:
				$('html, body').animate({
					scrollTop: posY - size
				}, 1200);

				/* position the spotlight */
				$tip.find('.spotlight').css({
					left: (borderWidth - posX) * -1,
					top: (borderWidth - posY) * -1,
					marginLeft: marginAdjust,
					marginTop: marginAdjust,
					width: size,
					height: size,
				});

				/* position the explanatory text */
				var ww = parseInt($(document).width()),
					wh = $(document).height(),
					textWidth = $text.width(),
					textHeight = $text.height();

				// switch the explanatory text to the other side if past right window margin
				if ((posX + size + textWidth) <= ww) {
					posX = posX + (size / 2);
				} else {
					posX = posX - ((size / 2) + textWidth);
				}

				// here the text is set back at the top of the page when it is too high
				if (posY - (th / 2) < 0) {
					posY = 0;
				} else {
					posY = posY - (th / 2);
				}
				if ((posY + textHeight) > wh) {
					posY = wh - textHeight;
				}

				// then finally position the explanatory text
				$text.css({
					left: posX,
					top: posY,
				});
			}
			
			/* extract the data from the JSON file */
			function populateData() {
				$.getJSON('data/spotlighter-data.json', function(data) {
					qty = data.length;
					for ( var i=0;i< data.length;i++ ) {
						$(document).find(data[i].tipLink).attr({							
							'data-spltext': data[i].tipText,
							'data-splsize': data[i].tipSize,
							'data-splseq': 	data[i].tipSeq,
							'data-spladjustx': 	data[i].adjustX,
							'data-spladjusty': 	data[i].adjustY
						});
					}
					
				});
			}

			/*** DO AT START ***/
			// load json file if applicable
			if ( settings.json == true && settings.json_file != '' ) {
				populateData();
			}
			
			/*** EVENTS ***/
			
			/* start the spotlighter */
			$('.startspotlighter').click(function () {
				
				if ($('#spotlighter-tip').length == 0) {
					
					// add the spotlight's HTML
					$('body').append('<div id="spotlighter-tip"><div class="spotlighter-text"><div class="inner"><a class="spotlighter-seq top" href=""></a><a class="spotlighter-close top" href=""><span class="glyphicon glyphicon-remove"></span></a><div class="spotlighter-tip-text"></div><div class="spotlighter-actions"><a href="" class="spotlighter-prev"><span class="glyphicon glyphicon-menu-left"></span>Previous</a><a class="spotlighter-close" href="">Close <span class="glyphicon glyphicon-remove"></span></a><a class="spotlighter-next" href="">Next <span class="glyphicon glyphicon-menu-right"></span></a></div></div></div><div class="spotlight"></div></div>');
					$tip = $('#spotlighter-tip');
					$tipText = $tip.find('.spotlighter-tip-text');
				}

				$tip.addClass('active');
				activateTip();
				return false;
			});

			/* button functionality of the tooltip */
			$('body').on('click', '#spotlighter-tip .spotlighter-next', function () {
				activateTip();
				return false;
			});

			$('body').on('click', '#spotlighter-tip .spotlighter-prev', function () {
				$tip.find('spotlighter-actions .spotlighter-close').fadeOut();
				$tip.find('.spotlighter-next').fadeIn();
				counter = counter - 2;
				activateTip();
				return false;
			});

			$('body').on('click', '#spotlighter-tip .spotlighter-close', function () {
				$tip.find('.spotlight').attr('style', '');
				$tip.find('.spotlighter-text').attr('style', '');
				$tip.removeClass('active');
				$tip.find('.spotlighter-actions .spotlighter-next').show();
				$tip.find('.spotlighter-actions .spotlighter-prev').hide();
				counter = 1;
				return false;
			});

		});

	}
}(jQuery));