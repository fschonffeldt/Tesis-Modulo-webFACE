<?php get_header(); ?>

<?php /*banner page*/?>
<div class="banner-page py-5 px-4">
    <div class="wrapper">
        <h1 class="d-flex justify-content-center text-center text-uppercase mb-0 font-ubb">
            <?php
            if(get_post_type() == 'post') echo 'noticia';
            if(get_post_type() == 'event') echo 'Evento';
            ?>
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
        <div class="col-md-9 text-justify text-content pe-0 pe-md-4">
            <?php if(get_post_type() == 'post'):?>
            <div class="mb-4 rounded-0 position-relative" style="width: 100%; height: 0; padding-top: 56.25%; background-image: url(<?= get_the_post_thumbnail_url(get_the_ID(),'full') ?>);background-position: center; background-size: cover;}">
                <div class="date">
                    Publicado el <?php echo get_the_date('d \d\e F \d\e\l Y'); ?></span>
                </div>
            </div>
            <?php endif;?>
            <h1 class="pt-1 pb-3 font-ubb wp-block-heading">
                <?php the_title();?>
            </h1>

            <?php /*Botones de compartir*/?>
            <div class="share-buttons-container my-3 text-end">
                <ul class="share-buttons mx-0">
                    <li>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fface.ubiobio.cl&quote=" title="Compartir en Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&quote=' + encodeURIComponent(document.URL)); return false;">
                            <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                <path class="hover-svg" style="fill: #9daec3;stroke-width: 0px;" d="M30,15c0,8.28-6.72,15-15,15h0C6.72,30,0,23.28,0,15h0C0,6.72,6.72,0,15,0h0c8.28,0,15,6.72,15,15h0Z"/>
                                <path style="fill: #fff; stroke-width: 0px;" d="M19.44,13.84l-.25,2.01c-.04.34-.33.59-.66.59h-3.25v8.39c-.34.03-.69.05-1.04.05-.78,0-1.55-.08-2.29-.23v-8.21h-2.5c-.23,0-.42-.19-.42-.42v-2.51c0-.23.19-.42.42-.42h2.5v-3.77c0-2.31,1.87-4.18,4.17-4.18h2.92c.23,0,.42.19.42.42v2.51c0,.23-.19.42-.42.42h-2.08c-.92,0-1.67.75-1.67,1.67v2.93h3.5c.4,0,.71.35.66.75Z"/>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fface.ubiobio.cl&text=:%20https%3A%2F%2Fface.ubiobio.cl" target="_blank" title="twittear noticia" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;">
                            <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                            <path class="hover-svg" style="fill: #9daec3; stroke-width: 0px;" d="M30,15c0,8.28-6.72,15-15,15h0C6.72,30,0,23.28,0,15h0C0,6.72,6.72,0,15,0h0c8.28,0,15,6.72,15,15h0Z"/>
                            <path style="fill: #fff; stroke-width: 0px;" d="M17.16,13.62l6.07-6.49h-2.3l-4.76,5.09-3.65-5.09h-6.3l6.38,8.91-6.38,6.82h2.3l5.08-5.43,3.89,5.43h6.3l-6.62-9.25ZM9.46,8.8h2.2l8.88,12.4h-2.2l-8.88-12.4Z"/>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fface.ubiobio.cl&title=&summary=&source=https%3A%2F%2Fface.ubiobio.cl" target="_blank" title="Compartir en Linkedin" onclick="window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;">
                            <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                            <path class="hover-svg" style="fill: #9daec3; stroke-width: 0px;" d="M30,15c0,8.28-6.72,15-15,15h0C6.72,30,0,23.28,0,15h0C0,6.72,6.72,0,15,0h0c8.28,0,15,6.72,15,15h0Z"/>
                            <g>
                                <circle style="fill: #fff; stroke-width: 0px;" cx="9.69" cy="9.06" r="1.93"/>
                                <rect style="fill: #fff; stroke-width: 0px;" x="8.08" y="12.28" width="3.22" height="9.66" rx=".14" ry=".14"/>
                                <path style="fill: #fff; stroke-width: 0px;" d="M22.24,15.82v5.47c0,.35-.29.64-.64.64h-1.93c-.35,0-.64-.29-.64-.64v-4.51c0-.89-.72-1.61-1.61-1.61s-1.61.72-1.61,1.61v4.51c0,.35-.29.64-.64.64h-1.93c-.35,0-.64-.29-.64-.64v-8.37c0-.35.29-.64.64-.64h1.93c.35,0,.64.29.64.64v.41c.64-.83,1.71-1.38,2.9-1.38,1.78,0,3.54,1.29,3.54,3.86Z"/>
                            </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:?subject=&body=:%20https%3A%2F%2Fface.ubiobio.cl" target="_blank" title="Send email" onclick="window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(document.URL)); return false;">
                            <svg  width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                            <path class="hover-svg" style="fill: #9daec3; stroke-width: 0px;" d="M30,15c0,8.28-6.72,15-15,15h0C6.72,30,0,23.28,0,15h0C0,6.72,6.72,0,15,0h0c8.28,0,15,6.72,15,15h0Z"/>
                            <path style="fill: #fff; stroke-width: 0px;" d="M21.88,7.81h-13.75c-1.72,0-3.12,1.41-3.12,3.12v8.13c0,1.72,1.41,3.12,3.12,3.12h13.75c1.72,0,3.12-1.41,3.12-3.12v-8.13c0-1.72-1.41-3.12-3.12-3.12ZM8.12,9.06h13.75c.24,0,.46.05.67.13l-7.71,6.52-7.59-6.43c.26-.14.56-.23.88-.23ZM6.25,19.06v-8.13c0-.26.05-.5.15-.73l5.25,4.44-5.21,5.21c-.12-.24-.19-.51-.19-.8ZM21.88,20.94h-13.75c-.29,0-.56-.07-.8-.19l5.28-5.28,1.83,1.55c.12.1.26.15.4.15s.29-.05.4-.15l2.01-1.7,5.5,5.4c-.26.14-.55.22-.87.22ZM23.75,19.06c0,.26-.06.51-.15.74l-5.39-5.3,5.16-4.37c.05-.04.08-.1.12-.15.16.28.27.6.27.95v8.13Z"/>
                            <path style="fill: #fff; stroke-width: 0px;" d="M21.96,7.72h-13.92c-1.74,0-3.16,1.42-3.16,3.16v8.23c0,1.74,1.42,3.16,3.16,3.16h13.92c1.74,0,3.16-1.42,3.16-3.16v-8.23c0-1.74-1.42-3.16-3.16-3.16ZM21.96,8.99c.24,0,.47.05.68.13l-7.81,6.61-7.69-6.51c.27-.14.57-.23.89-.23h13.92ZM23.86,19.11c0,1.05-.85,1.9-1.9,1.9h-13.92c-1.05,0-1.9-.85-1.9-1.9v-8.23c0-.26.05-.51.15-.73l8.14,6.89c.12.1.26.15.41.15s.29-.05.41-.15l8.23-6.96c.05-.04.08-.1.12-.15.17.28.27.61.27.96v8.23Z"/>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <?php /*Contenido entrada*/?>
            <div class="text-start">
                <?php the_content()?>
            </div>
        </div>

        <?php /*Sidebar*/?>
        <div class="col-md-3">
            <div class="px-4 py-5" style="background-color: #f7f7f7;">
                <h4 class="text-uppercase font-ubb text-center mb-3 wp-block-heading">Últimas Noticias</h4>
                <?php /*Loop wordpress*/?>
                <?php
                $args = array(
                    'post_type'      => 'post',
                    'posts_per_page' => 5,
                );
                $news = new WP_Query($args);

                if ($news->have_posts()) :
                    while ($news->have_posts()) :
                        $news->the_post();
                        $date = get_the_date('d \d\e F \d\e\l Y');
                ?>
                    <div class="col-12 d-flex flex-column justify-content-center mb-3">
                        <div style="font-size: 0.8rem">Publicado el <?= $date; ?></div>
                        <div class="mb-0" style="font-weight: 700"><a href="<?php the_permalink()?>"><?php the_title()?></a></div>
                    </div>
                    <hr>
                <?php
                    endwhile;
                else:
                ?>
                    <span class="py-3 px-4"><strong>¡Ups!</strong>, no se encontraron noticias...</span>
                <?php
                endif;
                wp_reset_postdata();
                ?>
                <div class="text-end">
                    <a href="https://face.ubiobio.cl/noticias" style="color: #23252c; font-weight: 800; font-size: 1.1rem ">+ Noticias</a>
                </div>
            </div>
        </div>
    </div>
</article>

<?php get_footer(); ?>