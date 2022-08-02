- Change getTweets route to unprotected so the feed will fetch tweets from all users

- Reorder tweets and show newest on top

- Add icons for tweet feed form

- implement 'liking'

- each tweet has an associated user id with it
    - i need to render the users username/avatar who posted the tweet
        - option - make another request for each tweet using that userid
        - option - send the user data down along with the tweet data 
        - maybe might be as simple as calling the useSelector hook and rendering the item with that user data, but it might change when i log in again