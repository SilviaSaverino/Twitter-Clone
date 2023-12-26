import { tweetsData } from './data.js'

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

tweetBtn.addEventListener('click', function () {
    console.log(tweetInput.value)
})

document.addEventListener('click', function (e) {
    if (e.target.dataset.reply) {
        console.log('ciao')
    }
    else if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
})

function handleLikeClick(tweetId) {
    // we are checking if the uuid property from data.js file 
    // is the same as the one stored in tweetId data obtained when clicking the icon
    // the test will be run for every element in the array, to return either
    // true or false
    // if true: that element will be save to targetTweetObj
    // if false: that object will be filtered out and won't be saved int targetTweetObj
    
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isLiked === false){
        targetTweetObj.likes++
        targetTweetObj.isLiked = true
    }else{
        targetTweetObj.likes--
        targetTweetObj.isLiked =false
    }
    
    render()
    console.log(targetTweetObj)
    
}

function getFeedHtml() {
    let feedHtml = ``
    tweetsData.forEach(function (tweet) {
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment"
                        data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-regular fa-heart"
                        data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet"
                        data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
    `
    })
    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()