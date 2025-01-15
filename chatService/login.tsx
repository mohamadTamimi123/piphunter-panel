import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const authToken = "AUTH_TOKEN";

CometChatUIKit.getLoggedinUser()
  .then((user) => {
    if (!user) {
      //Login user
      CometChatUIKit.loginWithAuthToken(authToken)
        .then((user) => {
          console.log("Login Successful:", { user });
          //mount your app
        })
        .catch(console.log);
    } else {
      //user already logged in
      //mount your app
    }
  })
  .catch(console.log);

