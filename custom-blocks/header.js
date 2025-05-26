wp.blocks.registerBlockType('customblocktheme/header', {
  title: 'Custom Header',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Header Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
