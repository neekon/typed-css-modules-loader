var DtsCreator = require('typed-css-modules');
var loaderUtils = require('loader-utils');
var objectAssign = require('object-assign');

module.exports = function(source, map) {
  this.cacheable && this.cacheable();
  var callback = this.async();

  // Pass on query parameters as an options object to the DtsCreator. This lets
  // you change the default options of the DtsCreator and e.g. use a different
  // output folder.
  var queryOptions = loaderUtils.parseQuery(this.query);
  var options;
  if (queryOptions) {
    options = objectAssign({}, queryOptions);
  }

  var creator = new DtsCreator(options);

  // creator.create(..., source) tells the module to operate on the
  // source variable. Check API for more details.
  creator.create(this.resourcePath, source).then(content => {
    content.writeFile().then(_ => {
      callback(null, source, map);
    });
  });
};

