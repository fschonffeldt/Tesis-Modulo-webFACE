<?php
/**
 * Template Name: Contacto
 */
    get_header(); 
?>
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

<?php /*Ubicación - Google Maps*/?>
<section class="maps wrapper my-5 px-4">
    <h2 class="d-flex justify-content-center text-center text-uppercase px-4 font-ubb">
        Ubicación
    </h2>
    <div class="row gx-0 my-4">
        <?php $maps = array('map-1','map-2');?>
        <?php foreach($maps as $map):?>
        <div class="col-md-6 px-2 text-center">
            <?php if(get_theme_mod($map.'-address')):?>
                <?=get_theme_mod($map.'-address')?>
            <?php endif;?>
            <?php if(get_theme_mod($map.'-iframe')):?>
                <div class="mt-3" style="overflow: hidden; border-radius: 10px">
                    <?=get_theme_mod($map.'-iframe')?>
                </div>
            <?php endif;?>
        </div>
        <?php endforeach;?>
    </div>
</section>

<?php /*Formulario Contacto*/?>
<section class="contact py-5 px-4" style="background-color: #e0ecfa">
	<div class="wrapper py-md-4">
        <?php if(get_theme_mod('contact-title') != "" ): ?>
			<h2 class="d-flex justify-content-center text-center text-uppercase font-ubb">
				<?=get_theme_mod('contact-title'); ?>
			</h2>
		<?php endif;?>
		<div class="row">
			<div class="col-12 text-center mb-4">
                <?php if(get_theme_mod('contact-text') != "" ): ?>
                    <p class="text-center"><?=get_theme_mod('contact-text'); ?></p>
                <?php endif;?>
            </div>
			<div class="col-12 mt-3">
                <?php if(get_theme_mod('contact-form') != "" ): ?>
					<?= do_shortcode(get_theme_mod('contact-form'));?>
				<?php endif;?>
			</div>
		</div>
	</div>
</section>

<?php get_footer();?>