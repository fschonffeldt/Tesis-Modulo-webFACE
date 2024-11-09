<?php 
/************************************************
 * Entrada personalizada eventos.
 ************************************************/
add_action( 'init', 'register_cpt_eventos' );
function register_cpt_eventos() {
    $labels = array( 
        'name' => _x( 'Eventos', 'event' ),
        'singular_name' => _x( 'Evento', 'event' ),
        'add_new' => _x( 'Agregar nuevo evento', 'event' ),
        'add_new_item' => _x( 'Agregar nuevo evento', 'event' ),
        'edit_item' => _x( 'Editar evento', 'event' ),
        'new_item' => _x( 'Nuevo evento', 'event' ),
        'view_item' => _x( 'ver eventos', 'event' ),
        'search_items' => _x( 'buscar eventos', 'event' ),
        'not_found' => _x( 'No se encontraron eventos', 'event' ),
        'not_found_in_trash' => _x( 'No talleres found in Trash', 'event' ),
        'parent_item_colon' => _x( 'Parent eventos:', 'event' ),
        'menu_name' => _x( 'Eventos', 'event' ),
    );
    $args = array( 
        'labels' => $labels,
        'hierarchical' => true,
        'supports' => array( 'title','expiration','time','place','category'),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 6,
        'menu_icon' => 'dashicons-groups',
        'show_in_nav_menus' => false,
		'show_in_rest' => true,
        'publicly_queryable' => false, //desactiva el single o page
        'exclude_from_search' => true,
        'has_archive' => false, //desactiva el archivo
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );
    register_post_type( 'event', $args );
}
/************************************************
 * Taxonomias.
 ************************************************/
add_action( 'init', 'event_build_taxonomies', 0 );
function event_build_taxonomies() {
	register_taxonomy( 'category-event', 'event', array( 'hierarchical' => true, 'label' => 'Tipo de evento', 'query_var' => true, 'rewrite' => true, 'show_in_rest' => true, 'show_in_nav_menus' => false, ));
}
/************************************************
 * Campos personalizados para eventos.
 ************************************************/
add_action( 'init', 'eventos_register_meta_fields' );
function eventos_register_meta_fields() {
	register_meta( 'event', 'expiration', 'sanitize_text_field' );
	register_meta( 'event', 'time', 'sanitize_text_field' );
	register_meta( 'event', 'place', 'sanitize_text_field' );
}
add_action('add_meta_boxes', 'eventos_meta_boxes');
function eventos_meta_boxes() {
    add_meta_box( 'expiration-meta-box', __('Detalles del evento'), 'expiration_meta_box_callback', 'event', 'normal', 'low' );
}
function expiration_meta_box_callback() {

    global $post;

    $post_meta = get_post_custom( $post->ID );

    $current_date = !empty($post_meta['expiration'][0]) ? $post_meta['expiration'][0] : '';
    $current_time = !empty($post_meta['time'][0]) ? $post_meta['time'][0] : '';
    $current_place = !empty($post_meta['place'][0]) ? $post_meta['place'][0] : '';

    echo "<ul class='informacion'>";
    echo '<li>Fecha de evento (dd-mm-aaaa): </li>';
    echo '<li><input type="date" name="expiration" value="' . esc_attr( $current_date ) . '" required="required"></li>';
    echo '<li>Hora de evento: </li>';
    echo '<li><input type="time" name="time" value="' . esc_attr( $current_time ) . '" required="required"></li>';
    echo '<li>Lugar del evento: </li>';
    echo '<li><input type="text" style="width: 100%;" name="place" value="' . esc_attr( $current_place ) . '" required="required"></li>';
	echo "</ul>";
	echo "<style>.informacion input {width: 100%; padding: 10px}</style>";
}
add_action( 'save_post', 'event_save_custom_fields', 10, 2 );
function event_save_custom_fields( $post_id, $post ){
    if( isset( $_POST['expiration'] ) && $_POST['expiration'] != "" ) {
      if ( $tmp = date_create($_POST['expiration']) ) {
        $date = date_format($tmp,'Y-m-d');
		update_post_meta( $post_id, 'expiration', $date );
      }
    }
    if( isset( $_POST['time'] ) && $_POST['time'] != "" ) {
		$time = $_POST['time'];
		update_post_meta( $post_id, 'time', $time );
    }
    if( isset( $_POST['place'] ) && $_POST['place'] != "" ) {
		$place = $_POST['place'];
		update_post_meta( $post_id, 'place', $place );
    }
}
/************************************************
 * Agrega la columna a la entrada personalizada event.
 ************************************************/
