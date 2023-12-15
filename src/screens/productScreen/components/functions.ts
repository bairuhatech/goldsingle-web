export const getSelectedVariant = (input: any, variants: any[]) => {
  if (
    Array.isArray(variants) == true &&
    typeof input == "object" &&
    input != null
  ) {
    const filteredData = variants.filter((item: any) => {
      if (Array.isArray(item.combination) == true) {
        return (
          input &&
          item.combination.every(
            (combo: any) => input[combo.variant] === combo.value
          )
        );
      } else {
        return [];
      }
    });
    if (filteredData[0]?.id) {
      return { status: true, variant: filteredData[0] };
    } else {
      return { status: false, variant: {} };
    }
  }
  return { status: false, variant: {} };
};
export const getInitialVarient = (array: any[]) => {
  const obj: any = {};
  if (Array.isArray(array) == true) {
    array?.map((item: any, i: number) => {
      if (Array.isArray(item.values)) {
        obj[item.variant] = item.values[0];
      }
    });
  }
  return obj;
};

export const getVarients = (product: any) => {
  const variants = product?.productVariant;
  const variantTypes: any[] = [];
  const mainArray = [];
  if (Array.isArray(variants) && variants.length) {
    for (const item of variants) {
      if (Array.isArray(item?.combination) && item?.combination?.length) {
        for (const comb of item?.combination) {
          if (!variantTypes.includes(comb.variant)) {
            variantTypes.push(comb.variant);
          }
        }
      }
    }
    //looping through each varianttype(size,color,etc)
    for (const type of variantTypes) {
      const array: any[] = [];
      const detailsArray:any[]=[];
      for (const item of variants) {
        if (Array.isArray(item?.combination) && item?.combination?.length) {
          for (const comb of item?.combination) {
            if (type == comb.variant && !array.includes(comb.value)) {
              array.push(comb.value);
              detailsArray.push({...item,value:comb.value})
            }
          }
        }
      }

      mainArray.push({ variant: type, values: array,details:detailsArray });
    }

    return { variants: mainArray, data: variants };
  }
  return { variants: [], data: variants };
};
