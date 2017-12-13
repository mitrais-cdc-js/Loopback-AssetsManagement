var categoryPage = function (){
    //element view category
    var catLink = element (by.css('[href="/categories"]'));
    var newCatBtn = element (by.xpath('/html/body/div/div/app-root/app-category/p[1]/a'))
    var DelCatBtn = element (by.xpath('/html/body/div/div/app-root/app-category/p[3]/ng2-smart-table/table/tbody/tr[1]/td[1]/ng2-st-tbody-edit-delete/a'));
    
    //element create category
    var name = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[1]/input'));
    var nameLabel = element(by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[1]/label'));
    var desc = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[2]/input'));
    var descLabel = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[2]/label'));
    var saveBtn = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/button'));
    var parentLabel = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[3]/label'));
    var checkLabel = element (by.xpath('/html/body/div/div/app-root/app-category-create/div/div[1]/div/form/div[4]/label'));

    //action: access apps url
    this.get = function(){
        browser.get('http://13.228.106.128');
    };
    //action: access category page
    this.clickcatlink = function (){ 
        catLink.click();
    };
    //action: click new category button
    this.clickNewCat = function(){
         newCatBtn.click();
    };
    //expect: ensure list of category title displayed
    this.getcatLink = function (){
         expect (browser.getCurrentUrl()).toEqual('http://13.228.106.128/categories');    
    };
    //expect: ensure title displayed
    this.getcatTitle = function (){
        var catTitle = element (by.xpath('/html/body/div/div/app-root/app-category/h4'));
        expect(catTitle.getText()).toEqual("List of Categories");
    };
    //expect : ensure accessing correct url
    this.accessCreateCat = function (){
         expect (browser.getCurrentUrl()).toEqual("http://13.228.106.128/categories/create");
    };
    //action: input category name
    this.inputName = function(){
        name.sendKeys("AMonitor_Auto");
    };
    //action: input category description
    this.inputDesc = function (){
        desc.sendKeys("AMonitor,LCD_Auto");
    };
    //action: click save button
    this.clickSaveBtn = function(){
        saveBtn.click();
    };
    //expect: back to list of category and new category displayed
    this.accessViewCat = function(){
        expect(browser.getCurrentUrl()).toEqual("http://13.228.106.128/categories");    
    };
    //action:click delete button
    this.clickDelCatBtn = function(){
        DelCatBtn.click();
    };
    //expect: category name is displayed
    this.getcatName = function(){
        expect(nameLabel.getText()).toEqual("Name*");
    };
    //expcet: category desc is displayed
    this.getcatDesc = function (){
        expect(descLabel.getText()).toEqual("Description*");

    };
    //expect: parent category is displayed
    this.getcatParent = function (){
        expect(parentLabel.getText()).toEqual("Parent Category");

    };
    //expect: checklist category is displayed
    this.getcatChecklist = function (){
        expect(checkLabel.getText()).toEqual("Checklist");
    };

};
module.exports = categoryPage

