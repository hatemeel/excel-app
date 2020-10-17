import { Page } from '../core/Page';
import { Excel } from '../components/excel/Excel';
import { Header } from '../components/header/Header';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Formula } from '../components/formula/Formula';
import { Table } from '../components/table/Table';
import { createStore } from '../core/createStore';
import { rootReducer } from '../redux/root.reducer';
import { debounce, storage } from '../core/utils';
import { initialState } from '../redux/initialState';

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(
      rootReducer,
      initialState(`excel:${this.params}`)
    );

    const stateListener = debounce((state) => {
      storage(`excel:${this.params}`, state);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  mounted() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
