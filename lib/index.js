function utf8_to_unicode(s) {
  return s.charCodeAt(0);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // max and min are included
}

/**
 *
 *
 * mail   -> email
 * mailto -> it is href=mailto
 * text   -> text to show
 *
 *  oemail("email@email.com")
 *  oemail("email@email.com", true, "Contact us")
 *  oemail("email@email.com", false)
 *
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

module.exports = {
  utf8_to_unicode: utf8_to_unicode,
  oemail: oemail,
  getRandomInt: getRandomInt,
};
