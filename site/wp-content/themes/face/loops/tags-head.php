<?php 
if (is_home()) {
    $description = get_bloginfo('description');
    $image = get_theme_mod('images-logo');
    $title = get_bloginfo('name');
    $url = get_site_url();
    $permalink = $url;
} else {
    $post_types = array('post', 'event');
    $is_post_or_page = (in_array(get_post_type(), $post_types) || is_page());
    $title = get_the_title();
    $description = get_the_excerpt();
    $description = str_replace( '<p>', '', $description );
    $description = str_replace( '</p>', '', $description );
    if(is_page())
        $image = get_theme_mod('images-logo');
    else
        $image = get_the_post_thumbnail_url();
    $url = esc_url(get_permalink());
    $permalink = ($is_post_or_page) ? $url : get_site_url();
}
?>
<meta name="description" content="<?= $description ?>">
<meta property="og:image" content="<?= $image ?>">
<meta property="og:description" content="<?= $description ?>">
<meta property="og:title" content="<?= $title ?>">
<meta property="og:site_name" content="<?= get_bloginfo() ?>">
<meta property="og:url" content="<?= $permalink ?>">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= $title ?>">
<meta name="twitter:url" content="<?= $url ?>" />
<meta name="twitter:description" content="<?= $description ?>">
<meta name="twitter:image" content="<?= $image ?>">
