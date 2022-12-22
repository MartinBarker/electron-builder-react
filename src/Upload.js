
import React from 'react';
import EditFiles from './Editfiles'

//var state = {name: "InitialNameValue"}

class Upload extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            'name': 'Upload Name',
            'files': {}
        };
    }

    //handle callback to update files
    handleCallback = (childFiles) => {
        let combined = {
            ...childFiles,
            ...this.state.files
        };
        this.setState({ files: combined })
    }

    deleteFile = (fileName) => {
        delete this.state.files[`${fileName.row}`];
        this.setState({ files: this.state.files })
    }


    render() {
        
        return <>
            <h1>{this.state.name}</h1>
            <h3>{Object.keys(this.state.files).length} Files</h3>
            <EditFiles
                //pass data to child component using props
                files={this.state.files}
                //EditFiles child component will call this function with data
                parentCallback={this.handleCallback}
            />
            
            <br></br>
            {Object.keys(this.state.files).map((row) => {
                return <div key={row}>
                    <button onClick={ () => this.deleteFile({row}) }>X</button>  
                    {row}
                    <br></br>
                </div>;
            })}

                {/*
                {
                    Object.keys(this.state.files).map(function (name, index) {
                        return <>
                            <div index={index} key={index}>{name}</div>
                        </>;
                     })
                }
                */}




        </>;
    }
}

export default Upload;