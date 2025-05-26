wp.blocks.registerBlockType('customblocktheme/programarchive', {
  title: 'Custom Program Archive',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Program Archive Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
