// Функция, переворачивающая строку
function reverseString (string) {
  let reversedString;
  let n;

  reversedString = '';
  n = string.length - 1;

  while (string[n]) {
    reversedString = reversedString + string[n];
    n--;
  }

  return (reversedString);
}

// Функция проверки палиндрома
function checkPalindrome (string) {
  let newString;
  let reversedString;

  newString = string.replaceAll(' ', '');
  newString = newString.toLowerCase();
  reversedString = reverseString(newString);

  return (reversedString == newString);
}

// Функция, извлекающая цифры из строки или числа, и возвращающая целое положительное число
function searchNumber (string) {
  let i;
  let numbers;
  let newString;

  i = 0;
  numbers = '';

  if (typeof(string) == 'number') {
    newString = string.toString();
  } else {
    newString = string;
  }
  while (newString[i]) {
    if (newString[i] == '1' || newString[i] == '2' || newString[i] == '3' || newString[i] == '4' || newString[i] == '5' || newString[i] == '6' || newString[i] == '7' || newString[i] == '8' || newString[i] == '9' || newString[i] == '0') {
      numbers = numbers + newString[i];
    }
    i++;
  }

  return (parseInt(numbers));
}

// Функция по типу работы padStart()
function strPad (input, len, string) {
  if (input.length >= len) {
    return (input);
  }

  let n;
  let newString;
  let i;

  i = 0;
  n = 0;
  newString = '';
  while (n < (len - input.length)) {
    if (string[i]) {
      newString = newString + string[i];
      i++;
    } else {
      i = 0;
      newString = newString + string[i];
      i++;
    }
    n++;
  }
  newString = newString + input;

  return (newString);
}

// Функция проверки длины строки (true, если длина строки <= переданному числу)
function strLenCheck(string, len) {
  if (string.length <= len) {
    return (true);
  } else {
    return (false);
  }
}

