/* global YoastSEO: true, myCustomAssessmentPluginL10n */

class MyCustomAssessmentPlugin {
  /**
   * The constructor.
   */
constructor() {
  // Ensure YoastSEO.js is present and can access the necessary features.
  if ( typeof YoastSEO === "undefined" || typeof YoastSEO.analysis === "undefined" || typeof YoastSEO.analysis.worker === "undefined" ) {
    return;
  }

  this.registerWorker();
}

/**
 * Registers the custom worker.
 *
 * @returns {void}
 */
registerWorker() {
  const worker = YoastSEO.analysis.worker;

  worker.loadScript( myCustomAssessmentPluginL10n.script_url ).then(
    () => worker.sendMessage( "initialize", myCustomAssessmentPluginL10n, "MyCustomAssessmentPlugin" )
  );
}
}

/**
* Adds eventListener on page load to load the Yoast Extended.
*/
if ( typeof YoastSEO !== "undefined" && typeof YoastSEO.analysis !== "undefined" ) {
new MyCustomAssessmentPlugin();
}
else {
jQuery( window ).on(
  'YoastSEO:ready',
  function() {
    new MyCustomAssessmentPlugin();
  }
);
}