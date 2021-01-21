const express = require('express');
const app = require('./api');
const config = require('./config');

const PORT = process.env.PORT || 90001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
