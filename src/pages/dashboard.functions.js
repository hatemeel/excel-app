import { storage } from '../core/utils';

export const toHTML = (storageName) => {
  return `
	<tr>
		<td>
			<a href="#excel/${storageName.replace('excel:', '')}">
				${storage(storageName).title}
			</a>
		</td>
		<td>
			<strong>
				${new Date(storage(storageName).lastActivity).toLocaleDateString('uk')}
				${new Date(storage(storageName).lastActivity).toLocaleTimeString('uk')}
			</strong>
		</td>
	</tr>
	`;
};

const getAllKeys = () => {
  return Object.keys(localStorage)
    .reduce((acc, key) => {
      if (key.includes('excel:')) {
        acc.push(key);
      }
      return acc;
    }, [])
    .sort(
      (a, b) =>
        new Date(storage(b).lastActivity) - new Date(storage(a).lastActivity)
    );
};

export const getAllRecords = () => {
  const keys = getAllKeys();

  if (keys.length) {
    return `
			<table class="dashboard__logs__table">
				<thead>
					<th>Name</th>
					<th class="w-fit-content">Last Activity</th>
				</thead>
				<tbody>
					${keys.map(toHTML).join('')}
				</tbody>
			</table>
		`;
  }
  return `<h3>You have not created any tables yet</h3>`;
};
