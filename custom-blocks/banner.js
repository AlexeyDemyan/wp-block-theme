import apiFetch from '@wordpress/api-fetch';
import { Button, PanelBody, PanelRow } from '@wordpress/components';
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

wp.blocks.registerBlockType('customblocktheme/banner', {
  title: 'banner',
  supports: {
    align: ['full'],
  },
  attributes: {
    align: { type: 'string', default: 'full' },
    imgID: { type: 'number' },
    // specifygin "window." is not necesary, just "banner.fallbackimage" should be enough
    imgURL: { type: 'string', default: window.banner.fallbackimage },
  },
  edit: editComponent,
  save: saveComponent,
});

function editComponent(props) {
  useEffect(() => {
    if (props.attributes.imgID) {
      async function go() {
      const response = await apiFetch({
        path: `/wp/v2/media/${props.attributes.imgID}`,
        method: 'GET'
      });
      props.setAttributes({
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
      <div className='page-banner'>
        <div
          className='page-banner__bg-image'
          style={{
            backgroundImage:
              `url('${props.attributes.imgURL}')`,
          }}
        ></div>
        <div className='page-banner__content container t-center c-white'>
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
    </>
  );
}

function saveComponent() {
  return <InnerBlocks.Content />;
}
