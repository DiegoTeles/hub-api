const splitOrder = [
  { tipo: { start: 1, end: 1 } },
  { date: { start: 2, end: 26 } },
  { product: { start: 27, end: 56 } },
  { value: { start: 57, end: 66 } },
  { saller: { start: 67, end: 86 } },
];

export async function asyncReadFile(filename: any) {
  try {
    // const contents = await fsPromises.readFile(filename.buffer.toString(), 'utf-8');
    const contents = filename.buffer.toString();

    const arr = contents.split(/\r?\n/);

    const m = arr.map((item: any) => {
      return splitOrder.map((key: any) => {
        const keyValue: any = Object.keys(key);
        const start = key[keyValue].start - 1;
        const end = key[keyValue].end;

        const result = {
          [keyValue]: item.slice(start, end),
        };
        return result;
      });
    });

    const result = normalizeArray(m);
    return result;
  } catch (err) {
    console.log('@@@', err);
  }
}

function normalizeArray(data) {
  try {
    const mapper = data.map((v: any) => {
      const [tipo, date, product, value, saller]: any | string[] =
        Object.values(v);

      const data: any = {
        transactionType: Object.keys(tipo),
        date: Object.keys(date),
        product: Object.keys(product),
        value: Object.keys(value),
        seller: Object.keys(saller),
      };

      return {
        transactionType: tipo[data.transactionType],
        date: date[data.date],
        product: product[data.product],
        value: value[data.value],
        seller: saller[data.seller],
      };
    });

    return mapper;
  } catch (err) {
    console.log('error', err);
  }
}
