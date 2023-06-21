import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tree from "./routes/Tree";
import Stack from "./routes/Stack";
import Home from "./routes/Home";
import SharedLayout from "./components/SharedLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="tree" element={<Tree />} />
          <Route path="stack" element={<Stack />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
