export async function* BubbleSort(array, swap, highlight, marksort, algoIdx) {
  for (let i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length - i - 1; j++) {
      yield await highlight([j, j + 1]);
      if (algoIdx !== 0) return;
      console.log('algo1 in bubble..', algoIdx);
      if (array[j] > array[j + 1]) {
        yield await swap(j, j + 1);
      }
    }

    marksort(j);
    yield;
  }
}
