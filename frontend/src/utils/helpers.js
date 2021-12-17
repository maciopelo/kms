// 1. removes if text contains at least 2 or more extra newline charaters
// 2. automatically begins 'text' first character uppercase
// 3. maps newline characters: '\n' --> <br/>
// 4. handles proper syntax such as one white space after comma  e.g. 'text, text'

export const parseText = (text) => {
  console.log(text.replace(/\s+/g, ""));
  console.log(text.replace(/\s+/g, ""));
  return text
    .replace(/\s+!/g, "! ")
    .replace(/\s+\?/g, "? ")
    .replace(/\s+\./g, ". ")
    .replace(/\s+,/g, ", ")
    .replace(/,/g, ", ")
    .replace(/\s+:/g, ": ")
    .replace(/-/g, " - ")
    .replace(/(\r\n|\r|\n){1}/g, "$1")
    .replace(/(\r\n|\r|\n){2,}/g, "$1\n")
    .split("\n")
    .map((line, idx) => {
      let parsedLine = line;

      if (idx === 0)
        parsedLine = `${line[0].toUpperCase()}${line.substring(1)}`;

      return (
        <span>
          {parsedLine}
          <br />
        </span>
      );
    });
};
