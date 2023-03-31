export const isRequired = (Schema, field) => {
  return Schema?.fields[field]?.exclusiveTests?.required || false;
};

export const accountingFormat = (number) => {
  if (typeof number != "number") {
    if (isNaN(Number(number))) {
      return null;
    } else {
      return accountingFormat(Number(number));
    }
  }

  if (number === 0) {
    return "-";
  }
  const valueStr = Math.abs(number).toFixed(2);
  let [whole, fraction] = valueStr.split(".");
  let WholeList = [];
  while (whole.length > 3) {
    WholeList.unshift(whole.slice(whole.length - 3));
    whole = whole.substring(0, whole.length - 3);
  }

  WholeList.unshift(whole);

  if (number < 0) {
    return `(${WholeList.join(",")}.${fraction})`;
  }

  return `${WholeList.join(",")}.${fraction}`;
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
