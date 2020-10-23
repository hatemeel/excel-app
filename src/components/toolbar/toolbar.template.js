const toButton = (button) => {
  const meta = `
		data-type="tool-button"
		${button.value ? `data-value='${JSON.stringify(button.value)}'` : ''}
		${button.function ? `data-function='${button.function}'` : ''}
	`;

  return `
		<button
			class="button ${(button.active && 'active') || ''} ${button.class || ''}"
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
      class: 'space-left',
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
    {
      icon: 'ri-functions',
      function: 'sum',
      class: 'space-left',
    },
  ];

  return buttons.map(toButton).join('');
};
