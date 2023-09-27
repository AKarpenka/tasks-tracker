/* eslint-disable react/prop-types */
import Files from 'react-files';
import './FilesDropZone.scss';

const FilesDropZone = ({ handleFileChange }) => {
  return (
    <Files
      className="files-dropzone"
      dragActiveClassName="files-dropzone-active"
      onChange={handleFileChange}
      accepts={['image/*', '.pdf', '.doc', '.docx', 'audio/*']}
      multiple
      maxFiles={5}
      maxFileSize={10000000}
      minFileSize={0}
      clickable>
      Drop files here or click to upload
    </Files>
  );
};

export default FilesDropZone;
