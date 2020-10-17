import { $dom } from '../DOM';
import { ActiveRoute } from './ActiveRoute';
// import { ActiveRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router!');
    }

    this.$placeholder = $dom(selector);
    this.routes = routes;
    this.page = null;

    this.changeRouteHandler = this.changeRouteHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changeRouteHandler);
    this.changeRouteHandler();
  }

  changeRouteHandler() {
    this.page && this.page.destroy();
    this.$placeholder.clear();

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);

    this.$placeholder.append(this.page.getRoot());

    this.page.mounted();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changeRouteHandler);
  }
}
