// const R = require('ramda')
const webpush = require("web-push");

const SubscribeDomain = require("../../domains/general/subscribe");
const database = require("../../database");

const subscribeDomain = new SubscribeDomain();

const add = async (req, res, next) => {
  const subscription = req.body;

  const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

  webpush.setVapidDetails(
    "mailto:teste@test.com",
    publicVapidKey,
    privateVapidKey
  );

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push Test" });

  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.log("sendNotification" + err));

  const transaction = await database.transaction();
  try {
    const subscribe = await subscribeDomain.add(subscription, { transaction });

    await transaction.commit();
    res.json(subscribe);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
  // const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  // const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

  // webpush.setVapidDetails(
  //   "mailto:teste@test.com",
  //   publicVapidKey,
  //   privateVapidKey
  // );

  // res.status(201).json({});

  // const payload = JSON.stringify({ title: "Push Test" });

  // webpush
  //   .sendNotification(subscription, payload)
  //   .catch(err => console.log("sendNotification" + err));
};

const push = async (req, res, next) => {
  const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

  const transaction = await database.transaction();
  try {
    const subscribes = await subscribeDomain.getAll({
      transaction
    });

    webpush.setVapidDetails(
      "mailto:teste@test.com",
      publicVapidKey,
      privateVapidKey
    );

    res.status(201).json({});

    const payload = JSON.stringify({ title: "Push Test" });

    subscribes.map(subscription => {
      webpush
        .sendNotification(subscription, payload)
        .catch(err => console.log("sendNotification" + err));
    });

    await transaction.commit();
    res.json(subscribe);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
  // const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  // const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

  // webpush.setVapidDetails(
  //   "mailto:teste@test.com",
  //   publicVapidKey,
  //   privateVapidKey
  // );

  // res.status(201).json({});

  // const payload = JSON.stringify({ title: "Push Test" });

  // webpush
  //   .sendNotification(subscription, payload)
  //   .catch(err => console.log("sendNotification" + err));
};

module.exports = {
  add,
  push
};
