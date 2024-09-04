const productResultSchema = (productDoc) => {
  return {
    id: productDoc._id,
    name: productDoc.name,
    sku: productDoc.sku,
    categoryTags: productDoc.categoryTags,
    description: productDoc.description,
    imageUrl: productDoc.imageUrl,
    companyId: productDoc.companyId,
    createdAt: productDoc.createdAt,
    deletedAt: productDoc.deletedAt,
  };
};

module.exports = productResultSchema;
