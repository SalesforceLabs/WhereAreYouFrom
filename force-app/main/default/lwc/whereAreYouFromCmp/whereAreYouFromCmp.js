import { LightningElement } from "lwc";
/* 
Author: Demen Selcan
Last Updated: July 9th 2021
*/

export default class WhereAreYouFromCmp extends LightningElement {
  renderedCallback() {
    var currentCommunityURL = window.location.href;
    // checking if the community is using multiple languages. Only if it's enabled the "language=" index is in the url
    // if not, nothing will get executed and a log messages is being logged
    if (
      currentCommunityURL.indexOf("?language=") != -1 &&
      window.Storage !== "undefined"
    ) {
      var usersBrowserLanguage =
        navigator.language.slice(0, 2) || navigator.userLanguage.slice(0, 2);

      // get the communities current default language by reducing the url to the language iso code e.g. de
      var communityDefaultLanguage = currentCommunityURL
        .split("?language=")
        .pop()
        .slice(0, 2);

      //checking if the users browser language equals the communites guest user language
      var usersBrowserLanguageEqualsCommunityLanguage =
        usersBrowserLanguage == communityDefaultLanguage;
      var urlStringWithOutLanguage = currentCommunityURL.split("?");

      //Removing the country specification in browser language to only get the language parameter (first two characters) e.g. de-DE, de-AT or de-BE will result to de only
      var browserLanguageFirstTwoCharacters = usersBrowserLanguage.slice(0, 2);

      //Building the new URL
      var setCommunityURLToBrowserDefaultLanguage =
        urlStringWithOutLanguage[0] +
        "?language=" +
        browserLanguageFirstTwoCharacters;
      // browser session storage used as a static variable to allow users to manually change language after the browser defaulted it initially and to prevent constant loop
      var componentLoadedSessionStorage = window.localStorage.getItem(
        "whereAreYouFromLoaded"
      );

      //If the users browser language doesn't equal the default guest user pages language redirect user to new URL and set to browser language
      if (
        !usersBrowserLanguageEqualsCommunityLanguage &&
        !componentLoadedSessionStorage
      ) {
        window.location.href = setCommunityURLToBrowserDefaultLanguage;
        /* sets the local storage to true which will prevent a constant reloading to browser
          language if user manually switched the language via the language selector */
        window.localStorage.setItem("whereAreYouFromLoaded", true);
      }
    } else {
      console.log(
        "This Community does not have multiple languages enabled currently. This is why whereAreYouFromCmp did not run"
      );
    }
  }
}
