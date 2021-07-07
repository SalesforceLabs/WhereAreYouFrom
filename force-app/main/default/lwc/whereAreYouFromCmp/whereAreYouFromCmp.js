import { LightningElement } from "lwc";
/* 
Author: Demen Selcan
Last Updated: July 7th 2021
*/

// TO-DO: Need to add logic in case language isn't defined
//DONE: By checking if "language=" exists in url
// TO-DO: Check URL of Community to see if languages are activated. This will be needed to run further logic
//DONE: this is how the url looks like if language is enabled https://sandbox-ruby-agility-6929-17a821ff559.cs77.force.com/s/?language=en_US (/s/?language= is FIXED)
// TO-DO: Check if browser and user language have more than two characters before slicing. This will ensure that always the iso code is being used
//DONE: No need. We can use the slice method .slice(0,2) which will trim all characters after the second index for example en_US will result in en but en will stay en
//TO-DO: Check if we can test community based logic via jest

export default class WhereAreYouFromCmp extends LightningElement {
  renderedCallback() {
    var currentCommunityURL = window.location.href;
    // checking if the community is using multiple languages. Only if it's enabled the "language=" index is in the url
    // if not, nothing will get executed and a log messages is being logged
    if (currentCommunityURL.indexOf("language=") != -1) {
      var usersBrowserLanguage =
        navigator.language.slice(0, 2) || navigator.userLanguage.slice(0, 2);

      // get the communities current default language by reducing the url to the language iso code e.g. de
      var communityDefaultLanguage = currentCommunityURL
        .split("?language=")
        .pop()
        .slice(0, 2);

      //checking if the users browser language equals the communites guest user language
      var usersBrowserLanguageEqualsCommunityLanguage =
        usersBrowserLanguage.startsWith(communityDefaultLanguage);
      var urlStringWithOutLanguage = currentCommunityURL.split("?");

      //Removing the country specification in browser language to only get the language parameter (first two characters) e.g. de-DE, de-AT or de-BE will result to de only
      var browserLanguageFirstTwoCharacters = usersBrowserLanguage.slice(0, 2);

      //Building the new URL if browser language doesn't equal Community language
      var setCommunityURLToBrowserDefaultLanguage =
        urlStringWithOutLanguage[0] +
        "?language=" +
        browserLanguageFirstTwoCharacters;
      /* browser session storage used as a static variable to allow users to manually
      change language after the browser defaulted it initially */
      var componentLoadedSessionStorage =
        window.sessionStorage.getItem("componentLoaded");

      //If the users browser language doesn't equal the default guest user pages language redirect user to new URL and set to browser language
      if (
        !usersBrowserLanguageEqualsCommunityLanguage &&
        !componentLoadedSessionStorage
      ) {
        window.location.href = setCommunityURLToBrowserDefaultLanguage;
        /* sets the local storage to true which will prevent a constant reloading to browser
          language if user manually switched the language via the language selector */
        window.sessionStorage.setItem("componentLoaded", true);
      }
    } else {
      console.log(
        "This Community does not have multiple languages enabled currently. This is why whereAreYouFromCmp did not run"
      );
    }
  }
}
