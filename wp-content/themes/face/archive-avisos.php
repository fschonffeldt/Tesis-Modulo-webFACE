<?php
get_header(); // Cargar el header del tema
?>

<div class="container">
    <h1>Avisos Clasificados</h1>

    <?php if (have_posts()) : ?>
        <div class="avisos-listado">
            <?php while (have_posts()) : the_post(); ?>
                <div class="aviso">
                    <!-- Mostrar la imagen destacada del aviso -->
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail(); ?>
                        </a>
                    <?php endif; ?>

                    <!-- Mostrar el título del aviso con un enlace -->
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

                    <!-- Mostrar el extracto del aviso -->
                    <p><?php the_excerpt(); ?></p>
                </div>
            <?php endwhile; ?>
        </div>

        <!-- Paginación si hay muchos avisos -->
        <div class="pagination">
            <?php echo paginate_links(); ?>
        </div>
    <?php else : ?>
        <p>No hay avisos disponibles en este momento.</p>
    <?php endif; ?>
</div>

<?php
get_footer(); // Cargar el footer del tema
