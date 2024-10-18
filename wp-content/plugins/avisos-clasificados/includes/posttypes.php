<?php
if(! defined('ABSPATH')) exit;
function avisos_post_type() {
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
add_action('init', 'avisos_post_type');

function avisos_rewrite_flush(){
    avisos_post_type();
    flush_rewrite_rules();
}