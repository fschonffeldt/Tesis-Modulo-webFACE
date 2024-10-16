<?php 
/************************************************
 * Entrada personalizada.
 ************************************************/
add_action( 'init', 'register_cpt_student' );
function register_cpt_student() {

    $labels = array( 
        'name' => _x( 'Estudiantes', 'student' ),
        'singular_name' => _x( 'Estudiante', 'student' ),
        'add_new' => _x( 'Agregar nuevo estudiante', 'student' ),
        'add_new_item' => _x( 'Agregar nuevo estudiante', 'student' ),
        'edit_item' => _x( 'Editar estudiante', 'student' ),
        'new_item' => _x( 'Nuevo estudiante', 'student' ),
        'view_item' => _x( 'ver estudiante', 'student' ),
        'search_items' => _x( 'Buscar estudiantes', 'student' ),
        'not_found' => _x( 'No se encontraron profesionales', 'student' ),
        'not_found_in_trash' => _x( 'No se encontraron estudiantes en la papelera', 'student' ),
        'parent_item_colon' => _x( 'Parent student:', 'student' ),
        'menu_name' => _x( 'Estudiantes', 'student' ),
            'featured_image'        => __( 'Fotografia', 'student' ),
            'set_featured_image'    => __( 'Agregar fotografia', 'student' ),
            'remove_featured_image' => _x( 'Eliminar fotografia', 'student' ),
            'use_featured_image'    => _x( 'Usar fotografia', 'student' ),
    );
    $args = array( 
        'labels' => $labels,
        'hierarchical' => true,
        'supports' => array( 'title', 'editor', 'thumbnail' ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-welcome-learn-more',
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

    register_post_type( 'student', $args );
}

/************************************************
 * Taxonomias.
 ************************************************/
add_action( 'init', 'student_build_taxonomies', 0 );
function student_build_taxonomies() {
	register_taxonomy( 'Categoria', 'student', array( 'hierarchical' => true, 'label' => 'Categoria', 'query_var' => true, 'rewrite' => true, 'show_in_rest' => true, 'show_in_nav_menus' => false ));
}
/************************************************
 * Campos personalizados.
 ************************************************/
add_action( 'init', 'student_register_meta_fields' );
function student_register_meta_fields() {
    register_meta( 'student', 'universidad', 'sanitize_text_field' );
    register_meta( 'student', 'carrera', 'sanitize_text_field' );
    register_meta( 'student', 'sede', 'sanitize_text_field' );
    register_meta( 'student', 'tipo', 'sanitize_text_field' );
    
}
add_action('add_meta_boxes', 'student_meta_boxes');
function student_meta_boxes() {
	add_meta_box( 'student-meta-box', __('Información del estudiante'), 'student_meta_box_callback', 'student', 'normal', 'low' );
}
function student_meta_box_callback() {
	global $post;
    $items = array(
        'universidad' => 'Universidad',
        'carrera' => 'Carrera',
        'sede'=>'Sede',
        'tipo'=>'Tipo Movilidad',
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

add_action( 'save_post', 'student_save_custom_fields', 10, 2 );
function student_save_custom_fields( $post_id, $post ){
    $items = array(
        'universidad' => 'Universidad',
        'carrera' => 'Carrera',
        'sede'=>'Sede',
        'tipo'=>'Tipo Movilidad',
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
add_filter( 'manage_edit-student_columns', 'edit_student_columns' ) ;

function edit_student_columns( $columns ) {

	$columns = array(
		'cb' => '<input type="checkbox" />',
		'title' => __( 'Title' ),
		'category' => __( 'Categoría' ),
		'author' => __( 'Autor' ),
		'thumbnail' => __('Fotografía'),
	);

  return $columns;
}
add_action( 'manage_student_posts_custom_column', 'my_manage_student_columns', 10, 2 );
function my_manage_student_columns( $column, $post_id ) {
  global $post;
	switch( $column ) {
		case 'category' :
			$terms = get_the_terms( $post_id , 'Categoria' );
				if ( isset($terms) && !empty($terms))
					foreach ($terms as $term) {
					echo '<p style="margin:0px !important"><a title="Ver todos los estudiantes de la categoria" href="'.get_site_url().'/wp-admin/edit.php?post_type=student&Categoria='.$term->slug.'">'.$term->name.'</a></p>';
					}
				else
					echo "<span style='color: #fff; border-radius: 5px; padding: 3px 10px; background-color: #e74c3c';>No registrado</span>";
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