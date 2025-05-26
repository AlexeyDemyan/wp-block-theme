wp.blocks.registerBlockType('customblocktheme/singleprogram', {
  title: 'Custom Single Program',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Single Program Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
