<?php
/**
 * Template Name: Personal - Academicos
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
                <?php $term_slugs = array('dep-adm-y-aud-conce', 'dep-cie-cyt-inf-chillan','dep-eco-fin-conce','dep-gest-emp-chillan','dep-sist-inf-conce');?>

                <?php $cont= 0;?>
                <?php foreach ($term_slugs as $term_slug):?>
                    <?php $term = get_term_by('slug', $term_slug, 'academicos');
                    if ($term !== false) {
                        echo '<h3 id="titulo-departamento'.$cont.'" class="wp-block-heading">'.$term->name.'</h3>';
                    }
                    ?>
                    <div class="row" id="departamento<?=$cont?>">

                    <?php /*Loop Wordpress para directores/as*/?>
                    <?php $args=array(
                        'post_type' => 'estructura',
                        'posts_per_page' => 100,
                        'order' => 'ASC',
                        'orderby' => 'title',
                        'tax_query' => array(
                            'relation' => 'AND',
                            array(
                                'taxonomy' => 'academicos',
                                'field' => 'slug',
                                'terms' => $term_slug,
                            ),
                            array(
                                'taxonomy' => 'directivos',
                                'field' => 'slug',
                                'terms' => 'departamentos',
                            ),
                        ),
                    );
                    $team = new WP_Query($args);
                    if($team->have_posts()) : while($team->have_posts()) :
                    $team->the_post(); ?>                        
                    
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
                                    <?php
                                    $terms = get_the_terms(get_the_ID(), 'directivos');
                                    $child_term = null;

                                    if ($terms && !is_wp_error($terms)) {
                                        foreach ($terms as $term) {
                                            if ($term->parent != 0) {
                                                $parent_term = get_term($term->parent, 'directivos');
                                                if ($parent_term->slug == 'departamentos') {
                                                    $child_term = $term;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if ($child_term) {
                                        $term_name = $child_term->name;
                                        $words = explode(' ', $term_name);
                                        $trimmed_name = implode(' ', array_slice($words, 0, 3)); // Obtener las primeras tres palabras
                                        echo '<small style="color: #e96626; font-weight: 600;">' . $trimmed_name . '</small>';
                                    }
                                    ?>
                                    <div class="text-start" style="font-size: 0.9rem"><?php the_content()?></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php endwhile; endif; ?>
                    <?php wp_reset_query();?>
                    
                    <?php /*Loop Wordpress para academicos*/?>
                    <?php $args=array(
                        'post_type' => 'estructura',
                        'posts_per_page' => 100,
                        'order' => 'ASC',
                        'orderby' => 'title',
                        'tax_query' => array(
                            'relation' => 'AND', 
                            array(
                                'taxonomy' => 'academicos',
                                'field' => 'slug',
                                'terms' => $term_slug,
                            ),
                            array(
                                'taxonomy' => 'directivos',
                                'field' => 'slug',
                                'terms' => 'departamentos',
                                'operator' => 'NOT IN', //excluye a los directores/as
                            ),
                        ),
                    );
                    $team = new WP_Query($args);
                    if($team->have_posts()) : while($team->have_posts()) :
                    $team->the_post(); ?>                        
                    
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
                                    <?php $term = get_term_by('slug', $term_slug, 'directivos');
                                    if($term_slug) {
                                        echo '<small style="color: #5a718d; font-weight: 600;">'.$term->name.'</small>';
                                    }
                                    ?>
                                    <h4 class="mb-0 text-uppercase " style="color: #0d5ba4"><?php the_title()?></h4>
                                    <div class="text-start" style="font-size: 0.9rem"><?php the_content()?></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <?php endwhile; endif; ?>
                    <?php wp_reset_query();?>
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

        for (let i = 0; i < contenedores.length; i++) {
            let nombre = contenedores[i].getAttribute('data-nombre');
            let enlaceCorreo = contenedores[i].getElementsByTagName('a')[0];
            let correo = enlaceCorreo ? enlaceCorreo.href.replace('mailto:', '') : '';

            if (nombre.toUpperCase().indexOf(filtro) > -1 || (correo && correo.toUpperCase().indexOf(filtro) > -1)) {
                contenedores[i].style.display = "";
                visible = true;
            } else {
                contenedores[i].style.display = "none";
            }
        }
        let titulo = document.getElementById('titulo-' + depto.id);
        titulo.style.display = visible ? "" : "none";
        let hr = document.getElementById('hr-' + depto.id);
        hr.style.display = visible ? "" : "none";
    });
}
</script>

<?php get_footer();?>