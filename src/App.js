import { useSelector } from "react-redux";
import Header from "./components/Header";
import TodoSearch from "./components/TodoSearch";

function App() {
  const containerStyle = {
    minHeight: "85vh",
  };

  const todos = useSelector((state) => state.todo);

  return (
    <div style={containerStyle} className="container p-4">
      <Header />

      {todos.length !== 0 && <TodoSearch />}
      
    </div>
  );
}

export default App;
