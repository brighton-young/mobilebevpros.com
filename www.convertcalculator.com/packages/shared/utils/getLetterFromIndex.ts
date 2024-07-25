const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getLetterFromIndex = (index: number): string => {
  if (typeof index !== 'number' || index < 0) {
    throw new Error(
      `Index should be a number, zero or bigger, not: '${typeof index}'`,
    );
  }

  let quotient = index + 1;
  const letters = [];

  while (quotient !== 0) {
    const remainder = (quotient - 1) % alphabet.length;
    quotient = Math.trunc((quotient - 1) / alphabet.length);

    const letter = alphabet[remainder];

    letters.unshift(letter);
  }

  return letters.join('');
};

export default getLetterFromIndex;
