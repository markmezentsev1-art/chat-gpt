const arr = [1, 3, 5];
const result = sumNumbers(arr);
function sumNumbers(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
console.log(result); // 9
