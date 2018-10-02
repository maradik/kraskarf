$(document).ready(function() {
    /* Menu subcategories */
    $('#menu > ul.normal-cat > li > a[href=\'#\']').live('click', function(event) {
        event = event || window.event;
        var elParent = $(event.target).parent();
        var el = elParent.find("div");
        if (el.css('display') == 'table') {
            el.css('display', '');
        } else {
            el.css('display', 'table');
        }
        /*       
        if (elParent.find("div.display-submenu-block").length) {
            el.removeClass('display-submenu-block');            
        } else {
            el.addClass('display-submenu-block');
        }
        */
        return false;
    });
    
	/* Search */
	
	/* Ajax Cart */
	$('#cart > a > .heading').live('hover', function() {
        if ($('#cart').hasClass('active') == false) {      
            $('#cart').addClass('active');
            $('#cart').load('index.php?route=module/cart #cart > *');
        }
	});
    
    $('#cart').live('mouseleave', function() {
        $(this).removeClass('active');
    });
   
	/* Mega Menu */
	$('#menu ul > li > a + div').each(function(index, element) {
		// IE6 & IE7 Fixes
		if ($.browser.msie && ($.browser.version == 7 || $.browser.version == 6)) {
			var category = $(element).find('a');
			var columns = $(element).find('ul').length;
			
			$(element).css('width', (columns * 143) + 'px');
			$(element).find('ul').css('float', 'left');
		}		
		
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();
		
		i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
		
		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});

	// IE6 & IE7 Fixes
	if ($.browser.msie) {
		if ($.browser.version <= 6) {
			$('#column-left + #column-right + #content, #column-left + #content').css('margin-left', '195px');
			
			$('#column-right + #content').css('margin-right', '195px');
		
			$('.box-category ul li a.active + ul').css('display', 'block');	
		}
		
		if ($.browser.version <= 7) {
			$('#menu > ul > li').bind('mouseover', function() {
				$(this).addClass('active');
			});
				
			$('#menu > ul > li').bind('mouseout', function() {
				$(this).removeClass('active');
			});	
		}
	}
	
	$('.success img, .warning img, .attention img, .information img').live('click', function() {
		$(this).parent().fadeOut('slow', function() {
			$(this).remove();
		});
	});	
	
});

// live option change
function liveOptionChange() {
		
	var originalPriceValue = $('#originalPriceValue').val();
	var currencyValue = $('#currencyValue').val();
	var originalWeightValue = $('#originalWeightValue').val();
	var weightClassValue = $('#weightClassValue').val();
		
	var discountedPriceValue = $('#discountedPriceValue').val();
		
	var option_price = $('#optionSelect option:selected').attr('data-price');
	var option_price_prefix = $('#optionSelect option:selected').attr('data-price-prefix');
	var option_weight = $('#optionSelect option:selected').attr('data-weight');
	var option_weight_prefix = $('#optionSelect option:selected').attr('data-weight-prefix');
		
	if (option_price_prefix == '+' && option_price > 0) {
		var newPrice = parseFloat(originalPriceValue)+parseFloat(option_price);
		var newPriceFormatted = numberFormat(newPrice.toFixed(2))+currencyValue;
	} else if (option_price_prefix == '-' && option_price > 0) {
		var newPrice = parseFloat(originalPriceValue)-parseFloat(option_price);
		var newPriceFormatted = numberFormat(newPrice.toFixed(2))+currencyValue;
	} /*else if (option_price_prefix == '=' && option_price > 0) {
		var newPrice = parseFloat(option_price);
		var newPriceFormatted = newPrice.toFixed(2)+currencyValue;
	}*/ else {
		var newPrice = originalPriceValue;
		var newPriceFormatted = numberFormat(newPrice)+currencyValue;
	}
		
	if (option_weight_prefix == '+' && option_weight) {
		var newWeight = parseFloat(originalWeightValue)+parseFloat(option_weight);
		var newWeightFormatted = (Math.round(newWeight*100)/100)+weightClassValue;
	} else if (option_weight_prefix == '-' && option_weight) {
		var newWeight = parseFloat(originalWeightValue)-parseFloat(option_weight);
		var newWeightFormatted = (Math.round(newWeight*100)/100)+weightClassValue;
	} /*else if (option_weight_prefix == '=' && option_weight) {
		var newWeight = parseFloat(option_weight);
		var newWeightFormatted = newWeight+weightClassValue;
	}*/ else {
		var newWeight = originalWeightValue;
		var newWeightFormatted = newWeight+weightClassValue;
	}
		
	if (discountedPriceValue) {
		$('#oldPrice').text(newPriceFormatted);
		var discountRate = parseFloat(originalPriceValue)-parseFloat(discountedPriceValue);
		var newDiscountedPrice = parseFloat(newPrice)-parseFloat(discountRate);
		var newDiscountedPriceFormatted = newDiscountedPrice.toFixed(2)+currencyValue;
		$('#newPrice').text(newDiscountedPriceFormatted);
	} else {
		$('#originalPriceContainer').text(newPriceFormatted);
	}
	$('#originalWeightContainer').text(newWeightFormatted);
		
		
}

function strip(number) {
    return (parseFloat(number).toPrecision(12));
}

function numberFormat(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

function getURLVar(key) {
	var value = [];
	
	var query = String(document.location).split('?');
	
	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');
			
			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}
		
		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
} 

function addToCart(product_id, quantity) {
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;

	$.ajax({
		url: 'index.php?route=checkout/cart/add',
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information, .error').remove();
			
			if (json['redirect']) {
				location = json['redirect'];
			}
			
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				
				$('#cart-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}
function addToWishList(product_id) {
	$.ajax({
		url: 'index.php?route=account/wishlist/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				
				$('#wishlist-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}	
		}
	});
}

function addToCompare(product_id) { 
	$.ajax({
		url: 'index.php?route=product/compare/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				
				$('#compare-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}