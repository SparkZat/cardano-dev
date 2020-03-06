/*module.exports = (data) => {
  Portfolio: require('./Portfolio'),
  Position: require('./Position')
};*/

module.exports = (data) => ({
  Portfolio: require('./Portfolio')(data),
  Position: require('./Position')(data)
});