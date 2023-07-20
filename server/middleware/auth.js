import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
