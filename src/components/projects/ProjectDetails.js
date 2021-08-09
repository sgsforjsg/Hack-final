import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect, useHistory } from 'react-router-dom'
import moment from 'moment'

const ProjectDetails = (props) => {

  const { project, auth } = props;
  console.log(project)
  let history = useHistory();
  const goToPreviousPath = () => {
      history.goBack()
  }
  // if (!auth.uid) return <Redirect to='/signin' />
  if (project) {
    return (
      <div>
        <div className="row">
          <div className="col s12 m7">
            <div className="card">
              <div className="card-image">
                <img height='250px' src={project.furl} />

              </div>
              <div className="card-content">
                {project.Title}
                <br />
                {project.Body}
              </div>
              <div class="card-action">
              <div>
        <button  onClick={goToPreviousPath}
        >
          Back
        </button>
      </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  const projects = state.firestore.data.notice;
  const project = projects ? projects[id] : null

  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps)

)(ProjectDetails)
