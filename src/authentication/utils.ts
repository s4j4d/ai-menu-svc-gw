// export const decodeAwatBase64 = (password) => {
//   const r = password.substring(5).slice(0, -5);
//   return Buffer.from(r, 'base64').toString('utf8');
// };

export const decodeBase64 = (password) => {
  return Buffer.from(password, 'base64').toString('utf8');
};
