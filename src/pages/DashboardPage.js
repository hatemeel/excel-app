import { $dom } from '../core/DOM';
import { Page } from '../core/Page';
import { getAllRecords } from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    return $dom.create('div', 'dashboard').html(`
			<div class="dashboard__header">
				<h1>Excel Dashboard</h1>
			</div>

			<div class="dashboard__new">
				<a href="#excel/${Date.now().toString()}" class="dashboard__create">
					<span> Create New Table </span>
				</a>
			</div>

			<div class="dashboard__logs">
				${getAllRecords()}
			</div>
		`);
  }
}
