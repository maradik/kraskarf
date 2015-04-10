<?php
class ModelShippingTkDl extends Model {
	function getQuote($address) {
		$this->language->load('shipping/tk_dl');
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "zone_to_geo_zone WHERE geo_zone_id = '" . (int)$this->config->get('tk_dl_geo_zone_id') . "' AND country_id = '" . (int)$address['country_id'] . "' AND (zone_id = '" . (int)$address['zone_id'] . "' OR zone_id = '0')");
	
		if (!$this->config->get('tk_dl_geo_zone_id')) {
			$status = true;
		} elseif ($query->num_rows) {
			$status = true;
		} else {
			$status = false;
		}
		
		$method_data = array();

		if ($status) {
		    $alertText = "Для этого способа доставки укажите паспортные данные";
            $messageAboutPassport =  empty($this->session->data['guest']['lastname']) && !$this->customer->isLogged()
                ? '<script type="text/javascript">$(document.getElementById("tk_dl.tk_dl")).click(function() { alert("'. $alertText .'"); $(\'#payment-address .checkout-heading a\').click(); });</script>'             
                : '';		    
            
			$quote_data = array();
            
      		$quote_data['tk_dl'] = array(
        		'code'         => 'tk_dl.tk_dl',
        		'title'        => $this->language->get('text_description').$messageAboutPassport,
        		'cost'         => 0.00,
        		'tax_class_id' => 0,
				'text'         => $this->currency->format(0.00)
      		);
      		     		
      		$method_data = array(
        		'code'       => 'tk_dl',
        		'title'      => $this->language->get('text_title'),
        		'quote'      => $quote_data,
				'sort_order' => $this->config->get('tk_dl_sort_order'),
        		'error'      => false
      		);
		}
	
		return $method_data;
	}
}
?>