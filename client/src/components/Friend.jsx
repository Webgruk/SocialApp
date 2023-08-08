import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserImage from './UserImage'
import axios from 'axios'
import { setFriends } from '../States'
import FlexBetween from './FlexBetween'
import { PropTypes } from 'prop-types'

Friend.propTypes = {
  friendId: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  userPicturePath: PropTypes.string,
}

function Friend({ friendId, name, subtitle, userPicturePath }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await axios.patch(
        `/api/users/${friendId}`,
        { id: _id },
        config,
      )
      const data = await response.data
      dispatch(setFriends({ friends: data }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Link
          // onClick={() => {
          //   navigate(`/profile/${friendId}`)
          //   navigate(0)
          // }}
          to={`/profile/${friendId}`}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Link>
      </FlexBetween>
      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend
