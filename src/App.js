import { useSelector } from "react-redux";
import Header from "./components/Header";
import TodoSearch from "./components/TodoSearch";

function App() {
  // const containerStyle = {
  //   minHeight: "85vh",
  // };

  const todos = useSelector((state) => state.todo);

  return (
    <>
      
      <Header />
      {todos.length !== 0 && <TodoSearch />}
    </>
  );
}

export default App;
