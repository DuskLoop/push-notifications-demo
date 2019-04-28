/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: saveSubscription
// ====================================================

export interface saveSubscription_saveSubscription {
  __typename: "User";
  id: string;
  name: string;
  subscriptions: any[];
}

export interface saveSubscription {
  saveSubscription: saveSubscription_saveSubscription;
}

export interface saveSubscriptionVariables {
  userId: string;
  subscription: any;
}
