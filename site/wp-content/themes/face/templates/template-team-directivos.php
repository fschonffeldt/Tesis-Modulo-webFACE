<?php
/**
 * Template Name: Personal - Directivos
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
        <?php if($sidebar != 'vacio'):?>
            <div class="col-md-3 pb-4">
                <?php wp_nav_menu( array('menu' => $sidebar, 'container_class' => ' fixme', 'items_wrap' => '<ul class="list-group list-group-flush mb-4">%3$s</ul>')); ?>
            </div>
            <div class="col-md-9 text-justify text-content ps-md-5">
                <section class="team wrapper py-5 pt-md-0 px-4">
                    <div class="row">
                        <?php /*Buscador personas*/?>
                        <div class="col-12 mb-5 search">
                            <label for="input-search" class="form-label"><strong>Búsqueda:</strong></label>
                            <div class="input-group">
                                <input type="text" id="search-team" name="input-search" onkeyup="filtrarContenidos()" class="form-control" placeholder="Buscar por nombre o correo...">
                                <span class="input-group-text">Búsqueda</span>
                            </div>
                        </div>

                        <?php /*Slugs de categorias*/?>
                        <?php $term_slugs = array(
                            'decano', 
                            'sec-academico',
                            'dir-dpto',
                            'director-de-departamento-de-administracion-y-auditoria-campus-concepcion',
                            'director-de-departamento-de-economia-y-finanzas-campus-concepcion',
                            'director-de-departamento-de-sistemas-de-informacion-campus-concepcion',
                            'director-de-departamento-de-gestion-empresarial-campus-chillan',
                            'director-de-departamento-de-ciencias-de-la-computacion-y-tecnologias-de-informacion-campus-chillan',
                            'director-escuela-de-ingenieria-comercial-chillan',
                            'jefe-de-carrera-de-ingenieria-comercial-concepcion',
                            
                            'director-escuela-de-contador-publico-y-auditor-chillan',
                            'jefe-de-carrera-de-contador-publico-y-auditor-concepcion',
                            'director-escuela-de-ingenieria-civil-en-informatica-concepcion',
                            'jefe-de-carrera-de-ingenieria-civil-en-informatica-chillan',
                            'director-escuela-de-ingenieria-de-ejecucion-en-computacion-e-informatica-concepcion',
                            
                            'director-doctorado-en-economia-y-gestion-de-la-informacion',
                            'subdirector-doctorado-en-economia-y-gestion-de-la-informacion',
                            'director-magister-en-ciencias-de-la-computacion-chillan',
                            'director-magister-en-ciencias-de-la-computacion-concepcion',
                            'director-magister-en-gestion-de-empresas-chillan',
                            'director-magister-en-gestion-de-empresas-concepcion',
                            'director-magister-en-economia-aplicada',
                            );?>


                        <?php foreach ($term_slugs as $term_slug):?>

                            <?php /*Loop Wordpress*/?>
                            <?php $args=array(
                                'post_type' => 'estructura',
                                'posts_per_page' => 100,
                                'order' => 'ASC',
                                'orderby' => 'title',
                                'tax_query' => array(
                                    array(
                                        'taxonomy' => 'directivos',
                                        'field' => 'slug',
                                        'terms' => $term_slug,
                                    ),
                                ),
                            );
                            $team = new WP_Query($args);
                            if($team->have_posts()) : while($team->have_posts()) :
                            $team->the_post(); ?>

                            <div class="col-md-12 py-2 px-2 mb-2 contenedor-item" data-nombre="<?php the_title()?>">
                                <div class="item">
                                    <div class="row">
                                        <div class="col-4 col-md-2">
                                            <?php if(!has_post_thumbnail()) {
                                                $img = get_template_directory_uri().'/theme/img/avatar.png';
                                            }
                                            else {
                                                $img = get_the_post_thumbnail_url(get_the_ID(),'full');
                                            }?>
                                            <figure class="px-2 py-2 img-fluid" style="background-image:url(<?=$img?>); border: 2px solid #f7f8f9;">
                                            </figure>
                                        </div>
                                        <div class="col-8 col-md-10 py-2 d-flex flex-column justify-content-center">
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
                        
                        <?php endforeach;?>
                    </div>
                </section>
            </div>
        <?php endif;?>
    </div>
</article>

<script>
//Funcionalidad para el buscador de personal
function filtrarContenidos() {
    let input = document.getElementById('search-team');
    let filtro = input.value.toUpperCase();
    let contenedores = document.getElementsByClassName('contenedor-item');

    for (let i = 0; i < contenedores.length; i++) {
        let nombre = contenedores[i].getAttribute('data-nombre');
        let enlaceCorreo = contenedores[i].getElementsByTagName('a')[0];
        let correo = enlaceCorreo ? enlaceCorreo.href.replace('mailto:', '') : '';

        if (nombre.toUpperCase().indexOf(filtro) > -1 || (correo && correo.toUpperCase().indexOf(filtro) > -1)) {
            contenedores[i].style.display = "";
        } else {
            contenedores[i].style.display = "none";
        }
    }
}
</script>

<?php get_footer();?>