import { InnerBlocks } from '@wordpress/block-editor';

wp.blocks.registerBlockType('customblocktheme/banner', {
  title: 'banner',
  edit: editComponent,
  save: saveComponent,
});

function editComponent() {
  const useMeLater = (
    <>
      <h1 className='headline headline--large'>Welcome!</h1>
      <h2 className='headline headline--medium'>
        We think you&rsquo;ll like it here.
      </h2>
      <h3 className='headline headline--small'>
        Why don&rsquo;t you check out the <strong>major</strong> you&rsquo;re
        interested in?
      </h3>
      <a href='#' className='btn btn--large btn--blue'>
        Find Your Major
      </a>
    </>
  );

  return (
    <div className='page-banner'>
      <div
        className='page-banner__bg-image'
        style={{
          backgroundImage:
            "url('/wp-content/themes/fict-block-theme/images/library-hero.jpg')",
        }}
      ></div>
      <div className='page-banner__content container t-center c-white'>
        <InnerBlocks
          allowedBlocks={[
            'customblocktheme/genericheading',
            'core/paragraph',
            'core/list',
          ]}
        />
      </div>
    </div>
  );
}

function saveComponent() {
  return (
    <div className='page-banner'>
      <div
        className='page-banner__bg-image'
        style={{
          backgroundImage:
            "url('/wp-content/themes/fict-block-theme/images/library-hero.jpg')",
        }}
      ></div>
      <div className='page-banner__content container t-center c-white'>
        {/* pretty much receives whatever we insert in this InnerBlock in the editor and pipes it onto the frontend */}
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
