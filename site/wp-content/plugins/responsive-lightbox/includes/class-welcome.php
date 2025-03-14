<?php
// exit if accessed directly
if ( ! defined( 'ABSPATH' ) )
	exit;

new Responsive_Lightbox_Welcome_Page();

/**
 * Responsive_Lightbox_Welcome_Page class.
 *
 * @class Responsive_Lightbox_Welcome_Page
 */
class Responsive_Lightbox_Welcome_Page {

	/**
	 * Class constructor.
	 *
	 * @return void
	 */
	public function __construct() {
		// actions
		add_action( 'admin_menu', [ $this, 'admin_menus' ] );
		add_action( 'admin_head', [ $this, 'admin_head' ] );
		add_action( 'admin_init', [ $this, 'welcome' ] );
	}

	/**
	 * Add admin menus/screens.
	 *
	 * @return void
	 */
	public function admin_menus() {
		$welcome_page_title = __( 'Welcome to Responsive Lightbox & Gallery', 'responsive-lightbox' );

		// about
		$about = add_dashboard_page( $welcome_page_title, $welcome_page_title, 'manage_options', 'responsive-lightbox-about', [ $this, 'about_screen' ] );
	}

	/**
	 * Add styles just for this page, and remove dashboard page links.
	 *
	 * @return void
	 */
	public function admin_head() {
		remove_submenu_page( 'index.php', 'responsive-lightbox-about' );
	}

	/**
	 * Intro text/links shown on all about pages.
	 *
	 * @return void
	 */
	private function intro() {
		// get plugin version
		$plugin_version = substr( get_option( 'responsive_lightbox_version' ), 0, 3 );
		?>
		<h2 style="text-align: left; font-size: 29px; padding-bottom: 0;"><?php esc_html_e( 'Welcome to', 'responsive-lightbox' ); ?></h2>
		<h1 style="margin-top: 0;"><?php printf( esc_html__( 'Responsive Lightbox & Gallery %s', 'responsive-lightbox' ), $plugin_version ); ?></h1>

		<div class="about-text">
			<?php esc_html__( 'Thank you for choosing Responsive Lightbox & Gallery - the most popular lightbox plugin and a powerful gallery builder for WordPress.', 'responsive-lightbox' ); ?>
		</div>

		<div class="rl-badge" style="position: absolute; top: 0; right: 0; box-shadow: 0 1px 3px rgba(0,0,0,.1); max-width: 180px;"><img src="<?php echo esc_url( RESPONSIVE_LIGHTBOX_URL . '/images/logo-rl.png' ); ?>" width="180" height="180" /></div>

		<div class="changelog">
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=responsive-lightbox-tour' ) ); ?>" class="button button-primary button-hero"><?php esc_html_e( 'Start Tour', 'responsive-lightbox' ); ?></a>
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=responsive-lightbox-settings' ) ); ?>" class="button button-hero"><?php esc_html_e( 'Settings', 'responsive-lightbox' ); ?></a>
			<a href="http://www.dfactory.co/products/responsive-lightbox-gallery-extensions/?utm_source=responsive-lightbox-welcome&utm_medium=button&utm_campaign=dfactory-plugins" class="button button-hero" target="_blank"><?php esc_html_e( 'Addons', 'responsive-lightbox' ); ?></a>
		</div>

		<hr />
		<?php
	}

	/**
	 * Ootput the about screen.
	 *
	 * @return void
	 */
	public function about_screen() {
		?>
		<div class="wrap about-wrap full-width-layout">

			<?php $this->intro(); ?>

			<div class="feature-section">
				<h2><?php esc_html_e( 'Advanced Gallery Builder', 'responsive-lightbox' ); ?></h2>
				<p><?php esc_html_e( 'Responsive Lightbox & Gallery comes with a powerful gallery builder right out of the box that lets you manage galleries the same way you manage posts and pages on your WordPress website. You can add images to your gallery, adjust its settings and lightbox scripts, and configure its display options.', 'responsive-lightbox' ); ?></p>
				<img src="<?php echo esc_url( RESPONSIVE_LIGHTBOX_URL . '/images/welcome.png' ); ?>" />
			</div>

			<div class="feature-section">
				<h2><?php esc_html_e( 'Multiple Lightbox Effects', 'responsive-lightbox' ); ?></h2>
				<p><?php esc_html_e( "Responsive Lightbox & Gallery gives you the control to beautify your images, videos, and galleries using lightbox scripts that look great on all devices. We've got everything from lightweight, functional lightboxes to heavy-customizable, fancy ones.", 'responsive-lightbox' ); ?></p>
			</div>

			<div class="feature-section">
				<h2><?php esc_html_e( 'Easy Setup', 'responsive-lightbox' ); ?></h2>
				<p><?php esc_html_e( 'A lot goes into making a good first impression - especially when your site is doing all the talking. Responsive Lightbox & Gallery automatically adds lightbox effects to all of your image galleries, image links, and video links so you can sit back and relax while we make sure your website looks its best.', 'responsive-lightbox' ); ?></p>
			</div>

			<div class="feature-section">
				<h2><?php esc_html_e( 'Powerful Addons', 'responsive-lightbox' ); ?></h2>
				<p><?php printf( __( 'Responsive Lightbox & Gallery enhances your site by making its images and galleries look visually appealing to your site users. And when you want to kick things up a notch you can pair the free, core plugin with %sone of 10%s one of 13 %spremium extensions.%s', 'responsive-lightbox' ), '<del>', '</del>', '<a href="http://www.dfactory.co/products/responsive-lightbox-gallery-extensions/?utm_source=responsive-lightbox-welcome&utm_medium=link&utm_campaign=dfactory-plugins" target="_blank">', '</a>' ); ?></p>
			</div>

			<hr />

			<div class="return-to-dashboard">
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=responsive-lightbox-settings' ) ); ?>"><?php esc_html_e( 'Go to Settings', 'responsive-lightbox' ); ?></a>
			</div>

		</div>
		<?php
	}

	/**
	 * Send user to the welcome page on first activation.
	 *
	 * @return void
	 */
	public function welcome() {
		// bail if no activation redirect transient is set
		if ( ! get_transient( 'rl_activation_redirect' ) )
			return;

		// delete the redirect transient
		delete_transient( 'rl_activation_redirect' );

		// bail if activating from network, or bulk, or within an iFrame
		if ( is_network_admin() || isset( $_GET['activate-multi'] ) || defined( 'IFRAME_REQUEST' ) )
			return;

		// get action
		$action = isset( $_GET['action'] ) ? sanitize_key( $_GET['action'] ) : '';

		// get plugin
		$plugin = isset( $_GET['plugin'] ) ? sanitize_file_name( $_GET['plugin'] ) : '';

		if ( $action === 'upgrade-plugin' && strstr( $plugin, 'responsive-lightbox.php' ) )
			return;

		wp_safe_redirect( admin_url( 'index.php?page=responsive-lightbox-about' ) );
		exit;
	}
}
