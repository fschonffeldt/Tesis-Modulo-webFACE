<?php
// Evitar acceso directo
if (!defined('ABSPATH')) exit;

// Cargar el archivo de WordPress para acceder a sus funciones
define('WP_USE_THEMES', false);
require($_SERVER['DOCUMENT_ROOT'] . '/site/wp-blog-header.php'); // Asegúrate de que esta ruta sea correcta para tu instalación

// Comprobar si el usuario ya está autenticado
if (is_user_logged_in()) {
    // Redirigir al listado de avisos si el usuario ya ha iniciado sesión
    wp_redirect(home_url('/avisos2')); // Cambia '/avisos2' a la URL de la página de listado de avisos
    exit;
}

// Procesar el formulario de login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $creds = array(
        'user_login'    => $_POST['username'],
        'user_password' => $_POST['password'],
        'remember'      => true
    );

    $user = wp_signon($creds, false);

    if (is_wp_error($user)) {
        $error_message = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
    } else {
        // Redirigir al aviso que estaba intentando ver, o al listado de avisos
        $redirect_to = !empty($_GET['redirect_to']) ? esc_url($_GET['redirect_to']) : home_url('/avisos2');
        wp_redirect($redirect_to);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="<?php echo plugins_url('assets/style.css', __FILE__); ?>"> <!-- Enlace al CSS personalizado del plugin -->
</head>
<body>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <?php if (!empty($error_message)) : ?>
            <p class="error-message"><?php echo esc_html($error_message); ?></p>
        <?php endif; ?>
        <form action="" method="POST">
            <label for="username">Correo Institucional</label>
            <input type="text" name="username" id="username" required>
            <label for="password">Contraseña</label>
            <input type="password" name="password" id="password" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
</body>
</html>
