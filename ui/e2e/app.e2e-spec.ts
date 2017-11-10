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
});
