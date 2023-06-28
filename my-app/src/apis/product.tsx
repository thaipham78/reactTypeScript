async function getLists(_limit: string, _skip: string) {
  let limit: string = _limit;
  let skip: string = _skip;
  console.log(skip);
  
  let url: string = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  const response = await fetch(url);
  return response.json(); 
}

async function search(data:any,_limit: string, _skip: string) {
  console.log(data);
  let limit: string = _limit;
  let skip: string = _skip;
  let name: string = data.sItem;
  let url: string = `https://dummyjson.com/products?q=${name}&limit=${limit}&skip=${skip}`;

  const response = await fetch(url);
  return response.json(); 
}

export { getLists, search };
