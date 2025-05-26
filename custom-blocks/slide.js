import apiFetch from '@wordpress/api-fetch';
import { Button, PanelBody, PanelRow } from '@wordpress/components';
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

wp.blocks.registerBlockType('customblocktheme/slide', {
  title: 'Custom Slide',
  supports: {
    align: ['full'],
  },
  attributes: {
    align: { type: 'string', default: 'full' },
    imgID: { type: 'number' },
    // specifygin "window." is not necesary, just "banner.fallbackimage" should be enough
    imgURL: { type: 'string', default: window.banner.fallbackimage },
    themeimage: { type: 'string' },
  },
  edit: editComponent,
  save: saveComponent,
});

function editComponent(props) {
  // empty array to only run this effect on initial load
  useEffect(() => {
    if (props.attributes.themeimage) {
      props.setAttributes({
        imgURL: `${slide.themeimagepath}${props.attributes.themeimage}`,
      });
    }
  }, []);

  useEffect(() => {
    if (props.attributes.imgID) {
      async function go() {
        const response = await apiFetch({
          path: `/wp/v2/media/${props.attributes.imgID}`,
          method: 'GET',
        });
        props.setAttributes({
          themeimage: '',
          imgURL: response.media_details.sizes.pageBanner.source_url,
        });
      }
      go();
    }
  }, [props.attributes.imgID]);

  function onFileSelect(pic) {
    console.log(pic);
    props.setAttributes({ imgID: pic.id });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title='Background' initialOpen={true}>
          <PanelRow>
            {/* MediaUploadCheck check if current user has permissions to upload media */}
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose Image</Button>;
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div
        className='hero-slider__slide'
        style={{
          backgroundImage: `url('${props.attributes.imgURL}')`,
        }}
      >
        <div class='hero-slider__interior container'>
          <div class='hero-slider__overlay t-center'>
            <InnerBlocks
              allowedBlocks={[
                'customblocktheme/genericheading',
                'customblocktheme/genericbutton',
                'core/paragraph',
                'core/list',
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function saveComponent() {
  return <InnerBlocks.Content />;
}
