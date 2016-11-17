'use strict';

class Messenger {
  constructor(cementHelper, logger) {
    this.cementHelper = cementHelper;
    this.logger = logger;
  }

  acknowledgeMessage(ackId) {
    const that = this;
    return new Promise((resolve, reject) => {
        const sentContext = that.cementHelper.createContext({
          nature: {
            type: 'message',
            quality: 'acknowledge'
          },
          payload: {
            id: ackId
          }
        });
    sentContext.on('done', (brickName, response) => {
      resolve({
        returnCode: 'done',
      brickName: brickName,
      response: response
  });
  });
    sentContext.on('reject', (brickName, err) => {
      reject({
        returnCode: 'reject',
      brickName: brickName,
      response: err
  });
  });
    sentContext.on('error', (brickName, err) => {
      reject({
        returnCode: 'error',
      brickName: brickName,
      response: err
  });
  });
    sentContext.publish();
  });
  }
}

module.exports = Messenger;