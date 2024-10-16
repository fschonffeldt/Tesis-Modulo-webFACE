<?php get_header(); ?>

<?php /*banner page*/?>
<div class="banner-page py-5 px-4">
    <div class="wrapper">
        <h1 class="d-flex justify-content-center text-center text-uppercase mb-0 font-ubb">
            Búsqueda
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
<div class="px-4 py-3 py-md-5 pb-4">
    <div class="wrapper row gx-0" style="min-height: 300px">
        <div class="col-12">
            <?php if(have_posts()): while(have_posts()): the_post(); ?>
            <article role="article" id="post_<?php the_ID()?>" <?php post_class("wrap-md pb-2 mb-3 text-content border-bottom")?>>
                <h4 class="mb-0">
                    <a href="<?php the_permalink(); ?>">
                        <?php the_title()?>
                    </a>
                </h4>
                <section class="entry-content">
                    <?php the_excerpt(); ?>
                    <div class="text-center text-md-end mt-3 mb-4 text-justify">
                        <div class="more-button mt-0">
                            <a href="<?php the_permalink(); ?>">+ Ver contenido
                            </a>
                        </div>
                    </div>
                </section>
            </article>
            <?php endwhile; else: ?>
                Lo sentimos, <strong>no se encontraron resultados</strong> para su búsqueda, intente nuevamente.
            <?php endif; ?>
        </div>
        <div class="d-block text-center">
            <?php bootstrap_pagination(); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>