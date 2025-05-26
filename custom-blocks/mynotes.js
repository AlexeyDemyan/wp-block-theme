wp.blocks.registerBlockType('customblocktheme/mynotes', {
  title: 'My Notes',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'My Notes Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
