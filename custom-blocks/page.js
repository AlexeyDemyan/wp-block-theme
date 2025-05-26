wp.blocks.registerBlockType('customblocktheme/page', {
  title: 'Custom Page',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Single Page Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
