const toButton = (button) => {
  const meta = `
		data-type="tool-button"
		data-value='${JSON.stringify(button.value)}'
	`;

  return `
		<button
			class="button ${button.active && 'active'}"
			${meta}
		>
			<i class="${button.icon}"></i>
		</button>
	`;
};

export const createToolbar = (state) => {
  const buttons = [
    {
      icon: 'ri-align-left',
      active: state['textAlign'] === 'left',
      value: {
        textAlign: 'left',
      },
    },
    {
      icon: 'ri-align-center',
      active: state['textAlign'] === 'center',
      value: {
        textAlign: 'center',
      },
    },
    {
      icon: 'ri-align-right',
      active: state['textAlign'] === 'right',
      value: {
        textAlign: 'right',
      },
    },
    {
      icon: 'ri-bold',
      active: state['fontWeight'] === 'bold',
      value: {
        fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold',
      },
    },
    {
      icon: 'ri-italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'ri-underline',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
  ];

  return buttons.map(toButton).join('');
};
