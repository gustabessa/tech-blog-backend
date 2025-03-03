import { checkDescendingNumericSequence } from './check-descending-numeric-sequence';

describe(checkDescendingNumericSequence.name, () => {
  const sequentialNumbers = [
    '321',
    '432',
    '543',
    '654',
    '765',
    '876',
    '987',
    '4321',
    '5432',
    '6543',
    '7654',
    '8765',
    '9876',
    '54321',
    '65432',
    '76543',
    '87654',
    '98765',
  ];

  const makeSequentialNumbersTestCases = (sequentialNumbers: string) => {
    const reversedSequentialNumbers = sequentialNumbers
      .split('')
      .reverse()
      .join('');

    return [
      {
        text: `foo.bar${sequentialNumbers}`,
        sequenceLength: sequentialNumbers.length,
        output: true,
      },
      {
        text: `foo.bar.${sequentialNumbers}`,
        sequenceLength: sequentialNumbers.length,
        output: true,
      },
      {
        text: `foo.bar${reversedSequentialNumbers}`,
        sequenceLength: sequentialNumbers.length,
        output: false,
      },
      {
        text: `${sequentialNumbers}foo.bar`,
        sequenceLength: sequentialNumbers.length,
        output: true,
      },
      {
        text: `${reversedSequentialNumbers}foo.bar`,
        sequenceLength: sequentialNumbers.length,
        output: false,
      },
      {
        text: `foo.${sequentialNumbers}.bar`,
        sequenceLength: sequentialNumbers.length,
        output: true,
      },
      {
        text: `foo.${reversedSequentialNumbers}.bar`,
        sequenceLength: sequentialNumbers.length,
        output: false,
      },
      {
        text: `foo.bar${sequentialNumbers}`,
        sequenceLength: sequentialNumbers.length + 1,
        output: false,
      },
    ];
  };

  const testCases = sequentialNumbers.flatMap(makeSequentialNumbersTestCases);

  it.each(testCases)(
    '[Sequential Numbers] should return $output when text is $text and sequence length is $sequenceLength',
    (args) => {
      const { text, sequenceLength, output } = args;
      const result = checkDescendingNumericSequence({ text, sequenceLength });
      expect(result).toBe(output);
    },
  );

  const nonSequentialNumbers = [
    '245',
    '369',
    '754',
    '182',
    '496',
    '573',
    '681',
    '927',
    '1357',
    '2468',
    '3579',
    '4680',
    '5791',
    '6802',
    '7913',
    '13579',
    '24680',
    '35791',
    '46802',
    '57913',
  ];

  const makeNonSequentialNumbersTestCases = (nonSequentialNumbes: string) => {
    return [
      {
        text: `foo.bar${nonSequentialNumbes}`,
        sequenceLength: nonSequentialNumbes.length,
        output: false,
      },
      {
        text: `foo.bar.${nonSequentialNumbes}`,
        sequenceLength: nonSequentialNumbes.length,
        output: false,
      },
      {
        text: `foo.${nonSequentialNumbes}.bar`,
        sequenceLength: nonSequentialNumbes.length,
        output: false,
      },
      {
        text: `${nonSequentialNumbes}.foo.bar`,
        sequenceLength: nonSequentialNumbes.length,
        output: false,
      },
      {
        text: `${nonSequentialNumbes}foo.bar`,
        sequenceLength: nonSequentialNumbes.length,
        output: false,
      },
      {
        text: `foo.bar${nonSequentialNumbes}`,
        sequenceLength: nonSequentialNumbes.length + 1,
        output: false,
      },
    ];
  };

  const casesWithNonSequentialNumbers = nonSequentialNumbers.flatMap(
    makeNonSequentialNumbersTestCases,
  );

  it.each(casesWithNonSequentialNumbers)(
    '[Non Sequential] should return $output when text is $text and sequence length is $sequenceLength',
    (args) => {
      const { text, sequenceLength, output } = args;
      const result = checkDescendingNumericSequence({ text, sequenceLength });
      expect(result).toBe(output);
    },
  );
});
