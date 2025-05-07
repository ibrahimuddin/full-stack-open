const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer,0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return []
    }
    const reducer = (higherLikedBlog, item) => {
        return item.likes > higherLikedBlog.likes ? item : higherLikedBlog;
    }
    return blogs.reduce(reducer)
}

module.exports = {dummy, totalLikes, favouriteBlog}