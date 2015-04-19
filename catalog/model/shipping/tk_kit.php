<?php
class ModelShippingTkKit extends Model {
	function getQuote($address) {
		$this->language->load('shipping/tk_kit');
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "zone_to_geo_zone WHERE geo_zone_id = '" . (int)$this->config->get('tk_kit_geo_zone_id') . "' AND country_id = '" . (int)$address['country_id'] . "' AND (zone_id = '" . (int)$address['zone_id'] . "' OR zone_id = '0')");
	
		if (!$this->config->get('tk_kit_geo_zone_id')) {
			$status = true;
		} elseif ($query->num_rows) {
			$status = true;
		} else {
			$status = false;
		}
		
		$method_data = array();
	
		if ($status) {
			$quote_data = array();
			
      		$quote_data['tk_kit'] = array(
        		'code'         => 'tk_kit.tk_kit',
        		'title'        => $this->language->get('text_description'),
        		'cost'         => 0.00,
        		'tax_class_id' => 0,
				'text'         => "от " . $this->currency->format(250.00)
      		);

      		$method_data = array(
        		'code'       => 'tk_kit',
        		'title'      => $this->language->get('text_title'),
        		'quote'      => $quote_data,
				'sort_order' => $this->config->get('tk_kit_sort_order'),
        		'error'      => false
      		);
		}
	
		return $method_data;
	}
}
?>