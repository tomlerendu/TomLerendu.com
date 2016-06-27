import {Environment} from '../Environment';

export class Helpers {

    /**
     * Takes a directus image object and formats it as a URL string
     * @param image The directus image object
     * @returns {string} The image url
     */
    public static formatImage(image): String {

        if(image == null || typeof image.name == undefined) {
            return '';
        }

        return Environment.mediaUrl + '/' + image.name;
    }

    /**
     * Formats a tag string to a tag array
     * @param tags The tag string
     * @returns {array} The tag array
     */
    public static formatTags(tags: String): Array<String> {
        if(tags == '') {
            return [];
        } else {
            return tags.split(',');
        }
    }

    /**
     * Formats two dates as a timespan eg (2010-2014)
     * @param startDateString The start date
     * @param endDateString The end date or null if the timespan is still going
     * @returns {any} The formatted timespan
     */
    public static formatTimespan(startDateString: String, endDateString: String): String {

        let startDate = new Date(startDateString);
        let endDate = endDateString == '0000-00-00' ? null : new Date(endDateString);

        //If the project hasn't ended
        if(endDate == null) {
            return String(startDate.getFullYear()) + ' - Present'
        }
        //If the start and end year are the same
        else if(startDate.getFullYear() == endDate.getFullYear()) {
            return String(startDate.getFullYear());
        }
        //If the start and end year are different
        else {
            return String(startDate.getFullYear()) + ' - ' + String(endDate.getFullYear())
        }
    }
}