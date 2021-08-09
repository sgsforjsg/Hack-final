import React, { useEffect, useState } from 'react'
import firebase from "firebase";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
//import { connect } from 'react-redux'
import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import FileUploader from "react-firebase-file-uploader";
import imageCompression from 'browser-image-compression';
import { createProject } from '../../store/actions/noticeActions'
import Spinner from './Spinner';
import { Redirect, useHistory } from 'react-router-dom'
import M from "materialize-css";
 
const CreateNotice1 = ({ project, id, auth }) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            FirstName: '',//id !== 'a' ? project.FirstName : '',
            uploadProgress: 0,
            furl: '-',
            id1: id
        }
    })
    console.log('Auth', auth)
    let history = useHistory();
    //  const watchCourse = watch("course", false);
    const [isLoaded, setIsLoaded] = useState(false);

    const options = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ]

    const dispatch = useDispatch();

    const onSubmit = data => {

        console.log(data)
        alert('Saving')
        dispatch(createProject(data))
        // history.push('/edit/' + auth.uid);
        history.push('/');
        //this.props.history.push('/');
    }
    console.log(errors);

    useEffect(() => {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
        var elems1 = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems1, {});
    }, []);

    // upload--------
    const handleUploadStart = () => {
        console.log('started')

    }

    const handleUploadError = error => {

        console.error(error);
    };
    const handleUploadSuccess = async filename => {
        console.log(filename)
        const downloadURL = await firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL().then((url) => {
                setValue("furl", url)
                console.log(url, 'url')
            });
        console.log(filename)
    };
    const handleProgress = progress => {
        setValue('uploadProgress', progress)
        console.log(progress)
            ;
    }
    const deletefile = (e) => {
        e.preventDefault();
        var fileRef = firebase.storage().refFromURL(project.furl);
        fileRef.delete().then(function () {

            // File deleted successfully 
            console.log("File Deleted")
        }).catch(function (error) {
            // Some Error occurred 
        });
        console.log('delete file sucessfully')
    }

    //upload over
    function closeMe() {
        alert('dfdsfsdfgdsg')
        window.open('', '_parent', '');
        window.close();
    }
    //resize and then upload
    function handleImageUpload(event) {
        console.log('handleImageUpload(event)', event.target.files[0])
        setIsLoaded(true)
        var imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        var options = {
            maxSizeMB: 0.01,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        imageCompression(imageFile, options)
            .then(function (compressedFile) {
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                //const file = input.files[0];
                const url = URL.createObjectURL(compressedFile);
                console.log(url)
                return compressedFile; // write your own logic

            }).then((url) => {
                console.log('message', url);
                let file = url;
                let storageRef = firebase.storage().ref(`${'image'}/${auth.uid}`);
                let uploadTask = storageRef.put(file);
                // ----------------------------
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    // eslint-disable-next-line default-case
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;


                    }
                }, (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    // eslint-disable-next-line default-case
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                }, () => {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setValue("furl", downloadURL)
                        console.log('File available at', downloadURL,);
                        setIsLoaded(false)

                    });
                }
                );
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    const aa = () => {
        console.log('fsdfsdfs')
        return <Redirect to='/sigin' />
    }
    // if (auth) return <Redirect to='/sigin' />

    return (
        <div className='container'>
            {(id == 'a') ? <h5> Create </h5> : <h5>Edit</h5>}


            <form onSubmit={handleSubmit(onSubmit)}>
                {/*id !== 'a' ? <img className="materialboxed" width="200" src={project.furl} /> : '-'*/}
                {isLoaded && < Spinner />}
                <div style={{ "background": 'Teal' }}>

                    <div className='container'>
                        <h5 style={{ color: 'white' }} > Select Department</h5>
                    </div>
                    <select {...register("dept", { required: true })}>
                        <option value="gen"> General</option>
                        <option value="comp"> Computer </option>
                        <option value="ec">EC </option>
                    </select>
                    {/*watchCourse === "DIS/DET" && <h6>Maximum one admission as per merit</h6>*/}

                    { /* <div className='row'>
            <div className='col s10'></div>
            <div className='col s2'>
              <button type="button" onClick={() => (setValue('page', '1'))}>NEXT</button>
            </div>
        </div>*/}
                </div>

                <div >
                    <input type="text" placeholder="Title" {...register("Title", { required: true, maxLength: 180 })} />
                    {errors.FirstName && errors.FirstName.type === "required" && <span style={{ background: 'red' }}>Please enter full name</span>}


                    <textarea style={{ height: "200px" }} rows="5" placeholder="Body" {...register("Body", { required: true })} />
                    {errors.Address1 && errors.Address1.type === "required" && <span style={{ background: 'red' }}>Address</span>}







                    <div >
                        {/*id === 'a' ? 'Upload your passport style picture' : null*/}
                        {/*id === 'a' ? <input type="file" accept="image/*" onChange={handleImageUpload} /> : null*/}
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        {isLoaded && < Spinner />}
                        {id === 'a' ? <input type="text" hidden placeholder="Image Url" {...register("furl", { required: false })} /> : null}
                        {/*errors.furl && errors.furl.type === "required" && <span style={{ background: 'red' }}>Please upload face pic.</span>*/}
                    </div>


                    {/*  <div className="container uploading">
          <h5>Passport style Photo</h5>
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            handleImageUpload
            storageRef={firebase.storage().ref("images")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
</div>*/}
                    { /* <div className='row'>
            <div className='col s10'>
              <button type="button" onClick={() => (setValue('page', '0'))}>PREVIOUS</button>
            </div>
            <div className='col s2'>
              <button type="button" onClick={() => (setValue('page', '2'))}>NEXT</button>
            </div>
</div>*/}


                </div>

                {/*!watchfurl && (
                    <div>Upload your passport style picture<br />
                        <input type="file" accept="image/*" onChange={handleImageUpload} /></div>

                )*/}
                {/*watchfurl && */}
                <input className="waves-effect waves-light btn-large" type="submit" />
                <div>
                    <br />

                    {/*(id !== 'a') ? null : <input type="submit" />*/}
                </div>
            </form>
            <br />
            <br />
            <br />

        </div >)

}
//const Hookform = connect()(CreateNotice);
//export default Hookform;
const mapStateToProps = (state, ownProps) => {
    console.log()
    let id = null
    if (ownProps.match.params.id) { id = ownProps.match.params.id }
    const projects = state.firestore.data.notice;
    const project = projects ? projects[id] : '--'
    console.log(project, id)
    return {
        project: project,
        auth: state.firebase.auth,
        id: id
    }
}

export default connect(mapStateToProps)(CreateNotice1)
