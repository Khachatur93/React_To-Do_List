export function formatDate(dateStr = "") {
  return dateStr.slice(0, 10);
}

export function textTruncate(str) {
  if (str.length < 60) {
    return str;
  }
  return str.slice(0, 60) + "  ...";
}
export function titleTruncate(str) {
  if (str.length < 13) {
    return str;
  }
  return str.slice(0, 13) + " ...";
}
export function searchTextTruncate(str) {
  if (str.length < 7) {
    return str;
  }
  return str.slice(0, 7) + "  ...";
}
