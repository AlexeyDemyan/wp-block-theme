<?php
pageBanner(array(
    'title' => 'Welcome to the blog!',
    'subtitle' => 'Keep up with our latest news'
)) ?>

<div class="container container--narrow page-section">
    <?php while (have_posts()) {
        the_post(); ?>
        <div class="post-item">
            <h2 class="headline headline--medium headline--post-title"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>
            <div class="metabox">
                <p>Posted by <?php the_author_posts_link() ?> on <?php the_time('j M Y');
                                                                    ?> in <?php echo get_the_category_list(', ') ?></p>
            </div>
            <div class="generic-content">
                <?php the_excerpt() ?>
                <p><a class="btn btn--blue" href="<?php echo the_permalink(); ?>">Continue Reading</a></p>
            </div>
        </div>
    <?php }
    echo paginate_links();
    ?>
</div>