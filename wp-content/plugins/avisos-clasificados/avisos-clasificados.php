<?php
/*
Plugin Name: Avisos Clasificados
Description: Plugin para gestionar los avisos clasificados.
Version: 1.0
Author: Fernanda Schonffeldt Cisternas
*/
function crear_custom_post_type_avisos() {
    $labels = array(
        'name' => 'Avisos Clasificados',
        'singular_name' => 'Aviso Clasificado',
        'menu_name' => 'Avisos Clasificados',
        'name_admin_bar' => 'Aviso Clasificado',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'rewrite' => array('slug' => 'avisos'),
    );

    register_post_type('avisos', $args);
}
add_action('init', 'crear_custom_post_type_avisos');

modificacion;
