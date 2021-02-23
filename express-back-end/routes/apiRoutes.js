const router = require("express").Router();
const axios = require("axios");

module.exports = (db) => {
  router.get("/repositories", (request, response) => {
    const { userName } = request.query;
    console.log("requesting");
    console.log(userName);
    
    const githubUrl = 'https://api.github.com/graphql';

    const token = process.env.AUTH_TOKEN;

    const oauth = {Authorization: 'bearer ' + token};

    const query = 'query ($userName: String! ){' +
                  'user(login: $userName){' +
                    'repositories(first: 50, isFork: false) {' +
                      'nodes {' +
                        'id,' +
                        'name,' +
                        'url,' +
                        'description,' +
                        'createdAt,' +
                        'updatedAt,' +
                        'primaryLanguage {' +
                          'name' +
                        '},' +
                        'languages(first: 100) {' +
                          'nodes {' +
                            'name' +
                          '}' +
                        '},' +
                        'owner {' +
                          'login,' +
                          'avatarUrl' +
                        '}' +
                      '}' +
                    '}' +
                  '}' +
                '}';

    axios.post(githubUrl, {query: query, variables: { userName: userName} }, {headers: oauth})
      .then((res) => {
        response.json(res.data.data);
      });
  });
  return router;
};
