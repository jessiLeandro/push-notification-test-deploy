/* eslint-disable max-len */
const R = require("ramda");

const database = require("../../../database");

const { FieldValidationError } = require("../../../helpers/errors");

const Subscribe = database.model("subscribe");

module.exports = class SubscribeDomain {
  async add(bodyData, options = {}) {
    const { transaction = null } = options;

    const subscribe = R.omit(["id"], bodyData);

    const subscribeNotHasProp = prop => R.not(R.has(prop, subscribe));

    const field = {
      endpoint: false,
      expirationTime: false,
      p256dh: false,
      auth: false
    };
    const message = {
      endpoint: "",
      expirationTime: "",
      p256dh: "",
      auth: ""
    };

    let errors = false;

    if (subscribeNotHasProp("endpoint") || !subscribe.endpoint) {
      errors = true;
      field.endpoint = true;
      message.endpoint = "Por favor informar endpoint";
    }

    if (subscribeNotHasProp("keys") || !subscribe.keys.p256dh) {
      errors = true;
      field.keys = true;
      message.keys = "Informe o keys.";
    } else {
      if (!subscribe.keys.p256dh) {
        errors = true;
        field.p256dh = true;
        message.p256dh = "Informe o p256dh.";
      } else {
        subscribe.p256dh = subscribe.keys.p256dh;
      }

      if (!subscribe.keys.auth) {
        errors = true;
        field.auth = true;
        message.auth = "Informe a auth.";
      } else {
        subscribe.auth = subscribe.keys.auth;
      }
    }

    if (errors) {
      throw new FieldValidationError([{ field, message }]);
    }

    const subscribeCreated = Subscribe.create(subscribe, { transaction });

    return subscribeCreated;
  }
};
