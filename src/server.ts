import config from "./config.js";
import app from "./app.js";
import seed from "../prisma/seed-production.js";

app.listen(config.port, () => {
  seed();
  console.log(`App listening on PORT ${config.port}`);
});
