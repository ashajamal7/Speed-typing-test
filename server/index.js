const express = require('express');
const app = express();
const PORT = 3001;

const routes = require('./routes');
const errorHandler = require('./errorHandler');

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 