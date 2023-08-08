import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'

const img = import.meta.env.VITE_IMG_URI

UserImage.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
}
function UserImage({ image, size = '60px' }) {
  return (
    <Box width={size} height={size}>
      <img
        src={img + image}
        alt="user"
        style={{ objectFit: 'cover', border: '50%', borderRadius: '50%' }}
        width={size}
        height={size}
      />
    </Box>
  )
}

export default UserImage
