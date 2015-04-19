<?php
class ModelShippingRussianPost extends Model {
	function getQuote($address) {
		$this->language->load('shipping/russianpost');
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "zone_to_geo_zone WHERE geo_zone_id = '" . (int)$this->config->get('russianpost_geo_zone_id') . "' AND country_id = '" . (int)$address['country_id'] . "' AND (zone_id = '" . (int)$address['zone_id'] . "' OR zone_id = '0')");
	
		if (!$this->config->get('russianpost_geo_zone_id')) {
			$status = true;
		} elseif ($query->num_rows) {
			$status = true;
		} else {
			$status = false;
		}
		
        $weight = $this->cart->getWeight();
		$method_data = array();
	
		if ($status && $weight < 20) {
			$quote_data = array();
			
      		$quote_data['russianpost'] = array(
        		'code'         => 'russianpost.russianpost',
        		'title'        => $this->language->get('text_description'),
        		'cost'         => 0.00,
        		'tax_class_id' => 0,
				'text'         => "от " . $this->currency->format(350.00)
      		);

      		$method_data = array(
        		'code'       => 'russianpost',
        		'title'      => $this->language->get('text_title'),
        		'quote'      => $quote_data,
				'sort_order' => $this->config->get('russianpost_sort_order'),
        		'error'      => false
      		);
		}
	
		return $method_data;
	}
}
?>