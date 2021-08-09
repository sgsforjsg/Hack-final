import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Notice from '../projects/noticeSummary'
import { Redirect } from 'react-router-dom'
const ViewNoticeDatas = ({ datas }) => {
  const [Value, setValue] = useState('')
    if (!datas) return <Redirect to='/' />
   console.log('data', datas)
 //const [value, setvalue] = useState('')
    const handleChange=e=>{    
      setValue(e.target.value);
console.log(Value)
    }

    let filterdatas=datas.filter(
      (filt_data)=>{
        console.log(filt_data.key)
     // return filt_data.value.Title.toLowerCase().indexOf(Value.toLowerCase()) !== -1 
    }    )
    console.log(datas[1])
    return (
      <div className='container'>
        <div className="row">
         <div className="col s4">
<b>Search Title</b>
         </div>
            <div className="col s8">
              <input id="Value" type="text"  onChange={handleChange} />             
            </div>
          </div>
        <div className="card z-depth-0">
          <div className="white darken-5">
          {/*<Link to={'/create/a'}>
            <button ><i class="material-icons">note_add</i> Add New</button>
           </Link> */}
           {datas.map(project3 => {
              return (
              
                < Notice project4={project3} />
              )
            }

            )}



          </div>
        </div>
      </div>
    )

  }
const mapStateToProps = (state) => {
  console.log(state)
  return {
    datas: state.firestore.ordered.notice
  }
}
export default connect(mapStateToProps)(ViewNoticeDatas)


