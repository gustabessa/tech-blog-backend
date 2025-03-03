export function checkAscendingNumericSequence(dto: {
  text: string;
  sequenceLength: number;
}): boolean {
  const { text, sequenceLength } = dto;
  const numbersInSequenceRegExp = new RegExp(
    `(?=(\\d{${sequenceLength}}))`,
    'g',
  );
  const numericSequenceMatches = text.matchAll(numbersInSequenceRegExp);

  for (const [_, textNumericSequence] of numericSequenceMatches) {
    const numericSequence = textNumericSequence.split('').map(Number);
    const isAscendingSequence = numericSequence.every(
      (number, index) =>
        index === 0 || number === numericSequence[index - 1] + 1,
    );

    if (isAscendingSequence) {
      return true;
    }
  }

  return false;
}
