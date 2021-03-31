/**
 * CONSTANTS
 */
let users = [];

let noMore = false;
let index = 0;

const INIT_BACTHES = 10;
const BATCHES = 2;

/**
 * @func searchUsersHandler
 *
 * Calling to API in order to get the users by some term
 */

const searchUsersHandler = async (
  refreshItems,
  axiosApiInstance,
  username,
  searchTerm,
  creds,
) => {
  //AXIOS INTERCERPTOR
  // Response interceptor for API calls
  let requestBody = {
    operationName: 'SearchUsers',
    query: `  query SearchUsers{
        searchUsers(username:"${username}", searchTerm:"${searchTerm
      .toLowerCase()
      .trim()}"){
          username
          name
          image
          imgUrl
          posts
          followers
          following
        }
    }`,
  };

  try {
    return await axiosApiInstance
      .post('http://192.168.1.38:3000/graphql', JSON.stringify(requestBody), {
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
        const fetchedPosts = resData.searchUsers;
        if (
          fetchedPosts.length === 0 ||
          (refreshItems && fetchedPosts.length < 2)
        ) {
          users = [];
          noMore = true;
        }

        if (refreshItems) {
          users = [...fetchedPosts];
          noMore = false;
          return users;
        } else {
          if ([...users, ...fetchedPosts].length <= 4) {
            // if lower or equal four we want to prevent from repeat elements.
            const newUsers = [...users, ...fetchedPosts].filter(
              (item, ind) => users.indexOf(item) === ind,
            );
            users = [...newUsers];
          } else {
            users = [...users, ...fetchedPosts];
          }

          const returnUsers = users.slice(
            index,
            index + (refreshItems ? INIT_BACTHES : BATCHES),
          );
          index = index + (refreshItems ? INIT_BACTHES : BATCHES);

          console.log(returnUsers);
          return returnUsers;
        }
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
};

const searchUsersByTerm = async (
  refreshItems,
  axiosApiInstance,
  username,
  searchTerm,
  creds,
) => {
  if (refreshItems) {
    return await searchUsersHandler(
      refreshItems,
      axiosApiInstance,
      username,
      searchTerm,
      creds,
    );
  } else {
    const newPosts = users.slice(index, index + BATCHES);

    if (newPosts.length !== 0) {
      return [...newPosts];
    } else if (!noMore) {
      return await searchUsersHandler(
        refreshItems,
        axiosApiInstance,
        username,
        searchTerm,
        creds,
      );
    }
  }
};

export default searchUsersByTerm;
