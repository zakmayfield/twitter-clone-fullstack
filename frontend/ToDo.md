- Add icons for tweet feed form

- implement 'liking'
    - similar to a toggle, you can either like, or un like the tweet
    - the number of likes should be attached to the tweet schema in the backend?
    - addition of a 'likes' prop on the tweet model
        - likes: {
            numberOfLikes: 0,
            users: [
                {
                    user 1
                },
                {
                    user 2
                },
            ]
        }
        - when user X likes user A's tweet, that action could dispatch an action to increment to the numberOfLikes, and add the users data to the list of users who have liked the tweet and vice versa for un liking
    - displaying your own liked tweets will be stretch
    - twitter makes a post request when you like a tweet, it must make a post with the tweet id and calls on the backend to find that specific tweet and increment the number of likes
    - i was thinking of having a prop on the tweet that holds the data for the number of likes that can be incremented
    - so how do i get twitters version to work? If i make a POST with the id of the tweet to /api/tweets/:id or maybe POST to /api/tweets/{{id}}/LikeTweet && /api/tweets/{{id}}/UnlikeTweet where like and unlike routes increment the value of 'numberOfLikes' prop on the tweet
    - how do we increment numberOfLikes on the tweet after this post request, the payload from the POST will always only ever be 1 or -1, to increment or decrement the tweet likes, so POST to /api/tweets/:id/LikeTweet with payload of {numberOfLikes: 1}


- tweets need to hold the username (which is implemented when creating the tweet) but also we need the tweet to reference the display name (eventually) to have a format like so 'Zak Mayfield @zaarNFT' || '{{display name}} @{{username}}
