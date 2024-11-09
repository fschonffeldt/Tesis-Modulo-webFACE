<?php $sidebar = get_post_meta( get_the_ID(), "sidebar", true );?>
<?php if($sidebar == '') $sidebar = 'vacio'; ?>

<?php if($sidebar != 'vacio' && !is_single() && !is_search()):?>
<div class="col-md-3 pb-4">
	<div class="fixme">
		<?php wp_nav_menu( array('menu' => $sidebar, 'items_wrap' => '<ul class="list-group list-group-flush mb-4">%3$s</ul>')); ?>
	</div>
</div>
<?php endif;?>