add_filter( 'manage_edit-event_columns', 'edit_event_columns' ) ;

function edit_event_columns( $columns ) {

	$columns = array(
		'cb' => '<input type="checkbox" />',
		'title' => __( 'Title' ),
		'expiration' => __( 'Fecha evento' ),
		'place' => __( 'Lugar evento' ),
		'author' => __( 'Autor' ),
		'date' => __( 'Fecha' ),
	);

  return $columns;
}

add_action( 'manage_event_posts_custom_column', 'my_manage_movie_columns', 10, 2 );
function my_manage_movie_columns( $column, $post_id ) {
  	global $post;
  	switch( $column ) {
    
    case 'expiration' :
		$current_date = get_post_meta( $post_id, 'expiration', true );
		if ( empty( $current_date ) )
			echo __( 'sin Fecha' );
		else {
			$date_now = date('Y-m-d 00:00:00');
			$diferencia = strtotime($current_date) - strtotime($date_now);
			$tmp = date_create( $current_date );
			$date = date_format($tmp,'d-m-Y');
			echo "<span style='color:#fff;background-color: #27ae60; border-radius: 5px; padding: 3px 10px;'>".$date."</span> ";
			$current_time = get_post_meta( $post_id, 'time', true );
			if ( empty( $current_time ) ) {
				echo "<span style='color:#fff;background-color: #e74c3c; border-radius: 5px; padding: 3px 10px;';>Sin hora</span>";
			}
			else {
				echo "<span style='color:#fff;background-color: #f39c12; border-radius: 5px; padding: 3px 10px;';>".$current_time."</span>";
			}
			break;
			}
		break;		
    case 'place' :
		$current_place = get_post_meta( $post_id, 'place', true );
		if ( empty( $current_place ) )
			echo "<span style='color:#fff;background-color: #e74c3c; border-radius: 5px; padding: 3px 10px;';>Sin Lugar</span>";
		else {
			echo "<span style='color:#fff;background-color: #2c3e50; border-radius: 5px; padding: 3px 10px;';>".$current_place."</span>";
		}
		break;
    default :
      	break;
  }
}
/************************************************
 * Ordena por fecha de evento en el panel event.
 ************************************************/
add_filter( 'manage_edit-event_sortable_columns', 'set_custom_event_sortable_columns' );

function set_custom_event_sortable_columns( $columns ) {
	$columns['expiration'] = 'expiration';

	return $columns;
}
add_action( 'pre_get_posts', 'event_custom_orderby' );

function event_custom_orderby( $query ) {
	if ( ! is_admin() )
		return;
	$orderby = $query->get( 'orderby');
	if ( 'expiration' == $orderby ) {
		$query->set( 'meta_key', 'expiration' );
		$query->set( 'orderby', 'expiration' );
	}
}

/************************************************
 * Ordena tabla administración event.
 ************************************************/
function event_post_types_admin_order( $wp_query ) {
	if (is_admin()) {
		// Get the post type from the query
		$post_type = $wp_query->query['post_type'];
		if ( $post_type == 'event') {
			$wp_query->set('orderby', 'expiration');
			$wp_query->set('order', 'ASC');
	}
}
}
add_filter('pre_get_posts', 'event_post_types_admin_order');
