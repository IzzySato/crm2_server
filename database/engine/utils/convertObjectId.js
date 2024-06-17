'use strict';
const { ObjectId } = require("mongodb")

const convertIdStringToObjectId = (id = '') => {
  return new ObjectId(id);
};

module.exports = {
  convertIdStringToObjectId
};