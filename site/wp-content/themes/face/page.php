<?php get_header(); ?>

<?php /*banner page*/?>
<div class="banner-page py-5 px-4">
    <div class="wrapper">
        <h1 class="d-flex justify-content-center text-center text-uppercase mb-0 font-ubb" data-aos="fade-right">
            <?php the_title();?>
        </h1>
    </div>
</div>

<?php /*Breadcrumbs*/?>
<div class="col-12 mb-2 px-4">    
	<div class="wrapper border-bottom">
		<?php if (function_exists('dimox_breadcrumbs')) { ?>
			<?php dimox_breadcrumbs(); ?>
		<?php } ?>
	</div>
</div>

<?php /*Contenido*/?>
<article class="px-4 py-3 py-md-5 pb-4">
    <div class="wrapper row gx-0" style="min-height: 300px">
        <?/*Sidebar*/?>
        <?php $sidebar = get_post_meta( get_the_ID(), "sidebar", true );?>
        <?php if($sidebar == '') $sidebar = 'vacio'; ?>
        <?php if($sidebar != 'vacio') {get_template_part('sidebar');}?>

        <div class="<?=($sidebar != 'vacio')?'col-md-9 ps-md-5':'col-md-12'?> text-justify text-content">
            <?php the_content()?>
        </div>
    </div>
</article>

<?php get_footer(); ?>

