import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  // req.headers["x-access-token"];

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).send('No token passed')

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userKey) => {
    if (err) return res.status(403).send('Token passed is invalid')
    req.user = userKey
    next()
  })
}
