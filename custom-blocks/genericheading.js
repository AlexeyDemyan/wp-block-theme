import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('customblocktheme/genericheading', {
  title: 'Generic Heading',
  attributes: {
    text: { type: 'string' },
    size: { type: 'string', default: 'large' },
  },
  edit: editComponent,
  save: saveComponent,
});

function editComponent(props) {
  function handleTextChange(value) {
    props.setAttributes({ text: value });
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            isPressed={props.attributes.size == 'large'}
            onClick={() => {
              props.setAttributes({ size: 'large' });
            }}
          >
            Large
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.size == 'medium'}
            onClick={() => {
              props.setAttributes({ size: 'medium' });
            }}
          >
            Medium
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.size == 'small'}
            onClick={() => {
              props.setAttributes({ size: 'small' });
            }}
          >
            Small
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <RichText
        // allowedFormats can be left an empty array to allow nothing
        allowedFormats={['core/bold']}
        tagName='h1'
        className={`headline headline--${props.attributes.size}`}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
    </>
  );
}

function saveComponent(props) {
  function createTagName() {
    switch (props.attributes.size) {
      case 'large':
        return 'h1';
      case 'medium':
        return 'h2';
      case 'small':
        return 'h3';
    }
  }

  return (
    <RichText.Content
      tagName={createTagName()}
      value={props.attributes.text}
      className={`headline headline--${props.attributes.size}`}
    />
  );
}
