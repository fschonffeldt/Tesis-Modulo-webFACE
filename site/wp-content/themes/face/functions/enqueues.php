<?php
/*
 * Enqueues
 */

if ( ! function_exists('b5st_enqueues') ) {
	function b5st_enqueues() {

		// Styles

		wp_enqueue_style( 'gutenberg-blocks', get_template_directory_uri() . '/theme/css/blocks.css' );

		wp_register_style('theme', get_template_directory_uri() . '/theme/css/site.css?ver=1.2', false, null);
		wp_enqueue_style('theme');

		// Scripts

		wp_register_script('theme', get_template_directory_uri() . '/theme/js/site.js', false, null, true);
		wp_enqueue_script('theme');

		if (is_singular() && comments_open() && get_option('thread_comments')) {
			wp_enqueue_script('comment-reply');
		}
	}
}
add_action('wp_enqueue_scripts', 'b5st_enqueues', 100);
