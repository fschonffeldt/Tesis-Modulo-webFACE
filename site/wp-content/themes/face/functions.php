<?php
/*
 * All the functions are in the PHP files in the `functions/` folder.
 */

if ( ! defined('ABSPATH') ) {
  exit;
}
require get_template_directory() . '/functions/cleanup.php';
require get_template_directory() . '/functions/setup.php';
require get_template_directory() . '/functions/enqueues.php';
require get_template_directory() . '/functions/action-hooks.php';
require get_template_directory() . '/functions/navbar.php';
require get_template_directory() . '/functions/dimox-breadcrumbs.php';
require get_template_directory() . '/functions/widgets.php';
require get_template_directory() . '/functions/search-widget.php';
require get_template_directory() . '/functions/index-pagination.php';
require get_template_directory() . '/functions/split-post-pagination.php';

//Personalización de plantilla
require get_template_directory() . '/functions/customizer.php';

//Entradas personalizadas
require get_template_directory() . '/functions/custom-type-post.php';
require get_template_directory() . '/functions/custom-type-event.php';
require get_template_directory() . '/functions/custom-type-team.php';
require get_template_directory() . '/functions/custom-type-video.php';
require get_template_directory() . '/functions/custom-type-student.php';

//Ajustes de página
require get_template_directory() . '/functions/settings-page.php';

//login

//require get_template_directory() . '/functions/login.php';
