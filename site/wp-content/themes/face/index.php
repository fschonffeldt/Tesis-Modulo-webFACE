<?php get_header(); ?>

<?php /*slider*/?>
<?php 
$slides = array('slide-01','slide-02','slide-03','slide-04','slide-05');
$slides_con_contenido = 0;
?>
<div class="col-12 slider">
	<div id="main-carousel" class="carousel slide" data-bs-ride="carousel">
		<div class="carousel-inner">
			<?php $cont = 0;?>
			<?php foreach($slides as $slide): ?>
				<?php if(get_theme_mod($slide.'-imagen') != "" && get_theme_mod($slide.'-imagen-s') != ""): ?>
					<div class="slider-container carousel-item slider-image <?=(0 == $cont++)?'active':'';?>">
						<?php if(get_theme_mod($slide.'-url')):?>
							<a target="blank" href="<?=get_theme_mod($slide.'-url')?>">
						<?php endif;?>
							<img class="img-fluid d-none d-md-block" src="<?=get_theme_mod($slide.'-imagen');?>">
							<img class="img-fluid d-md-none d-block" src="<?=get_theme_mod($slide.'-imagen-s');?>">
						<?php if(get_theme_mod($slide.'-url')):?>
							</a>
						<?php endif;?>
					</div>
					<?php $slides_con_contenido++; ?>
				<?php endif;?>
			<?php endforeach;?>
		</div>
		<?php if($slides_con_contenido > 1): ?>
		<button class="carousel-control-prev pulse" type="button" data-bs-target="#main-carousel" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next pulse" type="button" data-bs-target="#main-carousel" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
		<?php endif; ?>
	</div>
</div>

<?php /*Noticias*/?>
<section class="news py-5 px-4">
	<div class="wrapper mt-md-4">
		<?php if(get_theme_mod('news-title') != "" ): ?>
			<h1 class="text-uppercase text-center font-ubb" data-aos="fade-right">
				<?=get_theme_mod('news-title')?>
			</h1>
		<?php endif;?>
		<?php if(get_theme_mod('news-subtitle') != "" ): ?>
			<span class="d-block w-100 text-center">
				<?=get_theme_mod('news-subtitle')?>
		</span>
		<?php endif;?>

		<div class="row mt-5">
			<?php /*Loop Wordpress*/?>
			<?php $args=array(
			'post_type' => 'post',
			'posts_per_page' => '6'
			);
			$videos = new WP_Query($args);
			if($videos->have_posts()) : while($videos->have_posts()) :
			$videos->the_post(); ?>

			<div class="col-md-6 gx-5 new mb-4" data-aos="fade-up">
				<div class="row">
					<div class="figure img-thumbnail rounded-0 col-4" onclick="location.href='<?php the_permalink(); ?>'" style="cursor: pointer; background-image: url(<?= get_the_post_thumbnail_url(get_the_ID(),'medium') ?>)"></div>
					<div class="col-8 d-flex flex-column justify-content-center">
						<div class="ps-3">
							<div class="date">
								<small><?php echo get_the_date('l d, F, Y'); ?></small></br>
							</div>
							<a href="<?php the_permalink(); ?>">
								<h4><?php the_title()?></h4>
							</a>
						</div>
					</div>
				</div>
			</div>

			<?php endwhile; endif; ?>
			<?php wp_reset_query();?>

			<div class="col-12 text-end">
				<?php if(get_theme_mod('news-page')):?>
					<strong>
						<a href="<?=get_permalink(get_theme_mod('news-page'))?>" style="font-size: 1.2rem">
							+ Noticias
						</a>
					</strong>
				<?php endif;?>
			</div>
			
				
			</div>
		</div>
  	</div>
</section>

