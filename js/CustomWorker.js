/* global analysisWorker */
import CustomAssessment from "./CustomAssessment";

class CustomWorker {
	/**
	 * Constructs a worker to be run inside the analysis web worker.
	 */
	constructor() {
		this._worker = analysisWorker;
	}

    /**
     * Registers the worker.
     */
	register() {
		this._worker.registerMessageHandler( "initialize", this.initialize.bind( this ), "MyCustomAssessmentPlugin" );
	}

    /**
     * Initializes the worker.
     *
     * @param {Object} settings The settings to pass along to the assessment.
     */
	initialize( settings ) {
		this.customAssessment = new CustomAssessment( settings );

		this._worker.registerAssessment( "customAssessment", this.customAssessment, "MyCustomAssessmentPlugin" );
	}
}

const customWorker = new CustomWorker();

customWorker.register();