<?php
get_header(); // Cargar el header del tema

// Verificar si hay contenido para mostrar
if (have_posts()) :
    while (have_posts()) : the_post(); ?>
        <div class="aviso-completo">
            <!-- Título del aviso -->
            <h1><?php the_title(); ?></h1>

            <!-- Mostrar la imagen destacada, si existe -->
            <?php if (has_post_thumbnail()) : ?>
                <div class="aviso-imagen">
                    <?php the_post_thumbnail(); ?>
                </div>
            <?php endif; ?>

            <!-- Mostrar el contenido completo del aviso -->
            <div class="contenido-aviso">
                <?php the_content(); ?>
            </div>

            <!-- Mostrar la información de contacto del autor del aviso -->
            <div class="contacto-aviso">
                <h3>Información de Contacto</h3>
                <?php
                // Obtener la información de contacto desde un campo personalizado (meta field)
                $contacto = get_post_meta(get_the_ID(), 'informacion_contacto', true);
                if ($contacto) {
                    echo '<p>' . esc_html($contacto) . '</p>';
                } else {
                    echo '<p>No hay información de contacto disponible.</p>';
                }
                ?>
            </div>
        </div>
    <?php endwhile;
else :
    echo '<p>No se encontró el aviso solicitado.</p>';
endif;

get_footer(); // Cargar el footer del tema