<?php /*Eventos*/?>
<section class="activities py-5 px-4">
    <div class="wrapper py-md-5">
       
		<?php if(get_theme_mod('events-title') != "" ): ?>
			<h1 class="text-uppercase text-center font-ubb" data-aos="fade-right">
				<?=get_theme_mod('events-title')?>
			</h1>
		<?php endif;?>
		<?php if(get_theme_mod('events-subtitle') != "" ): ?>
			<span class="d-block w-100 text-center">
				<?=get_theme_mod('events-subtitle')?>
			</span>
		<?php endif;?>
        
        <div class="row mt-5 h-100">

			<?php /*Loop Wordpress*/?>
            <?php $args = array(
                'post_type' => 'event',
                'posts_per_page' => 6,
                'meta_key' => 'expiration',
                'orderby' => 'meta_value',
                'order' => 'ASC',
            );
            $events_query = new WP_Query($args);

            if ($events_query->have_posts()) :
                while ($events_query->have_posts()) : $events_query->the_post();

                    // Campos personalizados
                    $fecha_evento = get_post_meta(get_the_ID(), 'expiration', true);
                    $hora_evento = get_post_meta(get_the_ID(), 'time', true);
                    $lugar_evento = get_post_meta(get_the_ID(), 'place', true);

					// Categoría de evento
                    $categorias = wp_get_post_terms(get_the_ID(), 'category-event');

                    // Formatear fecha
                    $dia = date('d', strtotime($fecha_evento));
                    $mes = date_i18n('F', strtotime($fecha_evento));
                    $hora = date('H:i', strtotime($hora_evento));
                    ?>
					
                    <div class="col-md-4 mt-1 mt-md-0 box-actividad mb-3">
                        <div class="row">
                            <div class="fecha-actividad col-4">
                                <span class="hora"><?php echo esc_html($hora); ?></span>
                                <span class="dia"><?php echo esc_html($dia); ?></span>
                                <span style="text-align: center; display:block; font-size: 15px; font-weight: 600"><?php echo esc_html($mes); ?></span>
                            </div>
                            <div class="col-8">
                                <?php if (!empty($categorias)) : ?>
                                    <small class="d-block" style="color:#e96626; font-weight: 600">
                                        <?php echo esc_html($categorias[0]->name); // Mostrar la primera categoría ?>
                                    </small>
                                <?php endif; ?>
                                <h5 class="card-title text-left">
                                    <span class="titulo"><?php the_title(); // Título del evento ?></span>
                                </h5>
                                <span class="lugar w-100 mt-1 d-block" style="font-size: 0.8rem; line-height: 18px">
                                    <?php echo esc_html($lugar_evento); // Lugar del evento ?>
                                </span>
                            </div>
                        </div>
                    </div>
                    <?php
                endwhile;
            else :
                echo '<p>No hay eventos disponibles.</p>';
            endif;
            wp_reset_postdata();
            ?>
        </div>
    </div>
</section>


<?php /*Multimedia*/?>
<section class="video py-5 px-4" style="background-color: #cedded">
	<div class="row wrapper py-md-5">
		<h1 class="text-uppercase text-center font-ubb" data-aos="fade-right">Multimedia</h1>
		<span class="d-block w-100 text-center mb-5"><strong>Sumérgete</strong> en nuestros videos y descubre cada experiencia en acción.</span>

		<?php /*Loop Wordpress*/?>
		<?php $cont= 0;
		$args=array(
		'post_type' => 'video',
		'posts_per_page' => '4'
		);
		$videos = new WP_Query($args);
		if($videos->have_posts()) : while($videos->have_posts()) :
		$videos->the_post(); ?>
			<?php 
			// Campos personalizados
			$post_meta = get_post_custom( $post->ID );
			$infoYoutube = $post_meta['youtube'][0];?>

			<div class="col-md-3 video px-md-3">
				<div class="row">
					<div class="col-12 text-center">
						<div class="embed-responsive embed-responsive-16by9">
							<?= htmlspecialchars_decode($infoYoutube); ?>
							<style>
								iframe {max-width: 100%; height: 480px;}
							</style>
						</div>
					</div>
					<div class="col-12 info-noti text-center pb-2 pt-2">
						<h6 class="title text-center" style="font-weight: 800"> 
							<?php the_title();?>
						</h6>
					</div>
				</div>
			</div>
		<?php endwhile; endif; ?>
		<?php wp_reset_query();?>
	</div>
</section>

<?php get_footer(); ?>
