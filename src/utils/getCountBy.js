import _ from 'lodash'

function getCountBy({ data, countByField, omitThem = [] }) {
    // console.log(data);
    //  console.log("called: getCountBy");
    const countData = _.countBy(data, countByField);
    const omitedData = _.omit(countData, [...omitThem])
    return Object.entries(omitedData).map(([item, count]) => ({
        item,
        count
    }));
    // console.log(omitedData);
}

//get total by group for example: get total expense by expense catgory
export const getTotalByGroup = (data, groupKey, sumKey, defaultGroup = "Other") => {
  return data.reduce((acc, curr) => {
    const group = curr[groupKey] || defaultGroup;
    const value = Number(curr[sumKey]) || 0;

    if (!acc[group]) acc[group] = 0;
    acc[group] += value;

    return acc;
  }, {});
};

export default getCountBy;