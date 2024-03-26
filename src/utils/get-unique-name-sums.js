const getUniqueNameSums = (data) => {
  return data.reduce((acc, obj) => {
    acc[obj.name] = (acc[obj.name] || 0) + obj.percentage
    
    return acc
  }, {})
}

export default getUniqueNameSums
