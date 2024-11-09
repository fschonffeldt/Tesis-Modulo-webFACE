<?php
/*
 * Setup
 */

if ( ! function_exists('b5st_setup') ) {
	function b5st_setup() {

		add_theme_support( 'editor-styles' );
		add_editor_style('theme/css/editor.css');

		// Gutenberg Blocks
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'align-wide' );
		
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');

		add_theme_support(
			'editor-font-sizes',
			array(
				array(
					'name'      => __( 'Small', 'b5st' ),
					'shortName' => __( 'S', 'b5st' ),
					'size'      => 14,
					'slug'      => 'small',
				),
				array(
					'name'      => __( 'Normal', 'b5st' ),
					'shortName' => __( 'M', 'b5st' ),
					'size'      => 16,
					'slug'      => 'normal',
				),
				array(
					'name'      => __( 'Large', 'b5st' ),
					'shortName' => __( 'L', 'b5st' ),
					'size'      => 22,
					'slug'      => 'large',
				),
				array(
					'name'      => __( 'Huge', 'b5st' ),
					'shortName' => __( 'XL', 'b5st' ),
					'size'      => 28,
					'slug'      => 'huge',
				),
			)
		);

		update_option('thumbnail_size_w', 285); /* internal max-width of col-3 */
		update_option('small_size_w', 350); /* internal max-width of col-4 */
		update_option('medium_size_w', 730); /* internal max-width of col-8 */
		update_option('large_size_w', 1110); /* internal max-width of col-12 */

		if ( ! isset($content_width) ) {
			$content_width = 1100;
		}

		add_theme_support( 'post-formats', array(
			'aside',
			'gallery',
			'link',
			'image',
			'quote',
			'status',
			'video',
			'audio',
			'chat'
		) );

		add_theme_support('automatic-feed-links');
	}
}
add_action('init', 'b5st_setup');

if ( ! function_exists( 'b5st_avatar_attributes' ) ) {
	function b5st_avatar_attributes($avatar_attributes) {
		$display_name = get_the_author_meta( 'display_name' );
		$avatar_attributes = str_replace('alt=\'\'', 'alt=\'Avatar for '.$display_name.'\' title=\'Gravatar for '.$display_name.'\'',$avatar_attributes);
		return $avatar_attributes;
	}
}
add_filter('get_avatar','b5st_avatar_attributes');

if ( ! function_exists( 'b5st_author_avatar' ) ) {
	function b5st_author_avatar() {

		echo get_avatar('', $size = '40');
	}
}

if ( ! function_exists( 'b5st_author_bio_avatar' ) ) {
	function b5st_author_bio_avatar() {

		echo get_avatar('', $size = '96');
	}
}

if ( ! function_exists( 'b5st_author_description' ) ) {
	function b5st_author_description() {
		echo get_the_author_meta('user_description');
	}
}

if ( ! function_exists( 'b5st_post_date' ) ) {
	function b5st_post_date() {
		if ( in_array( get_post_type(), array( 'post', 'attachment' ) ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

			if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
				$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time> <time class="updated" datetime="%3$s">(updated %4$s)</time>';
			}

			$time_string = sprintf( $time_string,
				esc_attr( get_the_date( 'c' ) ),
				get_the_date(),
				esc_attr( get_the_modified_date( 'c' ) ),
				get_the_modified_date()
			);

			echo $time_string;
		}
	}
}

/************************************************
* Aceptar svg
************************************************/
function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['ai'] = 'application/postscript';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

if ( ! defined('ABSPATH') ) {
    exit;
}

/************************************************
* Cambio de página de login.
************************************************/
function my_login_logo_one() { 
	?> 
	<style type="text/css"> 
	body.login div#login h1 a {
		background-image: url("<?=get_theme_mod('images-logo')?>");
		padding-bottom: 0px;
		padding-top: 40px;
		margin-bottom: 5px;
		background-size: contain;
		background-position: center center;
		width: 100%;
	} 
	body {
		background-color: #F4F6F6 !important;
		color: #4D596E !important;
	}
	body.login form#loginform {
		background-color: #D9DFE5 !important;
		border:0px;
	}
	.login #login_error, .login .message, .login .success {
		background-color: #D9DFE5 !important;
	}
	.button-primary {
		background-color: #083854 !important;
		border-color: #083854 !important;
	}
	body.login form input{
		border-radius: 0px;
		border: 0px;
		background-color: #e6e6e6
	}
	.sgr-infotext {
		display: none;
	}
	</style>
	<?php 
} add_action( 'login_enqueue_scripts', 'my_login_logo_one' );