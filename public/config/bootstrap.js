const UtilService = require("../api/services/UtilService");

module.exports = async () => {
  console.log('=== bootstrap START ===');
  try {
    await User.create({
      account: 'admin',
      password: 'admin',
    });

    UtilService.test();

  } catch (error) {
    console.error('bootstrap error :');
    console.error(error);
  } finally {
    console.log('=== bootstrap END ===');
  }
};