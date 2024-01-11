import "dotenv/config";
import web from "./middleware/web.js";

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

web.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
