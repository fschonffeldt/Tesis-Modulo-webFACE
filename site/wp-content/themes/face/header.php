<!DOCTYPE html>
<html class="no-js" lang="es" <?php language_attributes(); ?>>
<head>
  	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php /*css reload*/?>
	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Last-Modified" content="0">
	<meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
	<meta http-equiv="Pragma" content="no-cache">
	<?php /*Jquery Google*/?>
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<?php/*favicon*/?>
	<?php if(get_theme_mod('images-favicon') != "" ): ?>
		<link href="<?=get_theme_mod('images-favicon')?>" rel="icon" media="(prefers-color-scheme: light)"/>
	<?php endif;?>
	<?php if(get_theme_mod('images-favicon-dark') != "" ): ?>
		<link href="<?=get_theme_mod('images-favicon-dark')?>" rel="icon" media="(prefers-color-scheme: dark)"/>
	<?php endif;?>
	<?php /*Google font*/?>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
	<?php /*Bootstrap 5*/?>
	<link href="<?php echo get_stylesheet_directory_uri(); ?>/theme/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<?php /*Owl Carousel*/?>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" rel="stylesheet">
	<?php /*AOS*/?>
	<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
	<?php wp_head(); ?>
	<?php /*css Etiquetas*/?>
	<?php get_template_part('/loops/tags-head')	;?>
</head>

<body <?php body_class(); ?>>
	<?php /*Cabecera*/?>
	<header>
		<?php /*Barra superior*/?>
		<div class="wrapper top d-none d-md-block">
			<div class="row">
				<div class="col-3">
					<?php /*Gtrasnlate*/?>
					<div style="background-color: aliceblue; padding: 8px;">
						<div style="transform: scale(0.9);"><?php echo do_shortcode('[gtranslate]');?></div>
					</div>
				</div>
				<div class="col-8 py-2 text-end">
					<?php /*Redes sociales*/?>
					<ul class="mb-0">
						<li class="d-inline-block"><a target="blank" href="https://ubiobio.cl">UBB</a></li>
						<li class="d-inline-block"><a target="blank" href="https://intranet.ubiobio.cl">Intranet</a></li>
						<li class="d-inline-block"><a target="blank" href="https://gmail.com">Correo electrónico</a></li>
						<li class="d-inline-block"><a href="https://face.ubiobio.cl/contacto">Contacto</a></li>
					</ul>
				</div>
				<div class="col-1 text-end">
					<?php /*Buscador*/?>
					<div class="search-container">
						<div class="search-button py-2 text-center">
							<svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.77 20.17">
								<path style="fill: #fff" d="m21.77,17.15l-6.34-5.52c.51-1.06.81-2.25.81-3.51C16.24,3.64,12.6,0,8.12,0S0,3.64,0,8.12s3.64,8.12,8.12,8.12c1.77,0,3.4-.58,4.74-1.54l6.28,5.47,2.63-3.02Zm-13.65-4.91c-2.27,0-4.12-1.85-4.12-4.12s1.85-4.12,4.12-4.12,4.12,1.85,4.12,4.12-1.85,4.12-4.12,4.12Z"/>
							</svg>
						</div>
						<div class="search-field">
							<form class="w-100" action="/" method="get" class="wrapper py-3">
								<div class="input-group">
									<input type="text" name="s" id="search" class="form-control border-0 rounded-0" placeholder="Ingrese su búsqueda" value="<?php the_search_query(); ?>" aria-describedby="search-button-form">
									<button type="submit" class="btn btn-secondary pulse border-0 rounded-0" type="button" id="search-button-form">
										<svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.77 20.17">
											<path style="fill: #fff" d="m21.77,17.15l-6.34-5.52c.51-1.06.81-2.25.81-3.51C16.24,3.64,12.6,0,8.12,0S0,3.64,0,8.12s3.64,8.12,8.12,8.12c1.77,0,3.4-.58,4.74-1.54l6.28,5.47,2.63-3.02Zm-13.65-4.91c-2.27,0-4.12-1.85-4.12-4.12s1.85-4.12,4.12-4.12,4.12,1.85,4.12,4.12-1.85,4.12-4.12,4.12Z"/>
										</svg>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>                   
			</div>
		</div>
		<?php /*Logos*/?>
		<div class="row wrapper py-4 px-4">
			<div class="col-8 col-md-6">
				<?php if(get_theme_mod('images-logo') != "" ): ?>
					<img class="" src="<?=get_theme_mod('images-logo')?>" style="max-width: 330px"/>
				<?php endif;?>
			</div>
			<div class="col-4 col-md-6 text-end">
			<?php if(get_theme_mod('images-logo-2') != "" ): ?>
				<img class="logo-ubb" src="<?=get_theme_mod('images-logo-2')?>" style="max-width: 140px"/>
			<?php endif;?>
			</div>
		</div>
		<?php /*Menu*/?>
		<div class="wrapper content-menu">
			<?php /*Menu principal*/?>
			<nav class="menu menu-full d-none d-xl-block">
				<?php wp_nav_menu( array('menu' => 'principal')); ?>
			</nav>
			<?php /*Menu responsivo*/?>
			<div class="d-block d-xl-none text-center mt-2 py-3">
				<a class="button-responsive-menu" data-bs-toggle="collapse" data-bs-target="#responsive-menu" aria-expanded="false" aria-controls="responsive-menu" style="color: #fff; font-weight: 500">
					<svg  id="icon-menu" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.97 23.71">
						<path style="fill: #ffffff" d="m2.5,23.71C1.12,23.71,0,22.6,0,21.22c0-1.38,1.12-2.5,2.5-2.5l28.97-.03h0c1.38,0,2.5,1.12,2.5,2.5,0,1.38-1.12,2.5-2.5,2.5l-28.97.03h0Z"/>
						<path style="fill: #ffffff" d="m2.5,14.37C1.12,14.37,0,13.25,0,11.88c0-1.38,1.12-2.5,2.5-2.5l28.97-.03h0c1.38,0,2.5,1.12,2.5,2.5,0,1.38-1.12,2.5-2.5,2.5l-28.97.03h0Z"/>
						<path style="fill: #ffffff" d="m2.5,5.03C1.12,5.03,0,3.91,0,2.53,0,1.15,1.12.03,2.5.03l28.97-.03h0c1.38,0,2.5,1.12,2.5,2.5,0,1.38-1.12,2.5-2.5,2.5l-28.97.03h0Z"/>
					</svg>
					Menú   
				</a>
			</div>
			<div class="wrapper-extend collapse d-xl-none text-center" id="responsive-menu">
				<?php wp_nav_menu( array('menu' => 'principal')); ?>
			</div>
		</div>
	</header>


<script>
//Funcionalidad para el buscador
jQuery(document).ready(function($){
    $('.search-button').on('click', function() {
        $('.search-container').toggleClass('active');
        if ($('.search-container').hasClass('active')) {
            $('.search-field input').focus();
        }
    });
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-container').length) {
            $('.search-container').removeClass('active');
        }
    });
});
</script>