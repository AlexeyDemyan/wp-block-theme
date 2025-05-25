import { link } from '@wordpress/icons';
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
} from '@wordpress/components';
import {
  RichText,
  BlockControls,
  __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';

registerBlockType('customblocktheme/genericbutton', {
  title: 'Generic Button',
  attributes: {
    text: { type: 'string' },
    size: { type: 'string', default: 'large' },
    linkObject: { type: 'object', default: {
        url: ""
    } },
  },
  edit: editComponent,
  save: saveComponent,
});

function editComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

  function handleTextChange(value) {
    props.setAttributes({ text: value });
  }

  function buttonHandler() {
    setIsLinkPickerVisible(!isLinkPickerVisible);
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink });
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>
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
        allowedFormats={[]}
        tagName='a'
        className={`btn btn--${props.attributes.size} btn--blue`}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
      {isLinkPickerVisible && (
        <Popover position='middle center'>
          <LinkControl
            settings={[]}
            value={props.attributes.linkObject}
            onChange={handleLinkChange}
          />
          <Button
            variant='primary'
            onClick={() => {
              setIsLinkPickerVisible(false);
            }}
            style={{ display: 'block', width: '100%' }}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  );
}

function saveComponent(props) {
  return (
    <a
      href={props.attributes.linkObject.url}
      className={`btn btn--${props.attributes.size} btn--blue`}
    >
      {props.attributes.text}
    </a>
  );
}
