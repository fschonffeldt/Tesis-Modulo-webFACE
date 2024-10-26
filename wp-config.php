<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */

define('DB_NAME', 'face');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost:3310');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '2^Nn}c9uP%,P@3*RpbLXlcrNPq&/2LYC$`:+VT3<V2BD+s_ap--|}DBrt={&VG!6');
define('SECURE_AUTH_KEY',  'xut|!G*m|ym<JYRn*VF({]c1$g+IgT<}st-$/>N1PUb~4&Cx1t)FPL/3xc1q=A]A');
define('LOGGED_IN_KEY',    '>>]p7i*MgpxM^_%n])FOE|CwW5^{s@=Ljq),YJ1UOBx12SePPWj_P[kuMnq[N_^n');
define('NONCE_KEY',        '*-cKC}jkZc^c/KgMaq[/%{uJ6b_]HQht*uIvO?N7u11Apy6Wx%4x-A415&[0/]+R');
define('AUTH_SALT',        'E5;eK+RXY|guD`c7a +tDAk.(Hkc,w[c:mSiA(6gh7o$xmiT5:J+4A[M*E]E$?VJ');
define('SECURE_AUTH_SALT', '{pSlxy5zi|&*{hdu?Y!^ZE9H||FbRvdE!ref@HNxOVAttz(avLr[VJ@1Elhi%)/-');
define('LOGGED_IN_SALT',   '*l)U<wgI?iNA[9uCDT[Y*u?#+Nmq&)`LB9-<8111y~1aBjh-yE|mo1|N-rPv-GUc');
define('NONCE_SALT',       'I1l]X>Ur$8)eTKsZyQFSX${Drc5Y[>A|KEm z+gveooMj?B}[KUL$.*JGEHGeO[g');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

// definir nueva url (migración)
 define('WP_HOME', 'http://localhost/site/');
 define('WP_SITEURL', 'http://localhost/site');

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', 'es_CL');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

define('WP_POST_REVISIONS', true);
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
