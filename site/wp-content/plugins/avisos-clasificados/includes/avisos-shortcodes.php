<?php
// Archivo: includes/avisos-shortcodes.php

function mostrar_avisos_clasificados() {
    $args = array(
        'post_type' => 'avisos',
        'posts_per_page' => 10,
    );
    $query = new WP_Query($args);
    
    if ($query->have_posts()) {
        $output = '<div class="avisos-clasificados-container">';
        while ($query->have_posts()) {
            $query->the_post();
            $titulo = get_the_title();
            $contenido = wp_trim_words(get_the_content(), 10, '[...]'); 
            $link = get_permalink(); // Enlace al aviso completo
            
            
            $output .= '<div class="aviso-clasificado">';
            $output .= '<h3>' . $titulo . '</h3>';
            $output .= '<p class="aviso-contenido">' . $contenido . '</p>';
            $output .= '<a href="' . $link . '" class="aviso-ver-mas">Ver más</a>';
            $output .= '</div>';
        }
        $output .= '</div>';
        wp_reset_postdata();
    } else {
        $output = 'No hay avisos clasificados disponibles.';
    }
    
    return $output;
}

add_shortcode('avisos', 'mostrar_avisos_clasificados');
