import { link } from '@wordpress/icons';
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  PanelRow,
  ColorPalette,
} from '@wordpress/components';
import {
  RichText,
  InspectorControls,
  BlockControls,
  __experimentalLinkControl as LinkControl,
  getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import customColors from "../includes/customColors.js"

registerBlockType('customblocktheme/genericbutton', {
  title: 'Generic Button',
  attributes: {
    text: { type: 'string' },
    size: { type: 'string', default: 'large' },
    linkObject: {
      type: 'object',
      default: {
        url: '',
      },
    },
    colorName: { type: 'string', default: 'blue' },
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

  const currentColorValue = customColors.filter((color) => {
    return color.name == props.attributes.colorName;
  })[0].color;

  function handleColorChange(colorCode) {
    // taking hex value that color palette gives, and finding its name
    const { name } = getColorObjectByColorValue(customColors, colorCode);
    props.setAttributes({ colorName: name });
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
      <InspectorControls>
        <PanelBody title='Color' initialOpen={true}>
          <PanelRow>
            <ColorPalette
              disableCustomColors={true}
              clearable={false}
              colors={customColors}
              value={currentColorValue}
              onChange={handleColorChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <RichText
        // allowedFormats can be left an empty array to allow nothing
        allowedFormats={[]}
        tagName='a'
        className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
      {isLinkPickerVisible && (
        <Popover position='middle center' onFocusOutside={() => {setIsLinkPickerVisible(false)}}>
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
      className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
    >
      {props.attributes.text}
    </a>
  );
}
