var categoryPage = require ('../e2e/page/category.po.js');
var actnewCatBtn = new categoryPage ();
var actInputName = new categoryPage ();
var actInputDesc = new categoryPage ();
var actClickSaveBtn = new categoryPage ();
var exaccessCatList =  new categoryPage();
var actDelAssetCat = new categoryPage ();
var actClickInputParent = new categoryPage();
var actClickInputChecklist = new categoryPage();
var actInputParent = new categoryPage();
var actInputChecklist = new categoryPage();

beforeEach(function(){
    var accessHomepage = new categoryPage();
    accessHomepage.get ();
    //browser.get('http://13.228.106.128/');

});

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

    it("003 create asset category with mandatory field and display success message", function(){  
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
     xit("000,003 successfully edit category", function(){
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
        var actclickEdit = new categoryPage();
        actclickEdit.clickeditLink();
        //expect in edit category page
        var exgetEditURL = new categoryPage();
        exgetEditURL.getEditURL();

        //edit category details
        var actEditInputName = new categoryPage ();
        actEditInputName.editInputName();
        var actEditInputDesc = new categoryPage();
        actEditInputDesc.editInputDesc();
        var actclickEditSaveBtn = new categoryPage();
        actclickEditSaveBtn.clickEditSaveBtn(); 

        //expect success message displayed
        //expect(element(by.css('.alert-success')).isPresent()).toBe(true);

        browser.driver.sleep(10000);
        browser.waitForAngular();
  
        //expect back to view category page
        exaccessCatList.accessViewCat();
       
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

      it("003 create asset category with all available field and display success message", function(){  
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
        actnewCatBtn.clickNewCat();
        //expect correct create asset category page
        actnewCatBtn.accessCreateCat();
 
        actInputName.inputName ();
        actInputDesc.inputDesc ();
        actInputParent.inputParent();
        actClickInputChecklist.inputChecklist();

        actClickSaveBtn.clickSaveBtn ();
        //expect success message displayed
        expect(element(by.css('.alert-success')).isPresent()).toBe(true);
 
        browser.driver.sleep(1000);
        browser.waitForAngular();
  
        //expect back to view category page
        exaccessCatList.accessViewCat();
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

     it("000 view category asset detail",function(){
        var actclickCatPage = new categoryPage ();
        actclickCatPage.clickcatlink();
        var actclickViewLink = new categoryPage();
        actclickCatPage.clickViewLink();
        //expect dispay view asset detail
        var exViewDetailCat = new categoryPage();
        exViewDetailCat.getViewLink();

     });
      
});