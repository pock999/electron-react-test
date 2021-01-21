module.exports = {
  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
  test() {
    console.log('UtilService test');
  },
};