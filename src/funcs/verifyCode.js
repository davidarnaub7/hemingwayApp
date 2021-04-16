import Axios from 'axios';

const verifyCode = async (email, token) => {
  /**
   * API CALLS AND QUERIES
   */
  let verifyCodeBody = {
    operationName: 'VerifyCode',
    query: `query VerifyCode
    {
      verifyCode(email: "${email}", token:"${token}" )
    }`,
    variables: null,
  };

  return await Axios.post(
    'http://192.168.1.37:3000/graphql',
    JSON.stringify(verifyCodeBody),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }

      if (res.data.errors) {
        throw new Error(res.data.errors[0].message);
      }

      return res.data.data;
    })
    .then((resData) => {
      return resData;
    });
};

export default verifyCode;
