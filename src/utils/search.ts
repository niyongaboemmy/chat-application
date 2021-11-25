const search = (objList: any[], text: any, keys: any = null) => {
  if (undefined === text || text === "") return objList;
  return objList.filter((product) => {
    let flag;
    let dataKeys = keys === null ? product : keys;
    for (let prop in dataKeys) {
      flag = false;
      flag =
        product[prop].toString().toLowerCase().indexOf(text.toLowerCase()) > -1;
      if (flag) break;
    }
    return flag;
  });
};

export default search;
