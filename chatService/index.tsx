import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";

const COMETCHAT_CONSTANTS = {
  APP_ID: "APP_ID", //Replace with your App ID
  REGION: "REGION", //Replace with your App Region
  AUTH_KEY: "AUTH_KEY", //Replace with your Auth Key or leave blank if you are authenticating using Auth Token
};

//create the builder
const UIKitSettings: UIKitSettingsBuilder = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

//Initialize CometChat UI Kit
CometChatUIKit.init(UIKitSettings)
  .then(() => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  })
  .catch(console.log);