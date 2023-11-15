const wrapTitle = function wrapInBracketsWithTitle(str) {
  if(typeof str !== 'string') throw new Error('[ERROR] 잘못된 형태의 제목입니다. 관리자에게 문의하세요.');
  return `<${str}>`;
}

export default wrapTitle;