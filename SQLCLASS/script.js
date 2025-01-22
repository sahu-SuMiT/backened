const {faker} = require('@faker-js/faker');
let data = [];
let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(), // before version 9.1.0, use userName()
        faker.internet.email(),
        faker.internet.password(),
        ];
  }
for(let i = 1; i <= 2; i++)
    data
console.log(createRandomUser());
console.log(faker.string.uuid());