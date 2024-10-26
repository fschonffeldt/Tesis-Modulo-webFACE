<?php
/*
Plugin Name: Avisos Clasificados
Description: Plugin para gestionar los avisos clasificados.
Version: 1.0
Author: Fernanda Schonffeldt Cisternas
*/
require_once plugin_dir_path(__FILE__) . 'includes/posttypes.php';
require_once plugin_dir_path(__FILE__) . 'includes/avisos-shortcodes.php';

register_activation_hook(__FILE__, 'avisos_rewrite_flush');


// Encolar estilos desde la carpeta css en assets
function encolar_estilos_avisos_clasificados() {
    wp_enqueue_style('estilos-avisos', plugin_dir_url(__FILE__) . 'assets/css/styles.css');
}

// Asegurarse de usar 'wp_enqueue_scripts' correctamente
add_action('wp_enqueue_scripts', 'encolar_estilos_avisos_clasificados');