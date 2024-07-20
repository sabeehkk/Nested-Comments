
import './App.css'
import NestedComents from './components/nested_coments'
import ComentsData from './data/coments.json'
function App() {
  const handleDelete = (commentId) => {
    console.log('Deleted comment ID:', commentId);
    // Additional logic if needed
  };
  return (
   <div>
    <h1>Nested coment system</h1>
    <NestedComents
     coments={ComentsData}
     onSubmit={(content)=>{content}}
     onEdit={(content)=>{content}}
     onDelete={handleDelete}
     />
   </div>
  )
}

export default App
