<?php
// Función para mostrar los avisos clasificados usando un shortcode
function mostrar_avisos_clasificados() {
    $args = array(
        'post_type' => 'avisos',
        'posts_per_page' => 10,
        'post_status' => 'publish',
    );

    $query = new WP_Query($args);
    ob_start();

    if ($query->have_posts()) {
        echo '<div class="avisos-clasificados">';
        while ($query->have_posts()) {
            $query->the_post();
            ?>
            <div class="aviso">
                <!-- Mostrar la imagen destacada -->
                <?php if (has_post_thumbnail()) : ?>
                    <div class="aviso-imagen">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail(); ?>
                        </a>
                    </div>
                <?php endif; ?>

                <!-- Título del aviso -->
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

                <!-- Extracto del aviso -->
                <p><?php the_excerpt(); ?></p>

                <!-- Enlace para leer más -->
                <a href="<?php the_permalink(); ?>">Leer más</a>
            </div>
            <hr>
            <?php
        }
        echo '</div>';
    } else {
        echo '<p>No hay avisos disponibles en este momento.</p>';
    }

    wp_reset_postdata();
    return ob_get_clean();
}

// Registrar el shortcode
add_shortcode('avisos_clasificados', 'mostrar_avisos_clasificados');
