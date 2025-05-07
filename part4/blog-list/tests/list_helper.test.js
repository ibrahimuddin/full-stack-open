const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result,1)
})

describe('total likes', () => {
    test("empty list total likes is 0", () => {
        assert.strictEqual(listHelper.totalLikes([]),0)
    })
    test("like total correct when only one blog", () => {
        const blogPost = {
            title: "test",
            author: "ibrahim",
            url: "testing123",
            likes: 10
        } 
        assert.strictEqual(listHelper.totalLikes([blogPost]),10)
    })
    test("multiple blogs", () => {
        const blogPost1 = {
            title: "test",
            author: "ibrahim",
            url: "testing123",
            likes: 10
        }
        const blogPost2 = {
            title: "test2",
            author: "ibrahim",
            url: "testing123",
            likes: 12
        }
        const blogPost3 = {
            title: "test3",
            author: "ibrahim",
            url: "testing123",
            likes: 13
        }
        assert.strictEqual(listHelper.totalLikes([blogPost1,blogPost2,blogPost3]),35)
    })
})