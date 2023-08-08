import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostWidget from './PostWidget'
import axios from 'axios'
import { setPosts } from '../../States'

import { PropTypes } from 'prop-types'

PostsWidget.propTypes = {
  userId: PropTypes.string,
  isProfile: PropTypes.any,
}
function PostsWidget({ userId, isProfile }) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token)

  const getPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await axios.get('/api/posts', config)
      const data = await response.data

      dispatch(setPosts({ posts: data }))
    } catch (error) {
      console.log(error)
    }
  }
  const getUserPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await axios.get(`/api/posts/${userId}/posts`, config)
      const data = await response.data

      dispatch(setPosts({ posts: data }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        ),
      )}
    </>
  )
}

export default PostsWidget
