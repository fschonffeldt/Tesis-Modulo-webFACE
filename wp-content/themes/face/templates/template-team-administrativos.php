<?php
/**
 * Template Name: Personal - Administrativos
 */
    get_header(); 
?>

<?php $sidebar = get_post_meta( get_the_ID(), "sidebar", true );?>

<?php /*banner page*/?>
<div class="banner-page py-5 px-4">
    <div class="wrapper">
        <h1 class="d-flex justify-content-center text-center text-uppercase mb-0 font-ubb" data-aos="fade-right">
            <?php the_title();?>
        </h1>
    </div>
</div>

<?php /*Breadcrumbs*/?>
<div class="col-12 mb-2 px-4">    
	<div class="wrapper border-bottom">
		<?php if (function_exists('dimox_breadcrumbs')) { ?>
			<?php dimox_breadcrumbs(); ?>
		<?php } ?>
	</div>
</div>

<?php /*Contenido*/?>
<article class="px-4 py-3 py-md-5 pb-4">
    <div class="wrapper row gx-0" style="min-height: 300px">
        <div class="col-md-12 text-justify text-content">
            <section class="team wrapper py-5 pt-md-0 px-4">
                <?php /*Buscador personas*/?>
                <div class="w-100 search mb-5">
                    <label for="input-search" class="form-label"><strong>Búsqueda:</strong></label>
                    <div class="input-group">
                        <input type="text" id="search-team" name="input-search" onkeyup="filtrarContenidos()" class="form-control" placeholder="Buscar por nombre o correo...">
                        <span class="input-group-text">Búsqueda</span>
                    </div>
                </div>

                <?php /*Slugs de categorias*/?>
                <?php $term_slugs = array('secretarias', 'comunicaciones','apoyocomputacion','profesionales-de-apoyo','auxiliares');?>

                <?php $cont= 0;?>
                <?php foreach ($term_slugs as $term_slug):?>
                
                <?php /*Categorias taxonomia*/?>
                <?php 
                $term = get_term_by('slug', $term_slug, 'personal-administrativo');
                if ($term !== false) {
                    echo '<h3 id="titulo-departamento'.$cont.'" class="wp-block-heading">'.$term->name.'</h3>';
                }
                ?>

                <div class="row" id="departamento<?=$cont?>">

                    <?php /*Extrae categorias hijos de taxonomia*/?>
                    <?php $child_terms = get_terms(array(
                        'taxonomy' => 'personal-administrativo',
                        'child_of' => $term->term_id,
                        'hide_empty' => false,
                    ));?>

                    <?php /*Categoria con hijos*/?>
                    <?php
                    if (!empty($child_terms) && !is_wp_error($child_terms)) :
                        foreach ($child_terms as $child_term) : 
                            echo '<div class="h5 wp-block-heading font-ubb text-uppercase" style="padding: 10px 20px; background-color: #e0ecfa;;">'.$child_term->name.'</div>'; // Título del término hijo
                    ?>

                        <?php /*loop wordpress*/?>
                        <?php 
                        $args = array(
                            'post_type' => 'estructura',
                            'posts_per_page' => -1,
                            'meta_key' => 'order',
                            'orderby' => 'meta_value_num', 
                            'order' => 'ASC',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'personal-administrativo',
                                    'field' => 'slug',
                                    'terms' => $child_term->slug,
                                ),
                            ),
                        );
                        $child_team = new WP_Query($args);
                        if ($child_team->have_posts()) : 
                            while ($child_team->have_posts()) : 
                                $child_team->the_post(); 
                        ?>
                        <div class="col-md-6 py-2 px-2 mb-2 contenedor-item" data-nombre="<?php the_title()?>">
                            <div class="item">
                                <div class="row">
                                    <div class="col-4 col-md-3">
                                        <?php if(!has_post_thumbnail()) {
                                            $img = get_template_directory_uri().'/theme/img/avatar.png';
                                        }
                                        else {
                                            $img = get_the_post_thumbnail_url(get_the_ID(),'full');
                                        }?>
                                        <figure class="px-2 py-2 img-fluid" style="background-image:url(<?=$img?>); border: 2px solid #f7f8f9;">
                                        </figure>
                                    </div>
                                    <div class="col-8 col-md-9 py-2 d-flex flex-column justify-content-center">
                                        <h4 class="mb-0 text-uppercase " style="color: #0d5ba4"><?php the_title()?></h4>
                                        <div class="text-start" style="font-size: 0.9rem"><?php the_content()?></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php endwhile; endif; ?>
                        <?php wp_reset_query();?>

                    <?php endforeach; endif; ?>

                    <?php /*Categoria sin hijos*/?>
                    <?php 
                    if (empty($child_terms) || is_wp_error($child_terms)) :?>
                    
                        <?php /*loop wordpress*/?>
                        <?php
                        $args = array(
                            'post_type' => 'estructura',
                            'posts_per_page' => -1,
                            'order' => 'ASC',
                            'orderby' => 'title',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'personal-administrativo',
                                    'field' => 'slug',
                                    'terms' => $term_slug,
                                ),
                            ),
                        );
                        $team = new WP_Query($args);
                        if ($team->have_posts()) : 
                            while ($team->have_posts()) : 
                                $team->the_post(); 
                        ?>
                        <div class="col-md-6 py-2 px-2 mb-2 contenedor-item" data-nombre="<?php the_title()?>">
                            <div class="item">
                                <div class="row">
                                    <div class="col-4 col-md-3">
                                        <?php if(!has_post_thumbnail()) {
                                            $img = get_template_directory_uri().'/theme/img/avatar.png';
                                        }
                                        else {
                                            $img = get_the_post_thumbnail_url(get_the_ID(),'full');
                                        }?>
                                        <figure class="px-2 py-2 img-fluid" style="background-image:url(<?=$img?>); border: 2px solid #f7f8f9;">
                                        </figure>
                                    </div>
                                    <div class="col-8 col-md-9 py-2 d-flex flex-column justify-content-center">
                                        <h4 class="mb-0 text-uppercase " style="color: #0d5ba4"><?php the_title()?></h4>
                                        <div class="text-start" style="font-size: 0.9rem"><?php the_content()?></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php endwhile; endif; ?>
                        <?php wp_reset_query();?>
                    <?php endif; ?>

                </div>
                <hr id="hr-departamento<?=$cont?>">
                <?php $cont++;?>

            <?php endforeach;?>
            </section>
        </div>
    </div>
