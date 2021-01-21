const app = require('./api/index');
require('dotenv').config();

const PORT = process.env.PORT || 9008;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
