export default function (err, req, res, next) {
  return res.status(err.statusCode ?? 500).json({ message: err.message });
  //   return res.status(500).send('Server Error');
}
