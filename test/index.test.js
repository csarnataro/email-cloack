const { oemail, utf8_to_unicode, getRandomInt } = require("../lib");

afterEach(() => {
  if (global.Math.random.mockRestore) {
    global.Math.random.mockRestore();
  }
});

describe("unicode_to_utf8", () => {
  it("should convert correctly a list of chars", () => {
    expect(utf8_to_unicode("a")).toEqual(97);
    expect(utf8_to_unicode("abc")).toEqual(97);
    expect(utf8_to_unicode("à")).toEqual(224);
    expect(utf8_to_unicode("œ")).toEqual(339);
    expect(utf8_to_unicode("o")).toEqual(111);
    expect(utf8_to_unicode("û")).toEqual(251);
    expect(utf8_to_unicode("à")).toEqual(224);
    expect(utf8_to_unicode("@")).toEqual(64);
    expect(utf8_to_unicode("ሴ")).toEqual(4660);
  });
});

describe("oemail (single param)", () => {
  it("should cloack an email address (mocking random to 0)", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    const cloacked = `<a href=\"&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#99;&#97;&#114;&#108;&#111;&#64;&#115;&#111;&#109;&#101;&#46;&#119;&#104;&#101;&#114;&#101;\">&#99;<!-- @ -->&#97;<!-- @ -->&#114;<!-- @ -->&#108;<!-- @ -->&#111;<!-- @ -->&#64;<!-- @ -->&#115;<!-- @ -->&#111;<!-- @ -->&#109;<!-- @ -->&#101;<!-- @ -->&#46;<!-- @ -->&#119;<!-- @ -->&#104;<!-- @ -->&#101;<!-- @ -->&#114;<!-- @ -->&#101;<!-- @ --></a>`;
    expect(oemail("carlo@some.where")).toEqual(cloacked);
  });

  it("should cloack an email address (mocking random to 1)", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.9);
    const cloacked = `<a href=\"&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#99;&#97;&#114;&#108;&#111;&#64;&#115;&#111;&#109;&#101;&#46;&#119;&#104;&#101;&#114;&#101;\">&#99;<!-- > -->&#97;<!-- > -->&#114;<!-- > -->&#108;<!-- > -->&#111;<!-- > -->&#64;<!-- > -->&#115;<!-- > -->&#111;<!-- > -->&#109;<!-- > -->&#101;<!-- > -->&#46;<!-- > -->&#119;<!-- > -->&#104;<!-- > -->&#101;<!-- > -->&#114;<!-- > -->&#101;<!-- > --></a>`;
    expect(oemail("carlo@some.where")).toEqual(cloacked);
  });

  it("create valid DOM", async () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    const container = getExampleDOM(oemail("carlo@some.where"));

    const emailNode = container.getElementsByTagName("a")[0];
    expect(emailNode).not.toBeUndefined();

    console.log(emailNode.textContent);
    expect(emailNode.textContent).not.toBeUndefined();

    expect(emailNode).toMatchSnapshot();
  });
});

describe("oemail (with 3 params)", () => {
  it("should create an email address with text content", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    const container = getExampleDOM(
      oemail("carlo@some.where", true, "Contact us")
    );

    const emailNode = container.getElementsByTagName("a")[0];
    expect(emailNode).not.toBeUndefined();

    console.log(emailNode.textContent);
    expect(emailNode.textContent).not.toBeUndefined();

    expect(emailNode).toMatchSnapshot();
  });
});

describe("oemail (with 2 params)", () => {
  it("should create an email address with surrounding anchor tag", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    const container = getExampleDOM(oemail("carlo@some.where", true));

    const emailNode = container.getElementsByTagName("a")[0];
    expect(emailNode).not.toBeUndefined();

    console.log(emailNode.textContent);
    expect(emailNode.textContent).not.toBeUndefined();

    expect(emailNode).toMatchSnapshot();
  });
});

describe("oemail (with 2 params) - no mailto", () => {
  it("should create an email address without surrounding anchor tag", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    const container = getExampleDOM(oemail("carlo@some.where", false));

    const justEmail = container.textContent;
    expect(justEmail).not.toBeUndefined();

    expect(justEmail).toMatchSnapshot();
  });
});

describe("getRandomInt", () => {
  it("Should return 1 if min and max are 1", () => {
    expect(getRandomInt(1, 1)).toEqual(1);
  });
  it("Should return 0 if min and max are 0", () => {
    expect(getRandomInt(0, 0)).toEqual(0);
  });

  it("Should not return values < 0 or > 1 in 100 attempts", () => {
    let found = false;
    for (let i = 0; i < 100; i++) {
      let rand = getRandomInt(0, 1);
      if (rand < 0 || rand > 1) {
        found = true;
        break;
      }
    }
    expect(found).toEqual(false);
  });

  it("Should return at least one 1 in 100 attempts", () => {
    let rand = 0;
    for (let i = 0; i < 100; i++) {
      rand = getRandomInt(0, 1);
      if (rand === 1) break;
    }
    expect(rand).toEqual(1);
  });

  it("Should return at least one 0 in 100 attempts", () => {
    let rand = 1;
    for (let i = 0; i < 100; i++) {
      rand = getRandomInt(0, 1);
      if (rand === 0) break;
    }
    expect(rand).toEqual(0);
  });
});

function getExampleDOM(emailTag) {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const div = document.createElement("div");
  div.innerHTML = emailTag;
  return div;
}
