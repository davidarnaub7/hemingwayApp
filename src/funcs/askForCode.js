import Axios from 'axios';

const askForCode = async (email, isLogged) => {
  /**
   * API CALLS AND QUERIES
   */
  let requestCreateVerificationBody = isLogged
    ? {
        operationName: 'CreateVerficationCodeChangePasswd',
        query: `mutation CreateVerficationCodeChangePasswd
    {
      createVerficationCodeChangePasswd(email: "${email}")
    }`,
        variables: null,
      }
    : {
        operationName: 'CreateVerficationCode',
        query: `mutation CreateVerficationCode
        {
          createVerficationCode(email: "${email}")
        }`,
        variables: null,
      };
  return await Axios.post(
    '10.20.43.154:3000',
    JSON.stringify(requestCreateVerificationBody),
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
    })
    .catch((err) => {
      throw err;
    });
};

export default askForCode;
