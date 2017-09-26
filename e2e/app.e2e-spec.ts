import { ChromeAngular2Page } from './app.po';

describe('chrome-angular2 App', function() {
  let page: ChromeAngular2Page;

  beforeEach(() => {
    page = new ChromeAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
