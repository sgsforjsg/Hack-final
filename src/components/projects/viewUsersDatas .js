import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Notice from '../projects/noticeSummary'
import { Redirect } from 'react-router-dom'
const viewUsersDatas
  = ({ datas }) => {
   // if (!datas) return <Redirect to='/' />
    console.log('data', datas)
    return (
      <div className='container'>
        <div className="card z-depth-0">
          <div className="white darken-5">
         
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
    datas: state.firestore.ordered.users 
  }
}
export default connect(mapStateToProps)(viewUsersDatas)


