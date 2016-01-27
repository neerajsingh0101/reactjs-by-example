export class Tweet extends Object {}

let tweet = new Tweet();

tweet.id = '1';

tweet.content = "Setting up my twttr";

export function getTweet() { return tweet; }
