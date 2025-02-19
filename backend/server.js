import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import issuingRoutes from "./routes/issuing.js";
import financeRouting from "./routes/finance.js"
import depositsRouting from './routes/deposits.js'
import balancesRouting from './routes/balances.js'
// import fxRoutes from "./routes/fx.js";  // ✅ Added FX routes
// import coreResourcesRoutes from "./routes/coreResources.js";  // ✅ Added Core Resources routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/issuing", issuingRoutes);
app.use("/api/finance", financeRouting);
app.use("/api/deposits", depositsRouting);
app.use("/api/balances", balancesRouting);

//app.use("/api/fx", fxRoutes);  // ✅ Now we have an endpoint for FX
//app.use("/api/core", coreResourcesRoutes);  // ✅ Now we have an endpoint for Core Resources

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
