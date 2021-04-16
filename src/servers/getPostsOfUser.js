/**
 * CONSTANTS
 */
let posts = [];

let noMore = false;
let index = 0;
let lastReadedDate = new Date().toISOString();

const INIT_BATCHES = 5;
const BATCHES = 2;
/**
 * @func getUsers
 *
 * Calling to API in order to get the users in the room
 */

const fetchPosts = async (
  refreshItems,
  axiosApiInstance,
  username,
  creds,
  usertoRead,
  date,
) => {
  /**
   * Get User Api Call. Query and Method
   */
  let requestUser = {
    operationName: 'GetPostsOfUser',
    query: `query GetPostsOfUser {
        getPostsOfUser(username:"${username}" , userOf:"${usertoRead}", lastReaded:"${date}"){
          title
          authorId
          imageInfo{
            bck
            url
            author
          }
          content
          likes
          createdOn
        }
      }`,
  };

  return axiosApiInstance
    .post('http://192.168.1.37:3000/graphql', JSON.stringify(requestUser), {
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
      const fetchedPosts = resData.getPostsOfUser;

      console.log(fetchedPosts);
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

      const returnPosts = posts.slice(
        index,
        index + (refreshItems ? INIT_BATCHES : BATCHES),
      );
      index = index + (refreshItems ? INIT_BATCHES : BATCHES);
      console.log('DEVUELVO');
      console.log(returnPosts);
      return returnPosts;
    })
    .catch(err => {
      throw err;
    });
};

const getPostsOfUser = async (
  refreshItems,
  axiosApiInstance,
  username,
  creds,
  usertoRead,
) => {
  if (refreshItems) {
    index = 0;
    return await fetchPosts(
      refreshItems,
      axiosApiInstance,
      username,
      creds,
      usertoRead,
      new Date().toISOString(),
    );
  } else {
    const newPosts = posts.slice(index, index + BATCHES);
    if (newPosts.length !== 0) {
      index = index + BATCHES;
      return [...newPosts];
    } else if (!noMore) {
      return await fetchPosts(
        refreshItems,
        axiosApiInstance,
        username,
        creds,
        usertoRead,
        lastReadedDate,
      );
    }
  }
};

export default getPostsOfUser;
