const { eventNames } = require("../configs/constants.config");
const { emitter } = require("./eventEmitter");

const hotelRatingListener = require("./hotelRatings.listener");

emitter.on(
  // eventNames.UPDATE_HOTEL_RATINGS,
  // hotelRatingListener.onNewRatingRecieved
);

module.exports.initializeListeners = () => {
  console.log("Event Listeners are running now");
};
