import _ from 'lodash';

import faker from 'faker';

var id = 0;
var links = [];
for (let i = 0; i < 42; i++) {
  addLink({
    title: faker.random.words(),
    dateAdded: faker.date.recent(),
    userId: faker.random.number(),
    url: "http://www.google.com",
    imageUrl: `https://picsum.photos/200?image=${i}`
  });
}

function addLink(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      let t = {
        id: id++,
        ...data
      };
      links.push(t);
      resolve(t);
    }, 2000);
  });
}

function fakeDelay (cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cb())
    }, 2000)
  })
}

export default {
  getLinks(type) {
    return fakeDelay(() => _.filter(links, tag => tag.type === type))
  },
  getLinksPage(page, pageSize) {
    return fakeDelay(() => {
      const start = page * pageSize;
      const end = start + pageSize;
      return {
        links: links.slice(start, end),
        hasMore: end < links.length,
      };
    })
  },
  getAll() {
    return links;
  },
  addLink,
};
