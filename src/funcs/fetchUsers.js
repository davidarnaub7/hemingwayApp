const getUsers = async (
  roomID,
  myUsername,
  refresh,
  creds,
  axiosApiInstance,
) => {
  let requestBody = {
    operationName: 'GetUsers',
    query: `query GetUsers{
              fetchUsers(roomID:"${roomID}", username: "${myUsername}", refresh:${refresh}){
                username
                image
                bck
                socialNetworks{
                  Instagram
                  Twitter
                  Facebook
                  Tiktok
                }
                name
              }
              }`,
  };

  try {
    return await axiosApiInstance
      .post('http://192.168.1.38:3000/graphql', JSON.stringify(requestBody), {
        headers: {
          Authorization: 'Bearer ' + creds.token + ' ' + myUsername,
          'Content-Type': 'application/json',
        },
      })
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
        //In case there are no data with set a flah that the are no more users.
        return resData;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
};

export default getUsers;
