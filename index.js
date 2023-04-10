const { getData, getFile, getClearFile, getClearData } = require("./utils");

const data = getData();
const file = getFile();
const clearFile = getClearFile();
const clearData = getClearData();

const getNoMatchCards = (findCard, allCards) => {
  const noMatch = allCards.filter(
    (checkWith) =>
      !findCard.some((item) =>
        checkWith.some((checkItem) => checkItem === item)
      )
  );

  return { findCard, noMatch };
};
const allCardsHasMatch = (cards) => {
  const noMatchAll = cards
    .map((findFor) => getNoMatchCards(findFor, cards))
    .filter(({ noMatch }) => Boolean(noMatch?.length));

  return !Boolean(noMatchAll?.length);
};

const countObjs = (cards) => {
  const itemCount = {};

  cards.forEach((card) => {
    card.forEach((item) => {
      if (item) {
        const prevValue = itemCount[item] || 0;
        itemCount[item] = prevValue + 1;
      }
    });
  });

  return itemCount;
};

const getTopList = (data) => {
  const counted = countObjs(data);
  const asArr = Object.keys(counted);

  const top = asArr.map(key => [key, counted[key]]).sort(([, prevVal], [, val]) => val - prevVal)
  return top
}

const getTopListByNumber = data => {
  const topList = getTopList(data);
  const obj = {};

  topList.forEach(
    ([key, val]) => {
      const curr = obj[val] || [];
      curr.push(key);

      obj[val] = curr
    }
  )

  return obj;
}

const getCards = data => {
  const dt = getTopListByNumber(data);

  let mapped = [];
  Object.values(dt).forEach((values) => {
    mapped = [...mapped, ...values];
  })

  return mapped;
}

const getMapper = data => {
  const mapper = getCards(data);
  const obj = {};

  
  for(let i = 0; mapper.length > i; i++) {
    const key = mapper[i];
    obj[key] = `ITEM_${i}`;
  }

  return obj;
}

const getStructure = (data, txt) => {
  const mp = getMapper(data);
  txt = `,-,-,${txt.replaceAll("\n", ",-,")},-,-,`
  Object.keys(mp).forEach(key => {
    txt = txt.replaceAll(`,${key},`, `,${mp[key]},`)
  })
  return txt.replaceAll(",-,-,", "").replaceAll(",-,", "\n")
}

const analizedData = {
  matchAll: `Todas las cards tienen coicidencias? ${allCardsHasMatch(data)}`,
  topList: getTopListByNumber(data),
  cards: getCards(data),
}

const analizedClear = {
  matchAll: `Todas las cards tienen coicidencias? ${allCardsHasMatch(clearData)}`,
  topList: getTopListByNumber(clearData),
  cards: getCards(clearData),
}


console.warn("INFO:", JSON.stringify({analizedData, analizedClear}));
