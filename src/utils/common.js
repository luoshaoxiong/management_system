function isAttrExisting (objArr, attrName, attrVal) {
  return objArr.some(item => item[attrName] === attrVal);
}

function findAttrObjects (objArr, attrName, attrVal) {
  return objArr.filter(item => item[attrName] === attrVal);
}

export {
  isAttrExisting,
  findAttrObjects
};
