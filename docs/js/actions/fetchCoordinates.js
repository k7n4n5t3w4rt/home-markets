// @flow
export default (
  area /*: string */,
) /*: Promise<Array<{y: number, x: number}>> */ => {
  return fetch(
    "https://public-api.wordpress.com/rest/v1.1/sites/homemarkets979860484.wordpress.com/posts/?pretty=true",
  )
    .then((response /*: Response */) /*: Object */ => {
      return response.json() || { posts: [] };
    })
    .then((
      rawResponseData /*: {posts: Array<{content:string}>} */,
    ) /*: Array<any> */ => {
      return rawResponseData.posts.map((
        post /*: Object */,
      ) /*: Shopfront */ => {
        const regex = /(?<=<code>)[^<]+/g;
        const found = post.content.match(regex)[0];
        const coordinates = JSON.parse(found) || { y: 0, x: 0 };
        return {
          URL: post.URL,
          coordinates,
        };
      });
    });
};

/*:: type Shopfront = {
			URL: string,
			coordinates: {y: number, x: number}
	} */
