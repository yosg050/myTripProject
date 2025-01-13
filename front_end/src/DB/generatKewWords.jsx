const generateKewWords = (str) => {
  const kewWord = [];
  const lowercaseStr = str.toLowerCase();

  for (let i = 0; i <= lowercaseStr.length; i++) {
    for (let j = i + 1; j <= lowercaseStr.length; j++) {
      kewWord.push(lowercaseStr.slice(i, j));
    }
  }
  const setKewWord = [...new Set(kewWord)] ;
  console.log(setKewWord);
  
  return setKewWord;
};

export default generateKewWords
