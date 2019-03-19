const faker = require('faker');
const { performance, PerformanceObserver } = require('perf_hooks');
const util = require('util');

const debug = util.debuglog('performance');


const createFakeFeed = () => ({
  author: `${faker.name.lastName()} ${faker.name.lastName()}`,
  authorphoto: `https://loremflickr.com/320/240/face?lock=${faker.random.number(1000)}`,
  title: `${faker.lorem.words()}`,
  bigphoto: `https://loremflickr.com/620/400/football?lock=${faker.random.number(1000)}`,
  smallphoto: `https://loremflickr.com/1280/720/football?lock=${faker.random.number(1000)}`,
  newsfeed: `${faker.lorem.paragraph()}`,
  videoclip: `${faker.internet.url()}`,
  timestamp: `${faker.date.between('2019-01-02', '2019-03-31')}`,
});
exports.seed = async function seed(knex, Promise) {
  // const t0 = performance.now();
  performance.mark('Begin seed');
  const batchFeeds = 1000;
  for (let j = 0; j < batchFeeds; j += 1) {
    // Feeds
    performance.mark('Begin outer loop');
    const fakeFeeds = [];
    const desiredFakeFeeds = 1000;
    for (let i = 0; i < desiredFakeFeeds; i += 1) {
      fakeFeeds.push(createFakeFeed());
    }
    await knex('feeds')
      .insert(fakeFeeds);
    performance.mark('End outer loop');
  }
  // const t1 = performance.now();
  // performance.mark('End seed');
  // console.log(`Upload time: ${(t1 - t0)}`);
  // performance.measure('Begin to outer loop', 'Begin seed', 'Begin outer loop');
  // performance.measure('Outer loop time', 'Begin outer loop', 'End outer loop');
  // performance.measure('Seed time', 'Begin seed', 'End seed');
};

// const obs = new PerformanceObserver((list, observer) => {
//   // console.log('list', list);
//   console.log(list.getEntries());
//   performance.clearMarks();
//   observer.disconnect();
// });
// obs.observe({ entryTypes: ['measure'], buffered: true });


const counter = (num) => {
  let count = 0;
  for (let i = 0; i < num; i += 1) {
    count = i;
  }
};

const fn = performance.timerify(counter);
const obse = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0]);
  obse.disconnect();
  performance.clearFunctions();
});
obse.observe({ entryTypes: ['function'] });
fn(100000000);
