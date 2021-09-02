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
        const regex = /(<code>)(.+)(<\/code>)/i;
        const found = post.content.match(regex);
        if (typeof found !== "undefined") {
          const coordinates = JSON.parse(found[2]) || { y: 0, x: 0 };
          return {
            title: post.title,
            URL: post.URL,
            coordinates,
          };
        } else {
          return {
            title: "TITLE UNDEFINED",
            URL: "URL UNDEFINED",
            coordinates: { y: 0, x: 0 },
          };
        }
      });
    })
    .catch((e /*: Error */) /*: any */ => {
      console.error(e);
    });
};

/*:: type Shopfront = {
			title: string,
			URL: string,
			coordinates: {y: number, x: number}
	} */
