module.exports = {
  command: 'cache',
  desc: 'Cache control.',
  usage: ['cache [<options>]', 'cache clear'],
  options: [
    {
      flag: 'clear',
      desc: 'Clear all cache'
    }
  ]
};
