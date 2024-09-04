const userResultSchema = (userDoc) => {
  return {
    id: userDoc._id,
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    companyId: userDoc.companyId,
    email: userDoc.email,
    authProviderId: userDoc.authProviderId,
    permissions: userDoc.permissions,
    createdAt: userDoc.createdAt,
    deletedAt: userDoc.deletedAt,
  };
};

module.exports = userResultSchema;