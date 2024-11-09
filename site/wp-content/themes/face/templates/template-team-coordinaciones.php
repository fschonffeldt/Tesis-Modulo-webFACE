<?php
/**
 * Template Name: Personal - Coordinaciones
 */
    get_header(); 
?>

<?php $sidebar = get_post_meta( get_the_ID(), "sidebar", true );?>

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
        <?php if($sidebar != 'vacio'):?>
            <div class="col-md-3 pb-4">
                <?php wp_nav_menu( array('menu' => $sidebar, 'container_class' => ' fixme', 'items_wrap' => '<ul class="list-group list-group-flush mb-4">%3$s</ul>')); ?>
            </div>
            <div class="col-md-9 text-justify text-content ps-md-5">
                <section class="team wrapper py-5 pt-md-0 px-4">
                    <div class="row">

                        <?php /*Slugs de categorias*/?>
                        <?php $term_slugs = array(
                            'coordinadora-de-investigacion-y-postgrado',
                            'coordinadora-carreras-vespertinas-chillan',
                            'coordinadora-carreras-vespertinas-concepcion',
                            );?>

                        <?php foreach ($term_slugs as $term_slug):?>

                            <?php /*Loop Wordpress*/?>
                            <?php $args=array(
                                'post_type' => 'estructura',
                                'posts_per_page' => 100,
                                'order' => 'ASC',
                                'orderby' => 'title',
                                'tax_query' => array(
                                    array(
                                        'taxonomy' => 'directivos',
                                        'field' => 'slug',
                                        'terms' => $term_slug,
                                    ),
                                ),
                            );
                            $team = new WP_Query($args);
                            if($team->have_posts()) : while($team->have_posts()) :
                            $team->the_post(); ?>
                            
                            <div class="col-md-12 py-2 px-2 mb-2 contenedor-item" data-aos="fade-up" data-nombre="<?php the_title()?>">
                                <div class="item">
                                    <div class="row">
                                        <div class="col-4 col-md-2">
                                            <?php if(!has_post_thumbnail()) {
                                                $img = get_template_directory_uri().'/theme/img/avatar.png';
                                            }
                                            else {
                                                $img = get_the_post_thumbnail_url(get_the_ID(),'full');
                                            }?>
                                            <figure class="px-2 py-2 img-fluid" style="background-image:url(<?=$img?>); border: 2px solid #f7f8f9;">
                                            </figure>
                                        </div>
                                        <div class="col-8 col-md-10 py-2 d-flex flex-column justify-content-center">
                                            <?php $term = get_term_by('slug', $term_slug, 'directivos');
                                            if($term_slug) {
                                                echo '<small style="color: #5a718d; font-weight: 600;">'.$term->name.'</small>';
                                            }
                                            ?>
                                            <h4 class="mb-0 text-uppercase " style="color: #0d5ba4"><?php the_title()?></h4>
                                            <div class="text-start" style="font-size: 0.9rem"><?php the_content()?></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <?php endwhile; endif; ?>
                            <?php wp_reset_query();?>
                        
                        <?php endforeach;?>
                    </div>
                </section>
            </div>
        <?php else:?>

        <?php endif;?>
    </div>
</article>

<?php get_footer();?>