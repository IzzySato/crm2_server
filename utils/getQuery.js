/**
 * handling base query using params values
 * if cache, return cache values
 * @param model database Model e.g JobModel
 * @param params pageNum: number, length: number, sortBy: string, fields: string, searchBy: string
 * @param filterByArray string[] Model fields
 * @param isCache boolean return cache value or database value
 * @returns object { data, total } data is filtered data and total is not filtered data total
 */
const getDatabaseQuery = async ({
  model,
  params,
  filterByArray = [],
  isCache = false,
}) => {
  const pageNum = parseInt(params.pageNum) > 0 ? parseInt(params.pageNum) : 1;
  const length = parseInt(params.length) > 0 ? parseInt(params.length) : 10;
  const sortBy = params.sortBy || '_id';
  const searchBy = params.searchBy || '';

  const filterConditions = filterByArray.map((name) => ({
    [name]: { $regex: params.searchBy, $options: 'i' },
  }));
  const findObj = searchBy === '' ? {} : { $or: filterConditions };
  const baseQuery = model.where({ deletedAt: null }).find(findObj);
  const total = await model.where({ deletedAt: null }).countDocuments();
  let query = baseQuery
    .skip((parseInt(pageNum) - 1) * parseInt(length))
    .sort(sortBy)
    .limit(parseInt(length));
  if (params.fiels) {
    query = query.select(params.fields);
  }
  if (isCache) {
    const cacheKey = `${model.modelName}_${searchBy}_${pageNum}_${params.fields}_${length}_${sortBy}`;
    const data = await query.cache(cacheKey);
    return { data, total };
  }
  const data = await query;
  return { data, total };
};

module.exports = {
  getDatabaseQuery,
};
