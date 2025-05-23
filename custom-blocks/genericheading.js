wp.blocks.registerBlockType('customblocktheme/genericheading', {
  title: 'Generic Heading',
  edit: editComponent,
  save: saveComponent,
});

function editComponent() {
  return <div>Hello from Gen Heading!</div>;
}

function saveComponent() {
  return <div>Heading Block on Frontend</div>;
}
