<div id="cart">
  <a href="<?php echo $cart; ?>">
    <div class="heading">    
      <h4><?php echo $heading_title; ?></h4>
      <span id="cart-total"><?php echo $text_items; ?></span>    
    </div>
  </a>
  <div class="content">
    <?php if ($products || $vouchers) { ?>
    <div class="mini-cart-info">
      <table>
        <?php foreach ($products as $product) { ?>
        <tr>
          <td class="image"><?php if ($product['thumb']) { ?>
            <a href="<?php echo $product['href']; ?>"><img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" /></a>
            <?php } ?></td>
          <td class="name"><a href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
            <div>
              <?php foreach ($product['option'] as $option) { ?>
              - <small><?php echo $option['name']; ?> <?php echo $option['value']; ?></small><br />
              <?php } ?>
              <?php if ($product['recurring']): ?>
              - <small><?php echo $text_payment_profile ?> <?php echo $product['profile']; ?></small><br />
              <?php endif; ?>
            </div></td>
            <td class="sub"><img src="catalog/view/theme/default/image/sub.png" title="Уменьшить" id="sub<?= $product['key'] ?>"></td>
            <td class="quantity"><input type="text" size="1" value="<?php echo $product['quantity']; ?>" id="qty<?= $product['key'] ?>"></input></td>
            <td class="add"><img src="catalog/view/theme/default/image/add.png" title="Увеличить" id="add<?= $product['key'] ?>"></td>
            <td class="total"><?php echo $product['total']; ?></td>
            <td class="remove"><img src="catalog/view/theme/default/image/remove.png" alt="<?php echo $button_remove; ?>" title="<?php echo $button_remove; ?>" id="rem<?= $product['key'] ?>"></td>
            <script type="text/javascript">
                $('#cart #qty<?= $product['key'] ?>').live('blur', function() {
                    $('#cart').load('index.php?route=module/cart&update=<?= $product['key'] ?>&qty=' + this.value + ' #cart > *');
                });
                
                $('#cart #sub<?= $product['key'] ?>').live('click', function() {
                    var qty = Number($('#cart #qty<?= $product['key'] ?>').attr('value')) - 1;
                    $('#cart').load('index.php?route=module/cart&update=<?= $product['key'] ?>&qty=' + qty + ' #cart > *');
                });
                
                $('#cart #add<?= $product['key'] ?>').live('click', function() {
                    var qty = Number($('#cart #qty<?= $product['key'] ?>').attr('value')) + 1;
                    $('#cart').load('index.php?route=module/cart&update=<?= $product['key'] ?>&qty=' + qty + ' #cart > *');
                });
                
                $('#cart #rem<?= $product['key'] ?>').live('click', function() {
                    $('#cart').load('index.php?route=module/cart&remove=<?= $product['key'] ?> #cart > *');
                });
            </script>          
        </tr>
        <?php } ?>
        <?php foreach ($vouchers as $voucher) { ?>
        <tr>
          <td class="image"></td>
          <td class="name"><?php echo $voucher['description']; ?></td>
          <td class="quantity">x&nbsp;1</td>
          <td class="total"><?php echo $voucher['amount']; ?></td>
          <td class="remove"><img src="catalog/view/theme/default/image/remove-small.png" alt="<?php echo $button_remove; ?>" title="<?php echo $button_remove; ?>"></td>
        </tr>
        <?php } ?>
      </table>
    </div>
    <div class="mini-cart-total">
      <table>
        <?php foreach ($totals as $total) { ?>
        <tr>
          <td class="right"><b><?php echo $total['title']; ?>:</b></td>
          <td class="right"><?php echo $total['text']; ?></td>
        </tr>
        <?php } ?>
      </table>
    </div>
    <div class="checkout"><a href="<?php echo $cart; ?>"><?php echo $text_cart; ?></a> | <a href="<?php echo $checkout; ?>"><?php echo $text_checkout; ?></a></div>
    <?php } else { ?>
    <div class="empty"><?php echo $text_empty; ?></div>
    <?php } ?>  
  </div>
</div>