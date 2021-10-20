function getQueryStringFromData<T>(data: T) {
  if (Object.keys(data).length > 0) {
    const queryList = [];
    Object.keys(data).forEach((key, index) => {
      if (data[key] instanceof Array) {
        (data[key] as Array<string>).forEach(a =>
          queryList.push(`${key}=${a}`)
        );
      } else {
        queryList.push(`${key}=${data[key]}`);
      }
    });
    return `?${queryList.join('&')}`;
  } else {
    return '';
  }
}

export default getQueryStringFromData;
