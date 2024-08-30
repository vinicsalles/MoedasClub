import { Routes, Route } from "react-router-dom";
import Dolar from "../Pages/Dolar/index";
import Euro from "../Pages/Euro/index";
import NotFound from "../Pages/NotFound/index";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dolar />} />
      <Route path="/euro" element={<Euro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
