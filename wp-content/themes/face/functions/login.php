<?php
// Formulario de login personalizado
function formulario_login_personalizado() {
    if (is_user_logged_in()) {
        return '<p>Ya has iniciado sesión.</p>';
    }

    ob_start(); ?>
    <form method="post" action="<?php echo esc_url(site_url('wp-login.php', 'login_post')); ?>">
        <p>
            <label for="user_login">Correo Institucional:</label>
            <input type="text" name="log" id="user_login" required>
        </p>
        <p>
            <label for="user_pass">Contraseña:</label>
            <input type="password" name="pwd" id="user_pass" required>
        </p>
        <p><input type="submit" value="Iniciar sesión"></p>
    </form>
    <?php
    return ob_get_clean();
}
add_shortcode('formulario_login', 'formulario_login_personalizado');
