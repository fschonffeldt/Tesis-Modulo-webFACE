<?php get_header(); ?>

<div class="container">
    <div class="row">
        <!-- Columna principal, donde se muestra el aviso individual -->
        <div class="col-md-8">
            <h1><?php the_title(); ?></h1>

            <?php if (has_post_thumbnail()) : ?>
                <div class="aviso-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="aviso-content">
                <?php the_content(); ?>
            </div>
        </div>

        <!-- Columna lateral, donde se puede buscar y ver otros avisos -->
        <div class="col-md-4">
            <h3>Buscar otros avisos</h3>
            <form method="get" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="hidden" name="post_type" value="avisos" />
                <input type="text" name="s" placeholder="Buscar avisos..." />
                <input type="submit" value="Buscar" />
            </form>

            <h3>Otros avisos</h3>
            <?php
            $args = array(
                'post_type' => 'avisos',
                'posts_per_page' => 5,
                'post__not_in' => array(get_the_ID()) // Excluir el aviso actual
            );
            $otros_avisos = new WP_Query($args);

            if ($otros_avisos->have_posts()) :
                echo '<ul>';
                while ($otros_avisos->have_posts()) : $otros_avisos->the_post();
                    echo '<li><a href="' . get_permalink() . '">' . get_the_title() . '</a></li>';
                endwhile;
                echo '</ul>';
                wp_reset_postdata();
            else:
                echo '<p>No hay otros avisos disponibles.</p>';
            endif;
            ?>
        </div>
    </div>

    <div class="row">
        <!-- Formulario para crear un nuevo aviso -->
        <div class="col-md-12">
            <h2>Crear un nuevo aviso</h2>
            <form method="post">
                <label for="titulo">Título del Aviso:</label>
                <input type="text" name="titulo" required />
                
                <label for="contenido">Descripción del Aviso:</label>
                <textarea name="contenido" required></textarea>
                
                <label for="contacto_email">Correo Electrónico:</label>
                <input type="email" name="contacto_email" required />

                <label for="contacto_telefono">Teléfono:</label>
                <input type="text" name="contacto_telefono" required />
                
                <input type="submit" name="submit_aviso" value="Crear Aviso" />
            </form>
        </div>
    </div>
</div>

<?php get_footer(); ?>
<?php
if (isset($_POST['submit_aviso'])) {
    // Recoger los datos del formulario
    $titulo = sanitize_text_field($_POST['titulo']);
    $contenido = sanitize_textarea_field($_POST['contenido']);
    $email = sanitize_email($_POST['contacto_email']);
    $telefono = sanitize_text_field($_POST['contacto_telefono']);
    
    // Crear un nuevo aviso
    $nuevo_aviso = array(
        'post_title'    => $titulo,
        'post_content'  => $contenido,
        'post_status'   => 'publish',
        'post_type'     => 'avisos'
    );

    // Insertar el aviso
    $post_id = wp_insert_post($nuevo_aviso);

    if ($post_id) {
        // Guardar los campos personalizados (email, teléfono)
        update_post_meta($post_id, 'contacto_email', $email);
        update_post_meta($post_id, 'contacto_telefono', $telefono);
        
        echo '<p>Aviso creado exitosamente.</p>';
    } else {
        echo '<p>Error al crear el aviso.</p>';
    }
 }
