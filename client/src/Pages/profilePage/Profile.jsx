import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import FriendListWidget from '../widgets/FriendListWidget'
import MyPosts from '../widgets/MyPosts'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import axios from 'axios'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await axios.get(`/api/users/${userId}`, config)
      const data = await response.data

      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user.picturePath}
            friends={user.friends}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPosts picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
