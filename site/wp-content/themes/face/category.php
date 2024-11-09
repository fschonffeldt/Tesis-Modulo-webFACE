<?php get_header();?>

<?php /*banner page*/?>
<div class="banner-page py-5 px-4">
    <div class="wrapper">
        <h1 class="d-flex justify-content-center text-center text-uppercase mb-0">
            <div class="me-2">
            </div>
            Noticias
        </h1>
    </div>
</div>

<?php /*Breadcrumbs*/?>
<div class="col-12 mb-2 wrapper-extend px-1 border-bottom">    
	<div class="wrapper">
		<?php if (function_exists('dimox_breadcrumbs')) { ?>
			<?php dimox_breadcrumbs(); ?>
		<?php } ?>
	</div>
</div>

<?php /*Contenido*/?>
<?php /* Noticias */ ?>
<div class="news py-3 px-4" style="background-color: #ffffff">
    <div class="wrapper">
        <div class="row mt-0">
            <div class="col-12 mb-5">
                <?php
                $categories = get_categories(array(
                    'taxonomy' => 'category',
                    'orderby' => 'name',
                    'order'   => 'ASC',
                    'hide_empty' => false,
                    'exclude' => array(3),
                ));
                $current_category_id = get_queried_object_id();
                if ($categories) : ?>
                    <nav class="menu-categories">
                        <ul class="menu-categories-list">
                            <?php foreach ($categories as $category) : 
                                $active_class = ($category->term_id == $current_category_id) ? 'active-category' : ''; ?>
                                
                                <li class="menu-categories-item <?php echo esc_attr($active_class); ?>">
                                    <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>">
                                        <?php echo esc_html($category->name); ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </nav>
                <?php endif; ?>
            </div>

            <?php /*Loop de WordPress*/?>
            <?php
            $cont = 0;
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => 12,
                'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
                'cat' => $current_category_id
            );
            $posts = new WP_Query($args);
            if ($posts->have_posts()) : while ($posts->have_posts()) : $posts->the_post(); ?>
                <div class="col-md-6 gx-5 new mb-4" data-aos="fade-up">
                    <div class="row">
                        <div class="figure img-thumbnail rounded-0 col-4" onclick="location.href='<?php the_permalink(); ?>'" style="cursor: pointer; background-image: url(<?= get_the_post_thumbnail_url(get_the_ID(), 'medium') ?>)"></div>
                        <div class="col-8 d-flex flex-column justify-content-center">
                            <div class="ps-3">
                                <div class="date">
                                    <small><?php echo get_the_date('l d, F, Y'); ?></small><br>
                                </div>
                                <a href="<?php the_permalink(); ?>">
                                    <h4><?php the_title(); ?></h4>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endwhile; endif; ?>
            <?php wp_reset_query();?>

            <?php /*Paginacion*/?>
            <div class="d-block text-center">
                <?php bootstrap_pagination($posts); ?>
            </div>
        </div>
    </div>
</div>


<?php get_footer(); ?>