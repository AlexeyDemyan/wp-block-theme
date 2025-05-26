<div class="full-width-split group">
    <div class="full-width-split__one">
        <div class="full-width-split__inner">
            <h2 class="headline headline--small-plus t-center">Upcoming Events</h2>

            <?php
            $today = date('Ymd');
            $eventPosts = new WP_Query(array(
                // posts_pet_page set at -1 will give all posts that meet the conditions
                'posts_per_page' => 2,
                'post_type' => 'event',
                'meta_key' => 'event_date',
                'orderby' => 'meta_value_num',
                'order' => 'ASC',
                'meta_query' => array(
                    array(
                        'key' => 'event_date',
                        'compare' => '>=',
                        'value' => $today,
                        'type' => 'numeric'
                    )
                )
            ));

            while ($eventPosts->have_posts()) {
                $eventPosts->the_post();
                // This function is actually flexible and second argument could be e.g. get_post_type()
                get_template_part('template-parts/content', 'event');
            }
            ?>
            <p class="t-center no-margin"><a href="<?php echo get_post_type_archive_link('event') ?>" class="btn btn--blue">View All Events</a></p>
        </div>
    </div>
    <div class="full-width-split__two">
        <div class="full-width-split__inner">
            <h2 class="headline headline--small-plus t-center">From Our Blogs</h2>

            <?php
            $homePagePosts = new WP_Query(array(
                'posts_per_page' => 2,
                // Type is not necessary here as post is the default type
                'post_type' => 'post'
            ));

            while ($homePagePosts->have_posts()) {
                $homePagePosts->the_post(); ?>
                <div class="event-summary">
                    <a class="event-summary__date event-summary__date--beige t-center" href="<?php the_permalink() ?>">
                        <span class="event-summary__month"><?php the_time('M') ?></span>
                        <span class="event-summary__day"><?php the_time('d') ?></span>
                    </a>
                    <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h5>
                        <p><?php if (has_excerpt()) {
                                // here we echo the getter instead of normal the_excerpt for better styling
                                echo get_the_excerpt();
                            } else {
                                echo wp_trim_words(get_the_content(), 18);
                            } ?> <a href="<?php the_permalink() ?>" class="nu gray">Read more</a></p>
                    </div>
                </div>
            <?php
            } // A good habit of resetting data, albeit not necessary here:
            wp_reset_postdata() ?>

            <p class="t-center no-margin"><a href="<?php echo site_url('/blog') ?>" class="btn btn--yellow">View All Blog Posts</a></p>
        </div>
    </div>
</div>