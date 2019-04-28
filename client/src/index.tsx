import React from "react";
import ReactDOM from "react-dom";
import App, { updateSubscriptionOnServer } from "./Components/App";

ReactDOM.render(<App />, document.getElementById("root"));

const applicationServerPublicKey =
  "BGjZFd-ip3g-r6TQ7Rxkt89KW3LpOUQ7dNyP2h0_ZFEXL1mrk0-p6qE-sPWUPpEHA8VoGrs3rK2vdNKFjsCN1w4";

const pushButton: HTMLButtonElement | null = document.querySelector("#button");

let isSubscribed = false;
let swRegistration: ServiceWorkerRegistration | null = null;

function urlB64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");

  navigator.serviceWorker
    .register("sw.js")
    .then(function(swReg) {
      console.log("Service Worker is registered", swReg);

      swRegistration = swReg;
      initializeUI();
    })
    .catch(function(error) {
      console.error("Service Worker Error", error);
    });
} else {
  console.warn("Push messaging is not supported");
  if (pushButton) {
    pushButton.textContent = "Push Not Supported";
  }
}

function initializeUI() {
  if (pushButton) {
    pushButton.addEventListener("click", function() {
      pushButton.disabled = true;
      if (isSubscribed) {
        // TODO: Unsubscribe user
      } else {
        subscribeUser();
      }
    });
  }

  // Set the initial subscription value
  if (swRegistration) {
    swRegistration.pushManager.getSubscription().then(function(subscription) {
      isSubscribed = !(subscription === null);

      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log("User IS subscribed.");
      } else {
        console.log("User is NOT subscribed.");
      }

      updateBtn();
    });
  }
}

function updateBtn() {
  if (pushButton) {
    if (Notification.permission === "denied") {
      pushButton.textContent = "Push Messaging Blocked.";
      pushButton.disabled = true;
      updateSubscriptionOnServer(null);
      return;
    }

    if (isSubscribed) {
      pushButton.textContent = "Disable Push Messaging";
    } else {
      pushButton.textContent = "Enable Push Messaging";
    }

    pushButton.disabled = false;
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  if (swRegistration) {
    swRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(subscription) {
        console.log("User is subscribed.");

        updateSubscriptionOnServer(subscription);

        isSubscribed = true;

        updateBtn();
      })
      .catch(function(err) {
        console.log("Failed to subscribe the user: ", err);
        updateBtn();
      });
  }
}
