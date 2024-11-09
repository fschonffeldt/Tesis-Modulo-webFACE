<?php 
/************************************************
* Cambia el nombre de entradas a Videos.
************************************************/
add_action( 'init', 'cp_change_post_object' );
function cp_change_post_object() {
    $get_post_type = get_post_type_object('post');
    $labels = $get_post_type->labels;
        $labels->name = 'Noticias';
        $labels->singular_name = 'Noticia';
        $labels->add_new = 'Agregar Noticia';
        $labels->add_new_item = 'Agregar Noticia';
        $labels->edit_item = 'Editar Noticia';
        $labels->new_item = 'Noticia';
        $labels->view_item = 'Ver Noticia';
        $labels->search_items = 'Buscar Noticias';
        $labels->not_found = 'No se encontraron Noticias';
        $labels->not_found_in_trash = 'No se encontraron Noticias en la papelera';
        $labels->all_items = 'Todas los Noticias';
        $labels->menu_name = 'Noticias';
        $labels->name_admin_bar = 'Noticias';
}

/************************************************
 * Personalización de columnas de tabla de administración.
 ************************************************/
add_filter( 'manage_edit-post_columns', 'edit_post_columns' ) ;

function edit_post_columns( $columns ) {

	$columns = array(
		'cb' => '<input type="checkbox" />',
		'title' => __( 'Title' ),
		'categories' => __( 'Categorias' ),
		'author' => __( 'Autor/a' ),
		'thumbnail' => __('Imagen'),
		'date' => __('Fecha'),
	);

  return $columns;
}
add_action( 'manage_post_posts_custom_column', 'my_manage_post_columns', 10, 2 );
function my_manage_post_columns( $column, $post_id ) {
  global $post;
	switch( $column ) {
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