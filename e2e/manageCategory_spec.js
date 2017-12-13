var categoryPage = require ('../e2e/page/category.po.js');
var actnewCatBtn = new categoryPage ();
var actInputName = new categoryPage ();
var actInputDesc = new categoryPage ();
var actClickSaveBtn = new categoryPage ();
var exaccessCatList =  new categoryPage();
var actDelAssetCat = new categoryPage ();

beforeEach(function(){
    var accessHomepage = new categoryPage();
    accessHomepage.get ();
    //browser.get('http://13.228.106.128/');

});

//describe ("manage asset category", function(){
describe ("2916 create asset classification", function(){    
    it("000 access view category", function(){
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
        //expect in correct url
        var exgetcatLink = new categoryPage ();
        exgetcatLink.getcatLink();
        //expect correct title displayed
        var exgetcatTitle = new categoryPage ();
        exgetcatTitle.getcatLink();
    });
   
    it ("001 access create category page", function(){
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
        actnewCatBtn.clickNewCat();

        //expect display name fields
        var exgetcatName = new categoryPage();
        exgetcatName.getcatName();
        //expect display description
        var exgetcatDesc = new categoryPage();
        exgetcatDesc.getcatDesc();
        //expect display parent-category
        var exgetcatParent = new categoryPage();
        exgetcatParent.getcatParent();
        //expect display checklist
        var exgetcatChecklist = new categoryPage();
        exgetcatChecklist.getcatChecklist();

    });

    it("003 create asset category and display success message", function(){  
       var actclickCatPage = new categoryPage ();
       actclickCatPage.clickcatlink();
       actnewCatBtn.clickNewCat();
       //expect correct create asset category page
       actnewCatBtn.accessCreateCat();

       actInputName.inputName ();
       actInputDesc.inputDesc ();
       actClickSaveBtn.clickSaveBtn ();
       //expect success message displayed

       expect(element(by.css('.alert-success')).isPresent()).toBe(true);

       browser.driver.sleep(1000);
       browser.waitForAngular();
 
       //expect back to view category page
       exaccessCatList.accessViewCat();

    });
    it("003, 004 create duplicate asset category and display fail message", function(){  
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
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
     it("002,003 leave mandatory blank and dispay fail message", function(){
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
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
     it ("000 delete asset category", function(){ 
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
        actDelAssetCat.clickDelCatBtn();
        
        var timeoutInMilliseconds = 1000;
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
    
        var alert = browser.switchTo().alert();
        alert.accept();
    
        browser.driver.sleep(1000);
        browser.waitForAngular();
    
      });
});