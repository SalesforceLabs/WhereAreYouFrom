import { createElement } from "lwc";
import whereAreYouFrom from "c/whereAreYouFromCmp";
import { jsxEmptyExpression } from "@babel/types";

//TEST # 1 - Negative Test with Community and no languages supported
//Mock a Community URL - (doesn't contain "language=" in url) https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/
//Nothing should execute except a console log "This Community does not have multiple languages enabled currently. This is why whereAreYouFromCmp did not run"
//Assert if log exists and URL still equals https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/
//Assert that session.log has not been created

//TEST # 2 - Positive Test
//Mock a Community URL - with browser language (needs to contain "language=" in url) https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=en_US
//Community language should be en_US = language=en_US

//Mock a users browser language de-AT
//User will have browser langugage set to de-AT
//User will open the Community URL above
//User will get redirected to new URL https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=de

//Check that user changes language manually to French fr
//URL should equal https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=fr
//URL should not go back to default browser language
//Assert by checking URL with fr language code
//Assert that session.log has been created

//TEST # 3 - Negative Test
//Mock a Community URL - (doesn't contain "language=" in url) https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/
//Community language should be en_US = language=en_US
//User will have browser langugage set to ar
//Community doesn't support ar language and will default to en
//Assert by checking URL with ar language code
//Assert that session.log has been created

//Given - prepare tests
describe("c-whereAreYouFrom", () => {
  // calls the resetUserAgentLanguageSettings function
  beforeEach(() => {
    resetUserAgentLanguageSettings();
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });
});

it("Test#1: Negative - No language in Community Detected", () => {
  const element = createElement("c-whereAreYouFrom", {
    is: whereAreYouFrom
  });
  document.body.appendChild(element);

  global.window = Object.create(window);
  const communityURL =
    "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/";
  Object.defineProperty(window, "location", {
    value: {
      href: communityURL
    }
  });
  expect(window.location.href).toEqual(
    "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/"
  );
});

it("Test#2: Positive - Community language = en users browser language = de. Expected result change community URL to de", () => {
  delete window.location;
  const element = createElement("c-whereAreYouFrom", {
    is: whereAreYouFrom
  });
  // browser language equals de_AT
  navigator.__defineGetter__("language", function () {
    return "de_AT";
  });
  // default community language equals en_US
  global.window = Object.create(window);
  const communityURL =
    "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=en_US";
  Object.defineProperty(window, "location", {
    value: {
      href: communityURL
    }
  });
  document.body.appendChild(element);

  // community language should change to de
  expect(window.location.href).toEqual(
    "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=de"
  );

  // delete window.location;
  // // user changes manually to french
  // window.location.href =
  //   "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=fr";

  // // browser language should now equal fr
  // expect(window.location.href).toEqual(
  //   "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=fr"
  // );
});

//Mocking and resetting navigator based language detection in JEST
//Source: https://gist.github.com/C3-TKO/ea9c046a1d7ab3b49572f0145c73fabe
const resetUserAgentLanguageSettings = () => {
  navigator.__defineGetter__("languages", function () {
    return undefined;
  });
  navigator.__defineGetter__("language", function () {
    return undefined;
  });
  navigator.__defineGetter__("userLanguage", function () {
    return undefined;
  });
};
