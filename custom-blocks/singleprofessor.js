wp.blocks.registerBlockType('customblocktheme/singleprofessor', {
  title: 'Custom Single Professor',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Single Professor Placeholder'
    );
  },
  save: () => {
    return null;
  },
});
