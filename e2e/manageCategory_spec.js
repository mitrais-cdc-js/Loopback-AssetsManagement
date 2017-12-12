var categoryPage = require ('../e2e/page/category.po.js');
var actnewCatBtn = new categoryPage ();
var actInputName = new categoryPage ();
var actInputDesc = new categoryPage ();
var actClickSaveBtn = new categoryPage ();
var exaccessCatList =  new categoryPage();

beforeEach(function(){
    var accessHomepage = new categoryPage();
    accessHomepage.get ();
    //browser.get('http://13.228.106.128/');
    var actclickCatPage = new categoryPage ();
    actclickCatPage.clickcatlink();
});

describe ("manage asset category", function(){
    it("access view category", function(){
        //expect in correct url
        var exgetcatLink = new categoryPage ();
        exgetcatLink.getcatLink();
        //expect correct title displayed
        var exgetcatTitle = new categoryPage ();
        exgetcatTitle.getcatLink();
    });
    it("create asset category and display success message", function(){  
       actnewCatBtn.clickNewCat();
       //expect correct create asset category page
       actnewCatBtn.accessCreateCat();

       actInputName.inputName ();
       actInputDesc.inputDesc ();
       actClickSaveBtn.clickSaveBtn ();
       //expect success message displayed
       expect(element(by.css('.alert-success')).isDisplayed()).toBe(true);

       browser.driver.sleep(1000);
       browser.waitForAngular();
 
       //expect back to view category page
       exaccessCatList.accessViewCat();

    });
    it("create duplicate asset category and display fail message", function(){  
        actnewCatBtn.clickNewCat();
        //expect correct create asset category page
        actnewCatBtn.accessCreateCat();
 
        actInputName.inputName ();
        actInputDesc.inputDesc ();
        actClickSaveBtn.clickSaveBtn ();
        //expect fail message displayed
        expect(element(by.css('.alert-danger')).isPresent()).toBe(true);
 
        browser.driver.sleep(1000);
        browser.waitForAngular();
  
        //expect back to view category page
        exaccessCatList.accessCreateCat();
 
     });
     it("leave mandatory blank and dispay fail message", function(){
        actnewCatBtn.clickNewCat();
        //expect correct create asset category page
        actnewCatBtn.accessCreateCat();
 
        actClickSaveBtn.clickSaveBtn ();
        //expect faile message displayed      
        expect(element(by.css('.alert-danger')).isPresent()).toBe(true);
 
        browser.driver.sleep(1000);
        browser.waitForAngular();
  
        //expect back to view category page
        exaccessCatList.accessCreateCat();

     });

});