
import React from 'react';

import * as musicMetadata from 'music-metadata-browser';

class EditFiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "editFilesLoading": false
        };
    }

    //parse audio file for metadata
    parseFile = async(file) => {
        return musicMetadata.parseBlob(file, { native: true })
            .then(metadata => {
                return metadata;
            }).catch((error) => {
                console.log('parseFile error: ', error)
            }).finally(() => { })
    }

    //when files are selected
    onChangeFilesSelected = async (event) => {
        var existingFiles = this.props.files
        if(!existingFiles) existingFiles={}
        this.setState({editFilesLoading: "Loading...    "});
        let files = {}
        var fileCount = 0
        var filesLength = event.target.files.length
        for (const file of event.target.files) {
            this.setState({editFilesLoading: `Loading... (${fileCount}/${filesLength})`});
            var fileInfo = {}
            fileInfo.fileData = file
            //add if file doesnt already exist
            if(!existingFiles[`${file.path}`]){
                if (file.type.includes('audio/')) fileInfo['metadata'] = await this.parseFile(file);
                files[`${file.path}`] = fileInfo
                fileCount++
                this.props.parentCallback(files);
            }
            
        }
        this.setState({editFilesLoading: false});
        //pass files back up to parent
    }

    render() {

        return <>
            {/* Files Selector */}
            <h1>Choose files:</h1>
            { this.state.editFilesLoading!=false ? <a>{this.state.editFilesLoading}</a> : null } 
            <input type="file" multiple="multiple" onChange={this.onChangeFilesSelected} />

        </>;
    }
}

export default EditFiles;