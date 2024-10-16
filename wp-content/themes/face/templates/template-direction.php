<?php
/**
 * Template Name: Decanatura
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

<?php /*Contenido*/?>
<article class="px-4 py-3 py-md-5 pb-4">
    <div class="wrapper row gx-0" style="min-height: 300px">
        <?/*Sidebar*/?>
        <?php $sidebar = get_post_meta( get_the_ID(), "sidebar", true );?>
        <?php if($sidebar == '') $sidebar = 'vacio'; ?>
        <?php if($sidebar != 'vacio') {get_template_part('sidebar');}?>

        <div class="<?=($sidebar != 'vacio')?'col-md-9 ps-md-5':'col-md-12'?> text-justify text-content">
            <div class="team wrapper pt-md-0">
                <div class="row">

                    <?/*Slugs de categorias*/?>
                    <?php 
                    $queries = array(
                        array(
                            'taxonomy' => 'directivos',
                            'slugs' => array('decano', 'sec-academico'),
                        )
                    );

                    //Incorpora a las asistentes ejecutivas
                    $specific_post_ids = array(504, 527);

                    // Función para generar la salida HTML de cada item
                    function render_team_member($team) {
                        $img = has_post_thumbnail() ? get_the_post_thumbnail_url(get_the_ID(), 'full') : get_template_directory_uri() . '/theme/img/avatar.png';
                        ?>
                        <div class="col-md-12 py-2 px-2 mb-2 contenedor-item" data-nombre="<?php the_title(); ?>">
                            <div class="item">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <figure class="px-2 py-2 img-fluid" style="background-image:url(<?=$img?>); border: 2px solid #f7f8f9;"></figure>
                                    </div>
                                    <div class="col-8 col-md-10 py-2 d-flex flex-column justify-content-center">
                                        <small style="color: #5a718d; font-weight: 600;"><?php echo get_term_by('slug', get_post_field('post_name'), get_post_type())->name; ?></small>
                                        <h4 class="mb-0 text-uppercase" style="color: #0d5ba4;"><?php the_title(); ?></h4>
                                        <div class="text-start" style="font-size: 0.9rem;"><?php the_content(); ?></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php
                    }

                    // Loop para slugs
                    foreach ($queries as $query_data) {
                        foreach ($query_data['slugs'] as $term_slug) {
                            $args = array(
                                'post_type' => 'estructura',
                                'posts_per_page' => 100,
                                'order' => 'ASC',
                                'orderby' => 'title',
                                'tax_query' => array(
                                    array(
                                        'taxonomy' => $query_data['taxonomy'],
                                        'field' => 'slug',
                                        'terms' => $term_slug,
                                    ),
                                ),
                            );
                            $team = new WP_Query($args);
                            if ($team->have_posts()) :
                                while ($team->have_posts()) :
                                    $team->the_post();
                                    render_team_member($team);
                                endwhile;
                            endif;
                            wp_reset_postdata();
                        }
                    }

                    // Loop para posts específicos
                    $args_specific = array(
                        'post_type' => 'estructura',
                        'posts_per_page' => 100,
                        'order' => 'ASC',
                        'orderby' => 'title',
                        'post__in' => $specific_post_ids,
                    );
                    $team = new WP_Query($args_specific);
                    if ($team->have_posts()) :
                        while ($team->have_posts()) :
                            $team->the_post();
                            render_team_member($team);
                        endwhile;
                    endif;
                    wp_reset_postdata();

                    // Loop para comunicaciones
                    $args_comunicaciones = array(
                        'post_type' => 'estructura',
                        'posts_per_page' => 100,
                        'order' => 'ASC',
                        'orderby' => 'title',
                        'tax_query' => array(
                            array(
                                'taxonomy' => 'personal-administrativo',
                                'field' => 'slug',
                                'terms' => 'comunicaciones',
                            ),
                        ),
                    );
                    $team_comunicaciones = new WP_Query($args_comunicaciones);
                    if ($team_comunicaciones->have_posts()) :
                        while ($team_comunicaciones->have_posts()) :
                            $team_comunicaciones->the_post();
                            render_team_member($team_comunicaciones);
                        endwhile;
                endif;
                wp_reset_postdata();
                ?>
            </div>
        </div>

        <hr class="wp-block-separator has-alpha-channel-opacity is-style-wide">

        <?php /*Contenido de entrada*/?>
        <?php the_content()?>

    </div>
</article>


<?php get_footer();?>