wp.blocks.registerBlockType('customblocktheme/footer', {
  title: 'Custom Footer',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Footer Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
