export const checkSocial = (social) => {
  return !(
    //INVERSE CONDITION
    (
      social.Instagram.trim() === '' &&
      social.Facebook.trim() === '' &&
      social.Twitter.trim() === ''
    )
  );
};
