function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function logMatrix(matrixLikeArray) {
  matrixLikeArray.forEach((subArr, idx) => {
    console.log(idx, subArr.join(' '));
  });
  console.warn(new Array(100).fill('*').join(''));
}

export {randomInt, logMatrix};
