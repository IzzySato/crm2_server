const jobResultSchema = (jobDoc) => {
  return {
    id: jobDoc._id,
    jobType: jobDoc.jobType,
    note: jobDoc.note,
    state: jobDoc.state,
    startDate: jobDoc.startDate,
    endDate: jobDoc.endDate,
    products: jobDoc.products,
    companyId: jobDoc.companyId,
    createdAt: jobDoc.createdAt,
    deletedAt: jobDoc.deletedAt
  };
};

module.exports = jobResultSchema;