export const ivaRankingsCalc = (cuit) => {
  const dataRank = {
    1: {
      from: 0,
      to: 1,
    },
    2: {
      from: 2,
      to: 3,
    },
    3: {
      from: 4,
      to: 5,
    },
    4: {
      from: 6,
      to: 7,
    },
    5: {
      from: 8,
      to: 9,
    },
  };

  const lastDigit = cuit.toString().slice(-1);
  let ranking = null;
  for (const key in dataRank) {
    if (lastDigit >= dataRank[key].from && lastDigit <= dataRank[key].to) {
      ranking = key;
      break;
    }
  }
  return ranking;
};

export const socialSecurityRankingsCalc = (cuit) => {
  const dataRank = {
    1: {
      from: 0,
      to: 3,
    },
    2: {
      from: 4,
      to: 6,
    },
    3: {
      from: 7,
      to: 9,
    },
  };

  const lastDigit = cuit.toString().slice(-1);
  let ranking = null;
  for (const key in dataRank) {
    if (lastDigit >= dataRank[key].from && lastDigit <= dataRank[key].to) {
      ranking = key;
      break;
    }
  }
  console.log('ranking :>> ', ranking);
  return ranking;
};

export const domesticRankingsCalc = (cuit) => {
  const dataRank = {
    1: {
      from: 0,
      to: 9,
    },
  };

  const lastDigit = cuit.toString().slice(-1);
  let ranking = null;
  for (const key in dataRank) {
    if (lastDigit >= dataRank[key].from && lastDigit <= dataRank[key].to) {
      ranking = key;
      break;
    }
  }
  return ranking;
};
