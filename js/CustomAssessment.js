import { AssessmentResult, Assessment } from 'yoastseo';

export default class CustomAssessment extends Assessment {
	/**
	 * The constructor.
	 *
	 * @param {Object} settings The settings to pass along.
	 */
	constructor( settings ) {
		super();
		this.settings = settings;
	}

	/**
	 * Executes the assessment and return its result.
	 *
	 * @param {Paper}      paper      The paper to run this assessment on.
	 * @param {Researcher} researcher The researcher used for the assessment.
	 * @param {Object}     i18n       The i18n-object used for parsing translations.
	 *
	 * @returns {AssessmentResult} The result of the assessment.
	 */
	getResult( paper, researcher, i18n ) {

		// Check for the occurance of the word Yoast in the title.
		const title = paper.getTitle();
		const matches = (title.match(/Yoast/gi) || []).length;

		const assessmentResult = new AssessmentResult();
		const { score, text } = this.score( matches );

		assessmentResult.setScore( score ) ;
		assessmentResult.setText( text );

		return assessmentResult;
	}

	/**
	 * Determines the score based on the amount of matches.
	 *
	 * @param {number} matches The amount of matches.
	 *
	 * @returns {Object} The score object.
	 */
	score( matches ) {

		if ( matches === 0 ) {
			return{
				score: 0,
				text: "Yoast isn't present in your title",
			};
		}

		if ( matches >= 5 ) {
			return{
				score: -10,
				text: "Yoast occurs too many times in your title",
			};
		}

		return{
			score: 50,
			text: "Yoast is present in your title",
		};
	}
}