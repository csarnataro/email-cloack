# Simple and accessible email cloacking technique

`email-cloack` is a simple JavaScript library to obfuscate an email address in
NodeJS.
Actually, it could be used also in the browser (it's ES5 compatible) but it
will be pointless, since in that case the email address would be passed in as
clear text to the `oemail` function.

It's a JavaScript porting of the PHP script by [Carlo Perassi](https://carlo.perassi.com/)
available at [https://perassi.org/quickhacks/aec/aec.txt](https://perassi.org/quickhacks/aec/aec.txt)

Motivations behind this technique are available on archive.org at
[http://web.archive.org/web/20110221010757/http://perassi.org/2007/09/24/an-accessible-email-cloaking-technique/](http://web.archive.org/web/20110221010757/http://perassi.org/2007/09/24/an-accessible-email-cloaking-technique/)

As an example, the result of cloacking the email address `carlo@some.where` is:

```html
<a
  href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#99;&#97;&#114;&#108;&#111;&#64;&#115;&#111;&#109;&#101;&#46;&#119;&#104;&#101;&#114;&#101;"
>
  &#99;<!-- > -->&#97;<!-- > -->&#114;<!-- > -->&#108;<!-- > -->&#111;<!-- > -->&#64;<!-- > -->&#115;<!-- @ -->&#111;<!-- @ -->&#109;<!-- @ -->&#101;<!-- > -->&#46;<!-- > -->&#119;<!-- @ -->&#104;<!-- @ -->&#101;<!-- > -->&#114;<!-- @ -->&#101;<!-- @ --></a
>
```

(See the source code of: [http://perassi.org/quickhacks/snippets/aec/aec1.html](http://perassi.org/quickhacks/snippets/aec/aec1.html))

> Please note that this technique is not 100% spammer proof. Valid - or even
> better - alternative techniques can be, for example, obfuscation with CSS using

```css
unicode-bidi: bidi-override;
direction: rtl;
```

See for example:
[https://elizavetasemenova.github.io/blog/2016/12/02/obfuscate-email-with-CSS](https://elizavetasemenova.github.io/blog/2016/12/02/obfuscate-email-with-CSS)

## Installation

```bash
npm install email-cloack
```

## Usage

```javascript
const { oemail } = require("email-cloack");

// returns an anchor tag with the scrambled email address as "mailto" and as
// content of the tag itself.
// e.g. <a href="mailto:some@address.com>some@address.com</a>
oemail("some@address.com");

// returns an anchor tag with the scrambled email address as "mailto"
// and "Contact us" as inner text
oemail("some@address.com", true, "Contact us");

// return just the scrambled email address, with no enclosing <a> tag.
oemail("some@address.com", false);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
