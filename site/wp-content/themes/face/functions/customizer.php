<?php
/**
 * b5st Theme Customizer
 *
 * @package b5st
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */

function b5st_customize_register( $wp_customize ) {
	
	/* logos */
	$wp_customize->add_section( 'images_section', 
		array(
			'title'       => __( 'Imágenes', 'b5st' ),
			'priority'    => 10,
			'description' => __( 'Modifica las imágenes del tema.', 'b5st' ),
		)
	);

	$wp_customize->add_setting( 'images-logo' );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'images-logo', array(
		'label'    => __( 'Logo', 'b5st' ),
		'section'  => 'images_section',
		'settings' => 'images-logo',
		'description' => __( 'Sube o selecciona un nuevo logo para el sitio.', 'b5st' ),
	)
	));

	$wp_customize->add_setting( 'images-logo-2' );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'images-logo-2', array(
		'label'    => __( 'Logo 2', 'b5st' ),
		'section'  => 'images_section',
		'settings' => 'images-logo-2',
		'description' => __( 'Sube o selecciona un nuevo logo para el sitio (opcional).', 'b5st' ),
	)
	));

	// $wp_customize->add_setting( 'images-logo-small' );
	// $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'images-logo-small', array(
	// 	'label'    => __( 'Logo menú fijo', 'b5st' ),
	// 	'section'  => 'images_section',
	// 	'settings' => 'images-logo-small',
	// 	'description' => __( 'Sube o selecciona un nuevo logo para el menú fijo del sitio.', 'b5st' ),
	// )
	// ));

	$wp_customize->add_setting( 'images-favicon' );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'images-favicon', array(
		'label'    => __( 'Favicon', 'b5st' ),
		'section'  => 'images_section',
		'settings' => 'images-favicon',
		'description' => __( 'Sube o selecciona un nuevo icono de favicon para el sitio.', 'b5st' ),
	)
	));

	$wp_customize->add_setting( 'images-favicon-dark' );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'images-favicon-dark', array(
		'label'    => __( 'Favicon modo oscuro', 'b5st' ),
		'section'  => 'images_section',
		'settings' => 'images-favicon-dark',
		'description' => __( 'Sube o selecciona un nuevo icono de favicon para el modo oscuro del sitio.', 'b5st' ),
	)
	));
	
	/* Redes Sociales */
	$wp_customize->add_section( 'rrss_section', 
		array(
			'title'      => __('Redes sociales','b5st'),
			'priority'   => 12,
			'description'	=> 'Agregar links de redes sociales',
		)
	);
	$rrss = array('facebook','linkedin','twitter','youtube','instagram','whatsapp', 'tiktok');
	$cont = 1;
	foreach($rrss as $rs) {
		$wp_customize->add_setting( 
			$rs.'-url', 
			array(
				'sanitize_callback' => 'b5st_sanitize_text',
				'type' => 'theme_mod',
				'description' => 'Ingrese la URL de su perfil de '.$rs.':',
				'capability' => 'edit_theme_options',
			)
		);
		$wp_customize->add_control( 
				$rs.'-url', 
				array(
					'section' => 'rrss_section',
					'label' => esc_html__(ucfirst($rs).':', 'b5st' ),
					'type' => 'text',
					'input_attrs' => array(
						'placeholder' => __( 'http://...', 'b5st' ),
					),
					'description' => 'Ingrese la URL de su perfil de '.$rs.':',
	
				)
		);
		$cont++;  
	};

	/* Slider*/
	$wp_customize->add_section( 'slider_section', 
		array(
			'title'      => __('Slider','b4st'),
			'priority'   => 12,
			'description'	=> 'Agregar imagenes al slider',
		));
	$slides = array('slide-01','slide-02','slide-03','slide-04','slide-05');
	$cont=1;
	foreach($slides as $slide)
	{
		$wp_customize->add_setting( $slide.'-imagen' );
		$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, $slide.'-imagen', array(
			'label'       => __( 'Imagen '.$cont, 'b4st' ),
			'description' => __( 'Seleccione una imagen para el Slide '.$cont, 'b4st' ),
			'section'     => 'slider_section',
			'settings'    => $slide.'-imagen',
		)));

		$wp_customize->add_setting( $slide.'-imagen-s' );
		$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, $slide.'-imagen-s', array(
			'label'       => false,
			'description' => __( 'Seleccione una imagen para el Slide '.$cont.' versión móvil', 'b4st' ),
			'section'     => 'slider_section',
			'settings'    => $slide.'-imagen-s',
		)));

		$wp_customize->add_setting( 
			$slide.'-url', array('sanitize_callback' => 'b5st_sanitize_text' //cleans
		));
		$wp_customize->add_control( 
			$slide.'-url', 
			array(
				'section' => 'slider_section',
				'description' => 'Ingrese el enlace del slide.',
				'type' => 'text',
				'input_attrs' => array(
					'placeholder' => __( 'URL', 'b5st' ),
				)
		));
		$cont++;  
	};

	/* Noticias*/
	$wp_customize->add_section( 'news_section', 
		array(
			'title'      => __('Noticias','b5st'),
			'priority'   => 12,
			'description'	=> 'Opciones de sección Noticias',
		));

	$wp_customize->add_setting( 
		'news-title', 
		array(
			'sanitize_callback' => 'b5st_sanitize_text', //cleans
			'description' => 'Ingresa el título de la sección de noticias.',
		));
	$wp_customize->add_control( 
		'news-title', 
		array(
			'section' => 'news_section',
			'label' => esc_html__( 'Titulo de sección', 'b5st' ),
			'type' => 'text',
			'input_attrs' => array(
				'placeholder' => __( 'Titulo sección', 'b5st' ),
			),
			'description' => 'Ingresa el título de la sección de noticias.',
		));
	$wp_customize->add_setting( 
		'news-subtitle', array('sanitize_callback' => 'b5st_sanitize_text' //cleans
	));
	$wp_customize->add_control( 
		'news-subtitle', 
		array(
			'section' => 'news_section',
			'label' => esc_html__( 'Subtitulo de sección', 'b5st' ),
			'description' => 'Ingresa el subtítulo de la sección de noticias.',
			'type' => 'text',
			'input_attrs' => array(
				'placeholder' => __( 'Subtitulo sección', 'b5st' ),
			)
	));
	$wp_customize->add_setting( 
		'news-page', 
		array(
			'default' => '',
			'description' => 'Selecciona la página de noticias para mostrar en esta sección.',
		));
	$wp_customize->add_control( 
		'news-page', 
		array(
			'label' => 'Seleccionar página de noticias',
			'type'  => 'dropdown-pages',
			'section' => 'news_section',
			'settings' => 'news-page',
			'description' => 'Selecciona la página de noticias para mostrar en esta sección.',
		));

	/* Eventos*/
	$wp_customize->add_section( 'events_section', 
		array(
			'title'      => __('Eventos','b5st'),
			'priority'   => 12,
			'description'    => 'Opciones de eventos',
		));

	$wp_customize->add_setting( 
		'events-title', array('sanitize_callback' => 'b5st_sanitize_text' //cleans
		));
	$wp_customize->add_control( 
		'events-title', 
		array(
			'section' => 'events_section',
			'label' => esc_html__( 'Titulo de sección', 'b5st' ),
			'type' => 'text',
			'input_attrs' => array(
				'placeholder' => __( 'Titulo sección', 'b5st' ),
			),
			'description' => 'Modificar el título de la sección de eventos',
		));
	$wp_customize->add_setting( 
		'events-subtitle', array('sanitize_callback' => 'b5st_sanitize_text' //cleans
	));
	$wp_customize->add_control( 
		'events-subtitle', 
		array(
			'section' => 'events_section',
			'label' => esc_html__( 'Subtitulo de sección', 'b5st' ),
			'description' => 'Ingrese el subtitulo de sección.',
			'type' => 'text',
			'input_attrs' => array(
				'placeholder' => __( 'Subtitulo sección', 'b5st' ),
			)
	));
	

	/* Contacto */
	$wp_customize->add_section( 'contact_section', 
		array(
			'title'      => __('Contacto','b5st'),
			'priority'   => 12,
			'description' => 'Modificar sección de contacto.',
		));

	$wp_customize->add_setting( 
		'contact-title', array('sanitize_callback' => 'b5st_sanitize_text' //cleans
	));
	$wp_customize->add_control( 
		'contact-title', 
		array(
			'section' => 'contact_section',
			'label' => esc_html__( 'Título de la sección', 'b5st' ),
			'description' => 'Ingrese el título de la sección.',
			'type' => 'text',
			'input_attrs' => array(
				'placeholder' => __( 'Ingrese el título de la sección', 'b5st' ),
			)
	));

	$wp_customize->add_setting( 
		'contact-text', array('sanitize_callback' => 'b5st_sanitize_text' //cleans
	));
	$wp_customize->add_control( 
		'contact-text', 
		array(
			'section' => 'contact_section',
			'label' => esc_html__( 'Texto', 'b5st' ),
			'description' => 'Ingrese el texto asociado a la sección.',
			'type' => 'textarea',
			'input_attrs' => array(
				'placeholder' => __( 'Ingrese el texto', 'b5st' ),
			)
	));

	$wp_customize->add_setting( 
		'contact-form', array('sanitize_callback' => 'b5st_sanitize_text' //cleans
	));
	$wp_customize->add_control( 
		'contact-form', 
		array(
			'section' => 'contact_section',
			'label' => esc_html__( 'Shortcode del formulario (Contact Form 7)', 'b5st' ),
			'description' => 'Ingrese el shortcode del formulario (compatible con el plugin Contact Form 7).',
			'type' => 'text',
			'input_attrs' => array(
				'placeholder' => __( 'Ingrese el shortcode del formulario', 'b5st' ),
			)
	));

	$maps = array('map-1','map-2');
	$cont=1;
	foreach($maps as $map)
	{
		$wp_customize->add_setting( 
			$map.'-address', array('sanitize_callback' => 'b5st_sanitize_text'
		));
		$wp_customize->add_control( 
			$map.'-address', 
			array(
				'section' => 'contact_section',
				'label' => esc_html__( 'Dirección '.$cont.':', 'b5st' ),
				'type' => 'text',
				'input_attrs' => array(
					'placeholder' => __( 'Dirección', 'b5st' ),
				),
				'description' => 'Ingrese la dirección del mapa '.$cont
		));

		$wp_customize->add_setting( 
			$map.'-iframe');
		$wp_customize->add_control( 
			$map.'-iframe', 
			array(
				'section' => 'contact_section',
				'label' => false,
				'type' => 'textarea',
				'input_attrs' => array(
					'placeholder' => __( 'Codigo iframe mapa', 'b5st' ),
				),
				'description' => 'Ingrese el código de Iframe del mapa '.$cont
		));
		$cont++;  
	};

	/* Pie de página */
	$wp_customize->add_section( 'footer_section',
		array(
		'title' => __('Pie de pagina','b5st'),
		'priority' => 12,
		'description' => 'Configuración de los elementos del pie de página.',
		)
	);
	$wp_customize->add_setting( 'footer-logo' );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'footer-logo', array(
		'label'    => __( 'Logo:', 'b5st' ),
		'section'  => 'footer_section',
		'settings' => 'footer-logo',
		'description' => 'Seleccione una imagen para el logo del pie de página.'
	)));

	$wp_customize->add_setting( 'footer-sello' );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'footer-sello', array(
		'label'    => __( 'Sello acreditacion', 'b5st' ),
		'section'  => 'footer_section',
		'settings' => 'footer-sello',
		'description' => 'Seleccione una imagen para el sello de acreditación del pie de página.'
	)));

	$wp_customize->add_setting( 
		'footer-address');
	$wp_customize->add_control( 
		'footer-address', 
		array(
			'section' => 'footer_section',
			'label' => esc_html__( 'Dirección', 'b5st' ),
			'type' => 'textarea',
			'input_attrs' => array(
				'placeholder' => __( 'Código html', 'b5st' ),
			),
			'description' => 'Introduzca la dirección y correo electronico a mostrarse en el pie de página.'
	));

	$wp_customize->add_setting( 
		'footer-copyright');
	$wp_customize->add_control( 
		'footer-copyright', 
		array(
			'section' => 'footer_section',
			'label' => esc_html__( 'Copyright', 'b5st' ),
			'type' => 'textarea',
			'input_attrs' => array(
				'placeholder' => __( 'Todos los derechos...', 'b5st' ),
			),
			'description' => 'Introduzca el texto para el mensaje de copyright del pie de página.'
	)); 
}
add_action( 'customize_register', 'b5st_customize_register' );

/* sanitize */
function b5st_sanitize_text( $input ) {
    return wp_kses_post( force_balance_tags( $input ) );
}
function b5st_sanitize_checkbox( $checked ) {
	return ( ( isset( $checked ) && true == $checked ) ? true : false );
}
function b5st_sanitize_select( $input, $setting ) {
	$input = sanitize_key( $input );
	$choices = $setting->manager->get_control( $setting->id )->choices;
	return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
}
function b5st_sanitize_dropdown_pages( $page_id, $setting ) {
	$page_id = absint( $page_id );
	return ( 'publish' == get_post_status( $page_id ) ? $page_id : $setting->default );
  }

  
add_action( 'wp_head', 'b5st_customize_css' );
function b5st_customize_css() {
    ?>
         <style type="text/css">
		 </style>
	<?php 
}

