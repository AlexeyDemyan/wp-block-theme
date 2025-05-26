import { InnerBlocks } from '@wordpress/block-editor';

wp.blocks.registerBlockType('customblocktheme/slideshow', {
  title: 'Slideshow',
  supports: {
    align: ['full'],
  },
  attributes: {
    align: { type: 'string', default: 'full' },
  },
  edit: editComponent,
  save: saveComponent,
});

function saveComponent() {
  return <InnerBlocks.Content />;
}

function editComponent() {
  return (
    <div style={{ backgroundColor: '#333', padding: '35px' }}>
      <p style={{ textAlign: 'center', fontSize: '20px', color: '#FFF' }}>
        Slideshow
      </p>
      <InnerBlocks allowedBlocks={['customblocktheme/slide']} />
    </div>
  );
}
