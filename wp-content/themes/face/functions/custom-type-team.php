<?php 
/************************************************
 * Entrada personalizada.
 ************************************************/
add_action( 'init', 'register_cpt_estructura' );
function register_cpt_estructura() {

    $labels = array( 
        'name' => _x( 'Estructura', 'estructura' ),
        'singular_name' => _x( 'estructura', 'estructura' ),
        'add_new' => _x( 'Agregar nuevo profesional', 'estructura' ),
        'add_new_item' => _x( 'Agregar nuevo profesional', 'estructura' ),
        'edit_item' => _x( 'Editar profesional', 'estructura' ),
        'new_item' => _x( 'Nuevo profesional', 'estructura' ),
        'view_item' => _x( 'ver profesional', 'estructura' ),
        'search_items' => _x( 'Search estructuras', 'estructura' ),
        'not_found' => _x( 'No se encontraron profesionales', 'estructura' ),
        'not_found_in_trash' => _x( 'No estructuras found in Trash', 'estructura' ),
        'parent_item_colon' => _x( 'Parent estructura:', 'estructura' ),
        'menu_name' => _x( 'Personal', 'estructura' ),
            'featured_image'        => __( 'Fotografia', 'estructura' ),
            'set_featured_image'    => __( 'Agregar fotografia', 'estructura' ),
            'remove_featured_image' => _x( 'Eliminar fotografia', 'estructura' ),
            'use_featured_image'    => _x( 'Usar fotografia', 'estructura' ),
    );
    $args = array( 
        'labels' => $labels,
        'hierarchical' => true,
        'supports' => array( 'title', 'editor', 'thumbnail' ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-businessman',
        'show_in_rest' => true,
        'show_in_nav_menus' => false,
        'publicly_queryable' => false, //desactiva el single o page
        'exclude_from_search' => true,
        'has_archive' => false, //desactiva el archivo
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );

    register_post_type( 'estructura', $args );
}

/************************************************
 * Taxonomias.
 ************************************************/
add_action( 'init', 'estructura_build_taxonomies', 0 );
function estructura_build_taxonomies() {
    register_taxonomy( 'directivos', 'estructura', array( 'hierarchical' => true, 'label' => 'Directivos', 'query_var' => true, 'rewrite' => true, 'show_in_rest' => true, 'show_in_nav_menus' => false ));
    register_taxonomy( 'academicos', 'estructura', array( 'hierarchical' => true, 'label' => 'Academicos', 'query_var' => true, 'rewrite' => true, 'show_in_rest' => true, 'show_in_nav_menus' => false ));
    register_taxonomy( 'personal-administrativo', 'estructura', array( 'hierarchical' => true, 'label' => 'Personal Administrativo', 'query_var' => true, 'rewrite' => true, 'show_in_rest' => true, 'show_in_nav_menus' => false ));
    register_taxonomy( 'profesional-apoyo', 'estructura', array( 'hierarchical' => true, 'label' => 'Profesional de apoyo', 'query_var' => true, 'rewrite' => true, 'show_in_rest' => true, 'show_in_nav_menus' => false ));
}
/************************************************
 * Campos personalizados.
 ************************************************/
add_action( 'init', 'estructura_register_meta_fields' );
function estructura_register_meta_fields() {
    register_meta( 'estructura', 'order', 'sanitize_text_field' );

}
add_action('add_meta_boxes', 'estructura_meta_boxes');


function estructura_meta_boxes() {
	add_meta_box( 'estructura-meta-box', __('Información del profesional'), 'estructura_meta_box_callback', 'estructura', 'normal', 'low' );
}
function estructura_meta_box_callback() {
	global $post;
    $items = array(
        'order'=>'Numero de posición en web',
	);
    $post_meta = get_post_custom( $post->ID );
	echo "<div class='detalles'>";
	foreach ($items as $item => $nombre) {
		if(empty($post_meta[$item][0]))
			$var = '';
		else
			$var = $post_meta[$item][0];
		echo '<div>';
		echo '<label>'.$nombre.' </label>';
		echo '<input type="text" name="'.$item. '" placeholder="'.$nombre.'" value="'.$var.'">';
		echo '</div>';
	}
	echo '</div>';
	echo "<style>
	.detalles label {font-weight: bold; }
	.detalles input {width: 100%; background-color: #f1f1f1; font-size: 10px 15px; padding: 10px; margin-bottom: 10px}
	</style>";
}

add_action( 'save_post', 'estructura_save_custom_fields', 10, 2 );
function estructura_save_custom_fields( $post_id, $post ){
	$items = array(
        'order'=>'Numero de posición en web',
	);
    foreach ($items as $item => $nombre) {
		if( isset( $_POST[$item] )) {
			update_post_meta( $post_id, $item, $_POST[$item]);
		}
	}
}

/************************************************
 * Personalización de columnas de tabla de administración.
 ************************************************/
add_filter( 'manage_edit-estructura_columns', 'edit_estructura_columns' ) ;

function edit_estructura_columns( $columns ) {

	$columns = array(
		'cb' => '<input type="checkbox" />',
		'title' => __( 'Title' ),
		'position' => __('Cargo'),
        'category' => __('Categorias'),
        'author' => __( 'Autor' ),
        'order' => __( 'Orden' ),
		'thumbnail' => __('Imagen'),
		'date' => __('Fecha'),
	);

  return $columns;
}
add_action( 'manage_estructura_posts_custom_column', 'my_manage_estructura_columns', 10, 2 );
function my_manage_estructura_columns( $column, $post_id ) {
  global $post;
	switch( $column ) {
        case 'position' :
			$terms = get_the_terms( $post_id , 'directivos' );
				if ( isset($terms) && !empty($terms))
					foreach ($terms as $term) {
					echo '<p style="margin:0px !important">'.$term->name.'</p>';
					}
				else
					echo "";
			break;
		case 'category' :
			$terms = get_the_terms( $post_id , 'personal-administrativo' );
				if ( isset($terms) && !empty($terms))
					foreach ($terms as $term) {
					echo '<p style="margin:0px !important"><a title="Ver todos los estudiantes de la categoria" href="'.get_site_url().'/wp-admin/edit.php?post_type=estructura&personal-administrativo='.$term->slug.'">'.$term->name.'</a></p>';
					}
				else
					echo "";
			break;
        case 'order' :
                $post_meta = get_post_custom( $post->ID );
                $order = $post_meta['order'][0];
                echo $order;
            break;
        case 'thumbnail':
            echo "<div style='width: 100%; display-block; text-align: center'>";
            if ( has_post_thumbnail() ) {
                the_post_thumbnail( array(80, 130) );
            }
            else {
                echo "<span class='dashicons dashicons-format-image'></span>";
            }
            echo "</div>";
            break;
		default :
		break;
	}
}