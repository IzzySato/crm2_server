const customerResultSchema = (customerDoc) => {
  return {
    id: customerDoc._id,
    firstName: customerDoc.firstName,
    lastName: customerDoc.lastName,
    email: customerDoc.email,
    phone: customerDoc.phone,
    email: customerDoc.email,
    addresses: customerDoc.addresses,
    tags: customerDoc.tags,
    companyId: customerDoc.companyId,
    createdAt: customerDoc.createdAt,
    deletedAt: customerDoc.deletedAt,
  };
};

module.exports = customerResultSchema;
