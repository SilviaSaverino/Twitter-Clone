import { tweetsData } from './data.js'

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

document.addEventListener('click', function(e){
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)   
    }else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)   
    }else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }else if(tweetBtn){
        handleTweetBtnClick()
    }
})

function handleLikeClick(tweetId){
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
    }else{
        targetTweetObj.likes--
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
    console.log(targetTweetObj)
    
}

function handleRetweetClick(tweetId){
    const retweetTargetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    
    if(retweetTargetObj.isRetweeted){
        retweetTargetObj.retweets--
    }
    else{
        retweetTargetObj.retweets++
    }
    retweetTargetObj.isRetweeted = !retweetTargetObj.isRetweeted
    render()
    
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    console.log(tweetInput.value)
}


function getFeedHtml() {
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        let likeIconClass = ''
        let sharedIconClass = ''
        if(tweet.isLiked){
            likeIconClass='liked'
        }else if(tweet.isRetweeted){
            sharedIconClass='retweeted'
        }

        let repliesHtml = ''
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml += `
                <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
            `
            })    
        }

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
                        <i class="fa-solid fa-heart ${likeIconClass}"
                        data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${sharedIconClass}"
                        data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div id="replies-${tweet.uuid}">
            ${repliesHtml}
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