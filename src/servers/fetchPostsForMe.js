/**
 * CONSTANTS
 */
let posts = [];

let noMore = false;
let index = 0;
let lastReadedDate = new Date().toISOString();

const INIT_BATCHES = 3;
const BATCHES = 2;
/**
 * @func getUsers
 *
 * Calling to API in order to get the users in the room
 */

const fetchFollowers = async (
  refreshItems,
  axiosApiInstance,
  username,
  creds,
  date,
) => {
  //AXIOS INTERCERPTOR
  // Response interceptor for API calls
  let requestBody = {
    operationName: 'GetForMePost',
    query: `query GetForMePost {
        getPostFollowers(username:"${username}", lastReaded:"${date}", isForMe: true){
            _id
            title
           authorId
           imageInfo {
             bck
             url
             author
           }
           content
           likes
           createdOn
           img
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
        const fetchedPosts = resData.getPostFollowers;

        if (
          fetchedPosts.length === 0 ||
          (refreshItems && fetchedPosts.length < 6)
        ) {
          posts = [];
          noMore = true;
        }
        if (refreshItems) {
          posts = [...fetchedPosts];
        } else {
          if ([...posts, ...fetchedPosts].length <= 4) {
            // if lower or equal four we want to prevent from repeat elements.
            const newUsers = [...posts, ...fetchedPosts].filter(
              (item, ind) => posts.indexOf(item) === ind,
            );
            posts = [...newUsers];
          } else {
            posts = [...posts, ...fetchedPosts];
          }
        }

        //KEEP THE LAST POSTS DATE REDADED IN ORDER TO FECTH SINCE HERE
        if (fetchedPosts.length > 2) {
          lastReadedDate = fetchedPosts[fetchedPosts.length - 1].createdOn;
        }

        const returnUsers = posts.slice(
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

const getFollowersPosts = async (
  refreshItems,
  axiosApiInstance,
  username,
  creds,
) => {
  if (refreshItems) {
    console.log('entro');
    index = 0;
    return await fetchFollowers(
      refreshItems,
      axiosApiInstance,
      username,
      creds,
      new Date().toISOString(),
    );
  } else {
    const newPosts = posts.slice(index, index + BATCHES);
    console.log('Entro en slice items');
    if (newPosts.length !== 0) {
      index = index + BATCHES;
      return [...newPosts];
    } else if (!noMore) {
      return await fetchFollowers(
        refreshItems,
        axiosApiInstance,
        username,
        creds,
        lastReadedDate,
      );
    }
  }
};

export default getFollowersPosts;
