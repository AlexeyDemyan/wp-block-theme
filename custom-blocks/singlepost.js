wp.blocks.registerBlockType('customblocktheme/singlepost', {
  title: 'Custom Single Post',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Single Post Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