</article>

<script>
//Funcionalidad para el buscador de personal
function filtrarContenidos() {
    let input = document.getElementById('search-team');
    let filtro = input.value.toUpperCase();
    let departamentos = document.querySelectorAll('[id^="departamento"]');

    departamentos.forEach(depto => {
        let visible = false;
        let contenedores = depto.getElementsByClassName('contenedor-item');
        let subtitulos = depto.querySelectorAll('.h5.wp-block-heading');

        subtitulos.forEach(subtitulo => {
            subtitulo.style.display = "none";
        });

        for (let i = 0; i < contenedores.length; i++) {
            let nombre = contenedores[i].getAttribute('data-nombre');
            let enlaceCorreo = contenedores[i].getElementsByTagName('a')[0];
            let correo = enlaceCorreo ? enlaceCorreo.href.replace('mailto:', '') : '';

            if (nombre.toUpperCase().indexOf(filtro) > -1 || (correo && correo.toUpperCase().indexOf(filtro) > -1)) {
                contenedores[i].style.display = "";
                visible = true;

                let subtitulo = contenedores[i].closest('.row').previousElementSibling;
                if (subtitulo && subtitulo.classList.contains('h5') && subtitulo.classList.contains('wp-block-heading')) {
                    subtitulo.style.display = "";
                }
            } else {
                contenedores[i].style.display = "none";
            }
        }

        let titulo = document.getElementById('titulo-' + depto.id);
        titulo.style.display = visible ? "" : "none";
        let hr = document.getElementById('hr-' + depto.id);
        hr.style.display = visible ? "" : "none";
    });

    if (filtro === "") {
        departamentos.forEach(depto => {
            let contenedores = depto.getElementsByClassName('contenedor-item');
            let subtitulos = depto.querySelectorAll('.h5.wp-block-heading');

            for (let i = 0; i < contenedores.length; i++) {
                contenedores[i].style.display = "";
            }

            subtitulos.forEach(subtitulo => {
                subtitulo.style.display = "";
            });

            let titulo = document.getElementById('titulo-' + depto.id);
            titulo.style.display = "";
            let hr = document.getElementById('hr-' + depto.id);
            hr.style.display = "";
        });
    }
}
</script>

<?php get_footer();?>