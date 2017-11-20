import { AppPage } from './app.po';

describe('ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title : Asset Management Application', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Asset Management Application');
  });

  // Asset Pages
  it('Asset page should display title : List of Assets', () => {
    page.navigateTo('/assets');
    expect(page.getAssetPageTitle()).toEqual('List of Assets');
  });

  it('Asset table should have the fourth column as : Installed Date', () => {
    expect(page.getColumnName(5)).toEqual('Installed Date');
  });

});
