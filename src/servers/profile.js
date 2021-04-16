/**
 * CONSTANTS
 */
let followers = [];
let followings = [];

let noMore = false;
let index = 0;

const INIT_BATCHES = 10;
const BATCHES = 10;
/**
 * @func getUsers
 *
 * Calling to API in order to get the users in the room
 */

const fetchFollowers = async (
  refreshItems,
  axiosApiInstance,
  roomID,
  username,
  coords,
  creds,
) => {
  //AXIOS INTERCERPTOR
  // Response interceptor for API calls
  let requestBody = {
    operationName: 'GetFollowers',
    query: `query GetFollowers{
              geMyFollowers(username: "${username}", ){
                user{
                    _id
                     username
                     name
                     followers
                     following
                     posts
                     likes
                     image
                     privateInfo{
                       email
                       telephone
                     }
                 }
                 urls{
                   imgUrl
                 }
              }`,
  };

  try {
    return await axiosApiInstance
      .post('http://192.168.1.37:3000/graphql', JSON.stringify(requestBody), {
        headers: {
          Authorization: 'Bearer ' + creds.token + ' ' + username,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }

        if (res.data.errors) {
          throw new Error(res.data.errors[0].message);
        }

        return res.data.data;
      })
      .then(resData => {
        const fetchedUsers = resData.geMyFollowers.users;

        //In case there are no data with set a flah that the are no more users.
        if (
          fetchedUsers.length === 0 ||
          (refreshItems && fetchedUsers.length < 6)
        ) {
          followers = [];
          noMore = true;
        }
        if (refreshItems) {
          followers = [...fetchedUsers];
          noMore = false;
        } else {
          if ([...followers, ...fetchedUsers].length <= 4) {
            // if lower or equal four we want to prevent from repeat elements.
            const newUsers = [...followers, ...fetchedUsers].filter(
              (item, ind) => followers.indexOf(item) === ind,
            );
            followers = [...newUsers];
          } else {
            followers = [...followers, ...fetchedUsers];
          }
        }
        const returnUsers = followers.slice(
          index,
          index + (refreshItems ? INIT_BATCHES : BATCHES),
        );
        index = index + (refreshItems ? INIT_BATCHES : BATCHES);
        return returnUsers;
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
};
const fetchFollowing = async (
  refreshItems,
  axiosApiInstance,
  roomID,
  username,
  coords,
  creds,
) => {
  //AXIOS INTERCERPTOR
  // Response interceptor for API calls
  let requestBody = {
    operationName: 'GetFollowings',
    query: `query GetFollowings{
              getFollowings(username: "${username}", ){
                user{
                    _id
                     username
                     name
                     followers
                     following
                     posts
                     likes
                     image
                     privateInfo{
                       email
                       telephone
                     }
                 }
                 urls{
                   imgUrl
                 }
              }`,
  };

  try {
    return await axiosApiInstance
      .post('http://192.168.1.37:3000/graphql', JSON.stringify(requestBody), {
        headers: {
          Authorization: 'Bearer ' + creds.token + ' ' + username,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }

        if (res.data.errors) {
          throw new Error(res.data.errors[0].message);
        }

        return res.data.data;
      })
      .then(resData => {
        const fetchedUsers = resData.getFollowings.users;

        //In case there are no data with set a flah that the are no more users.
        if (
          fetchedUsers.length === 0 ||
          (refreshItems && fetchedUsers.length < 6)
        ) {
          followings = [];
          noMore = true;
        }
        if (refreshItems) {
          followings = [...fetchedUsers];
          noMore = false;
        } else {
          if ([...followings, ...fetchedUsers].length <= 4) {
            // if lower or equal four we want to prevent from repeat elements.
            const newUsers = [...followings, ...fetchedUsers].filter(
              (item, ind) => followings.indexOf(item) === ind,
            );
            followings = [...newUsers];
          } else {
            followings = [...followings, ...fetchedUsers];
          }
        }
        const returnUsers = followings.slice(
          index,
          index + (refreshItems ? INIT_BATCHES : BATCHES),
        );
        index = index + (refreshItems ? INIT_BATCHES : BATCHES);
        return returnUsers;
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
};

const getUsersHandler = async (
  refreshItems,
  axiosApiInstance,
  username,
  creds,
  people,
  flag,
) => {
  if (flag === 'followers') {
    getFollowers(refreshItems, axiosApiInstance, username, creds);
  } else {
    getFollowing(refreshItems, axiosApiInstance, username, creds);
  }
};

const getFollowers = async (
  refreshItems,
  axiosApiInstance,
  username,
  creds,
) => {
  if (refreshItems) {
    index = 0;
    return await fetchFollowers(
      refreshItems,
      axiosApiInstance,
      username,
      creds,
    );
  } else {
    const newUsers = followers.slice(index, index + BATCHES);

    if (newUsers.length !== 0) {
      return [...newUsers];
    } else if (!noMore) {
      return await fetchFollowers(
        refreshItems,
        axiosApiInstance,
        username,
        creds,
      );
    }
  }
};

const getFollowing = async (
  refreshItems,
  axiosApiInstance,
  username,
  creds,
) => {
  if (refreshItems) {
    index = 0;
    return await fetchFollowing(
      refreshItems,
      axiosApiInstance,
      username,
      creds,
    );
  } else {
    const newUsers = followings.slice(index, index + BATCHES);

    if (newUsers.length !== 0) {
      return [...newUsers];
    } else if (!noMore) {
      return await fetchFollowing(
        refreshItems,
        axiosApiInstance,
        username,
        creds,
      );
    }
  }
};

export default getUsersHandler;
