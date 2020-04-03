const NewsAPI = require('newsapi');
const userModel = require('../../Models/user');
const userValidation = require('../Support/userValidation');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const getSources = async (req, res) => {
  const response = await newsapi.v2.sources();

  if (!response || response.status !== 'ok') {
    return res.status(200).json({
      status: true,
      message: 'fetched succesffully',
      data: {
        sources: []
      }
    });
  }

  return res.status(200).json({
    status: true,
    message: 'fetched succesffully',
    data: {
      sources: response.sources
    }
  });
}

const getEveryThing = async (req, res) => {

  // validate user data
  const validationResponse = await userValidation.validateUserId(req.query.id);
  if (!validationResponse.valid) {
    return res.status(400).json({
      status: false,
      message: 'validation error',
      error: {
        validationErrors: validationResponse.validationErrors
      }
    });
  }

  const user = await userModel.findUser(req.query.id);

  if (user.subscribedSources.length === 0) {
    return res.status(200).json({
      status: true,
      message: 'fetched succesffully',
      data: {
        news: [],
        page: req.body.page
      }
    });
  }

  const response = await newsapi.v2.everything({
    sources: user.subscribedSources.join(),
    page: req.query.page ? req.query.page : 1,
    pageSize: req.query.pageSize !== undefined ? req.query.pageSize : 20
  });

  if (!response || response.status !== 'ok') {
    return res.status(200).json({
      status: true,
      message: 'fetched succesffully',
      data: {
        news: [],
        page: null,
        totalResults: 0
      }
    });
  }
  return res.status(200).json({
    status: true,
    message: 'fetched succesffully',
    data: {
      news: response.articles,
      totalNews: response.totalResults,
      page: req.query.page
    }
  });
}

module.exports.getSources = getSources;
module.exports.getEveryThing = getEveryThing;