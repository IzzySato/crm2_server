const addressResultSchema = (addressDoc) => {
  return {
    id: addressDoc._id,
    name: addressDoc.name,
    line1: addressDoc.line1,
    line2: addressDoc.line2,
    city: addressDoc.city,
    province: addressDoc.province,
    postalCode: addressDoc.postalCode,
    active: addressDoc.active,
    default: addressDoc.default,
    createdAt: addressDoc.createdAt,
    deletedAt: addressDoc.deletedAt
  };
};

module.exports = addressResultSchema;