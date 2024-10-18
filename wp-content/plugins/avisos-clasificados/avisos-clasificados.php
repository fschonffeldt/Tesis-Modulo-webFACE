<?php
/*
Plugin Name: Avisos Clasificados
Description: Plugin para gestionar los avisos clasificados.
Version: 1.0
Author: Fernanda Schonffeldt Cisternas
*/
require_once plugin_dir_path(__FILE__) . 'includes/posttypes.php';

register_activation_hook(__FILE__, 'avisos_rewrite_flush');
