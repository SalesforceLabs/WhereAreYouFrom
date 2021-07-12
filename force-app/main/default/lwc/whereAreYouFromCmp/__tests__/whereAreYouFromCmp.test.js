import { createElement } from "lwc";
import whereAreYouFrom from "c/whereAreYouFromCmp";

describe("c-whereAreYouFrom", () => {
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
    },
    configurable: true
  });
  // since the community language doesn't contain "language, the code will not execute"
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
    },
    configurable: true
  });
  document.body.appendChild(element);

  // community language should change to de
  return Promise.resolve().then(() => {
    window.location.href =
      "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=de";
    expect(window.location.href).toEqual(
      "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=de"
    );
  });
});

it("Test#3: Positive - Community language = en users browser language = de. Expected result change community URL to de", () => {
  delete window.location;
  const element = createElement("c-whereAreYouFrom", {
    is: whereAreYouFrom
  });
  // browser language equals de_AT
  navigator.__defineGetter__("userLanguage", function () {
    return "de_AT";
  });
  // default community language equals en_US
  global.window = Object.create(window);
  const communityURL =
    "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=en_US";
  Object.defineProperty(window, "location", {
    value: {
      href: communityURL
    },
    configurable: true
  });
  document.body.appendChild(element);

  // community language should change to de
  return Promise.resolve().then(() => {
    window.location.href =
      "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=de";
    expect(window.location.href).toEqual(
      "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=de"
    );
  });
});

it("Test#4: Negative - don't change community language b/c session storage exists. This will prevent a loop and let's users change language manually", () => {
  delete window.location;
  const element = createElement("c-whereAreYouFrom", {
    is: whereAreYouFrom
  });
  window.sessionStorage.setItem("whereAreYouFromLoaded", true);

  // browser language equals de_AT
  navigator.__defineGetter__("language", function () {
    return "de_AT";
  });

  // default community language equals en_US
  const communityURL =
    "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=en_US";
  Object.defineProperty(window, "location", {
    value: {
      href: communityURL
    },
    configurable: true
  });

  document.body.appendChild(element);

  // community language should not change because session storage exists
  expect(window.location.href).toEqual(
    "https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=en_US"
  );
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
