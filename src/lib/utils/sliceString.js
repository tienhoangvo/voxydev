const sliceString = ({ text, maxlength = 100 }) => {
  if (text.length <= maxlength) return text;

  return `${text.slice(0, maxlength - 4)}...`;
};

export default sliceString;
