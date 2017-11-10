import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(page = null) {
    if (page == null) {
      return browser.get('/');
    } else {
      return browser.get(page);
    }
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getAssetPageTitle() {
    return element(by.css('app-asset h4')).getText();
  }

  getColumnName(column) {
    return element(by.css('.table th:nth-child(' + column + ')')).getText();
  }
}
