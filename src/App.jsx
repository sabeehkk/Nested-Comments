
import './App.css'
import NestedComents from './components/nested_coments'
import ComentsData from './data/coments.json'
function App() {
 
  return (
   <div>
    <h1 className='project-title'>Nested coment system</h1>
    <NestedComents
     coments={ComentsData}
     onSubmit={(content)=>{content}}
     onEdit={(content)=>{content}}
     onDelete={(handleDelete)=>{handleDelete}}
     />
   </div>
  )
}

export default App
