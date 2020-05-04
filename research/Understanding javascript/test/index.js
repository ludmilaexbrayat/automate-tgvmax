/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

url = "http://www.oui.sncf/";

const userInformation = require('./userInformation').information;

console.log(userInformation['gareDepart']);