import Header from './components/Header'
import Stats from './components/Stats'
import TodoForm from './components/TodoForm'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <Header />
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <Stats />
        <TodoForm />
        <FilterBar />
        <TodoList />
      </div>
    </div>
  )
}

export default App
