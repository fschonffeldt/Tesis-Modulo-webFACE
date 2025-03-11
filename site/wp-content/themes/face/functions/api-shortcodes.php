<?php
function mostrar_anuncios_face() {
    $response = wp_remote_get('http://146.83.194.142:1501/actividadesPublicasFACE');

    if (is_wp_error($response)) {
        return "Error al obtener los anuncios.";
    }

    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body);

    // Verificar si la respuesta es válida y es un array
    if (!is_array($data) || empty($data)) {
        return "No hay anuncios disponibles.";
    }

    $output = '<div id="anuncios-container">';

    foreach ($data as $anuncio) {
        // Verificar si es un objeto válido
        if (!is_object($anuncio)) {
            continue;
        }

        // Adaptar los nombres de las propiedades a los datos reales de la API
        $titulo = isset($anuncio->nom_act) && !empty($anuncio->nom_act) ? esc_html($anuncio->nom_act) : 'Sin título';
        $descripcion = isset($anuncio->descripcion) && !empty($anuncio->descripcion) ? esc_html($anuncio->descripcion) : 'Sin descripción';
        $fecha = isset($anuncio->fecha_creacion) && !empty($anuncio->fecha_creacion) ? esc_html(date("d-m-Y H:i", strtotime($anuncio->fecha_creacion))) : 'No disponible';

        $output .= '<div class="anuncio">';
        $output .= '<h3>' . $titulo . '</h3>';
        $output .= '<p>' . $descripcion . '</p>';
        $output .= '<p><strong>Fecha de creación:</strong> ' . $fecha . '</p>';
        $output .= '</div>';
    }

    $output .= '</div>';

    return $output;
}

// Registrar el shortcode
add_shortcode('mostrar_anuncios', 'mostrar_anuncios_face');
