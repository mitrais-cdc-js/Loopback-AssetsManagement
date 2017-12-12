// An example configuration file
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },

  // Spec patterns are relative to the configuration file location passed
  // to protractor (in this example conf.js).
  // They may include glob patterns.
  specs: [
          //'createAsset_spec.js',
          'updateAsset_spec.js',
          //viewAsset_spec.js'
          //'assetCategory_spec.js',
          //'listAsset_spec.js',
          //'listAssetCategory_spec.js',
          //'assetCategory_spec.js',
          //'loginWP_spec.js',
           //'catPage_spec.js',
           //'asset_spec.js',
           //'assetNav_spec.js'
           'autoCallcReplacement_spec.js',
           //'manageCategory_spec.js'
          ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
  showColors: true, // Use colors in the command line report.
 	defaultTimeoutInterval: 60000
  }
};