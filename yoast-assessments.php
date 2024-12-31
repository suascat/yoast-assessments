<?php
/**
 * Yoast Assessments
 * 
 * 
 * Plugin Name: Yoast Assessments
 * Plugin URI:  
 * Description: Description of the plugin.
 * Version:     1.0.0
 * Author:      
 * Author URI:  
 * Text Domain: yoast-assessments
 * License:     GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */



 /**
 * Plugin Name: My Custom Plugin
 */

 class YoastAssessmentsPlugin {

    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
    }

    /**
     * Enqueues the plugin file.
     *
     * @return void
     */
    public function enqueue_scripts() {
        global $pagenow;

        // Check if we're editing a post
        if (($pagenow == 'post.php') || (get_post_type() == 'post')) {
            // Enqueue the main (non-minified) version of the JavaScript file
            wp_enqueue_script('yoast-assessment-plugin', plugins_url('js/MyCustomAssessmentPlugin.js', __FILE__), [], '1.0', true);
            
            // Localize the script with the URL for the web worker (CustomWorker.js)
            wp_localize_script('yoast-assessment-plugin', 'myCustomAssessmentPluginL10n', $this->localize_extended_script());
        }
    }

    /**
     * Localizes a set of data to be used in JavaScript.
     *
     * @return array The data to localize.
     */
    public function localize_extended_script() {
        return [
            'script_url' => plugins_url('js/CustomWorker.js', __FILE__),  // Web worker JS file
        ];
    }
}

/**
 * Loads the plugin.
 */
function loadYoastAssessmentsPlugin() {
    new YoastAssessmentsPlugin();
}

if (!wp_installing()) {
    add_action('plugins_loaded', 'loadYoastAssessmentsPlugin', 20);
}
