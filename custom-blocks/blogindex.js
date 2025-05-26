wp.blocks.registerBlockType('customblocktheme/blogindex', {
  title: 'Custom Blog Index',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Blog Index Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
