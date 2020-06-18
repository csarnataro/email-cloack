/** @module email-cloack */

/**
 * Returns the Unicode endpoint of the first character of the provided string.
 *
 * @param {String} s the input string.
 */
function utf8_to_unicode(s) {
  return s.charCodeAt(0);
}

/**
 * Returns a random integer between `min` and `max`, both included.
 * E.g. getRandomInt(0, 1) can return 0 or 1
 *
 * @param {int} min lower bound
 * @param {int} max upper bound
 * @returns {int} a random number between min and max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // max and min are included
}

/**
 * Returns a string with a scrambled email address.
 * 
 * The string can be enclosed in a anchor tag `<a>` with `mailto:` as protocol.
 * Both the `mailto` and the text content are scrambled using the same technique.
 * 
 * If the `mailto` parameter is false, only the scrabled email address 
 * (without surrounding anchor tag) is returned.
 * 
 * If the `text` parameter is provided, it's used as text content of the 
 * anchor tag.
 * 
 * Basic usage:
 * - oemail("email@email.com")
 * - oemail("email@email.com", true, "Contact us")
 * - oemail("email@email.com", false)

 * @param {string} plain_email the email address you may want to scramble
 * @param {boolean} mailto [true] if true, do not enclose the email address
 * @param {string} text [""] the text content of the ancor tag. If not provided,
 *        `plain_email` will be used 
 * @returns {string} a scrabled email address (with or without surrounding
 *          ancor tag with `mailto:` protocol)
 */
function oemail(plain_email, mailto, text) {
  if (typeof mailto === "undefined") {
    mailto = true;
  }
  if (typeof text === "undefined") {
    text = "";
  }
  var email_length = plain_email.length;

  var xemail = [];
  for (var i = 0; i < email_length; i++) {
    xemail[i] = utf8_to_unicode(plain_email[i]);
  }

  var oemail = '<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;'; // "mailto:"
  if (mailto) {
    for (i = 0; i < email_length; i++) {
      oemail += "&#" + xemail[i] + ";";
    }
    oemail += '">';
    if (text) {
      email_length = text.length;

      xemail = [];
      for (i = 0; i < email_length; i++) {
        // I reuse xemail as a container for text in hex
        xemail[i] = utf8_to_unicode(text[i]);
      }
    }
  } else {
    oemail = "";
  }
  for (i = 0; i < email_length; i++) {
    oemail += "&#" + xemail[i] + ";";

    oemail += "<!-- ";
    getRandomInt(0, 1) ? (oemail += ">") : (oemail += "@");
    oemail += " -->";
  }
  if (mailto) oemail += "</a>";

  return oemail;
}

// We're not using the shorthand object definition here to be ES5 compliant
module.exports = {
  utf8_to_unicode: utf8_to_unicode,
  oemail: oemail,
  getRandomInt: getRandomInt,
};
