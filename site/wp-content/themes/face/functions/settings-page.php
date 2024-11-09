<?php
/************************************************
 * Campos personalizados para páginas
************************************************/
add_action('init', 'page_register_meta_fields');
function page_register_meta_fields() {
    register_meta('page', 'sidebar', 'sanitize_text_field');
    register_meta('page', 'subtitle', 'sanitize_textarea_field');
}

/************************************************
 * Agregar metaboxes
 ************************************************/
add_action('add_meta_boxes', 'page_meta_boxes');
function page_meta_boxes() {
    global $post;
    add_meta_box('sidebar-meta-box', __('Seleccionar sidebar'), 'sidebar_meta_box_callback', 'page', 'normal', 'low');
    add_meta_box('subtitle-meta-box', __('Subtítulo de la página'), 'subtitle_meta_box_callback', 'page', 'normal', 'low');
}

function sidebar_meta_box_callback() {
    $post_meta = get_post_custom( $post->ID );
    $current_sidebar = '';
    if( isset( $post_meta['sidebar'])) {
        $current_sidebar = $post_meta['sidebar'][0];
    }
    echo "<div class='detalles'>";
    echo '<div>';
    echo '<label>Sidebar a mostrar en página </label>';
    echo '<select name="sidebar" id="sidebar">';
    $selected = '';
    if('vacio' === $current_sidebar)
        $selected = 'selected';
    echo '<option value="vacio" '.$selected.'>No sidebar</option>';
    $menus = wp_get_nav_menus();
    foreach ($menus as $menu) {
        $selected = '';
        if($menu->name === $current_sidebar)
            $selected = 'selected';
        echo '<option value="'.$menu->name.'" '.$selected.'>'.$menu->name.'</option>';
    }
    echo '</select>';
    echo '</div></div>';
    echo "<style>
    .detalles label {font-weight: bold; }
    .detalles input, .detalles select {width: 100%; background-color: #f1f1f1; font-size: 10px 15px; padding: 10px; margin-bottom: 10px}
    </style>";
}

function subtitle_meta_box_callback($post) {
    $post_meta = get_post_custom($post->ID);
    $subtitle = isset($post_meta['subtitle'][0]) ? $post_meta['subtitle'][0] : '';
    echo "<div class='detalles'>";
    echo '<label for="subtitle">HTML del subtítulo:</label>';
    echo '<textarea name="subtitle" id="subtitle" rows="4" style="width: 100%;">'.esc_textarea($subtitle).'</textarea>';
    echo '</div>';
}

add_action( 'save_post', 'page_save_custom_fields', 10, 2 );
function page_save_custom_fields( $post_id, $post ){
    if( isset( $_POST['sidebar'] ) && $_POST['sidebar'] != "" ) {
        $sidebar = $_POST['sidebar'];
        update_post_meta( $post_id, 'sidebar', $sidebar );
    }
    if (isset($_POST['subtitle']) && $_POST['subtitle'] != "") {
        update_post_meta($post_id, 'subtitle', $_POST['subtitle']);
    }
}
