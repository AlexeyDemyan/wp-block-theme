wp.blocks.registerBlockType('customblocktheme/eventsandblogs', {
  title: 'Events and Blogs',
  edit: () => {
    // here we're sort of bypassing JSX
    return wp.element.createElement(
      'div',
      { className: 'custom-placeholder-block' },
      'Placeholder child for blogs and events'
    );
  },
  save: () => {
    return null;
  },
});
