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

export default getCountBy;