<?php 
/************************************************
* Entrada personalizada video.
************************************************/
add_action( 'init', 'register_cpt_video' );
function register_cpt_video() {
    $labels = array( 
            'name' => _x( 'Videos', 'video' ),
            'singular_name' => _x( 'video', 'video' ),
            'add_new' => _x( 'Agregar nuevo video', 'video' ),
            'add_new_item' => _x( 'Agregar nueva video', 'video' ),
            'edit_item' => _x( 'Editar video', 'video' ),
            'new_item' => _x( 'Nuevo video', 'video' ),
            'view_item' => _x( 'Ver video', 'video' ),
            'search_items' => _x( 'Search videos', 'video' ),
            'not_found' => _x( 'No se encontraron videos', 'video' ),
            'not_found_in_trash' => _x( 'No se encontraron videos en la papelera', 'video' ),
            'parent_item_colon' => _x( 'Parent video:', 'video' ),
            'menu_name' => _x( 'Videos', 'video' ),
    );
    $args = array( 
            'labels' => $labels,
            'hierarchical' => true,
            'supports' => array( 'title', 'editor' ),
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 5,
            'menu_icon' => 'dashicons-video-alt3',
            'show_in_nav_menus' => true,
            'show_in_rest' => true,
            'publicly_queryable' => false, //desactiva el single o page
            'exclude_from_search' => false,
            'has_archive' => true, //desactiva el archivo
            'query_var' => true,
            'can_export' => true,
            'rewrite' => true,
            'capability_type' => 'post'
    );
    register_post_type( 'video', $args );
}

/************************************************
 * Campos personalizados para video
 ************************************************/
add_action('add_meta_boxes', 'video_meta_boxes');
function video_meta_boxes() {
    add_meta_box( 'youtube-meta-box', __('Youtube'), 'youtube_meta_box_callback', 'video', 'normal', 'low' );
}

function youtube_meta_box_callback() {
	$post_meta = get_post_custom( $post->ID );
	$info = $post_meta['youtube'][0];
	echo wp_editor( $info, 'youtube');
}

add_action( 'save_post', 'video_save_custom_fields', 10, 2 );
function video_save_custom_fields( $post_id, $post ){
    if( isset( $_POST['youtube'] )) {
        update_post_meta( $post_id, 'youtube', $_POST['youtube']);
    }
}