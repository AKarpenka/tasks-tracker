/* eslint-disable react/prop-types */
import './PreviewFiles.scss';

const PreviewFiles = ({ files, handleFileRemove }) => {
  return (
    <div>
      {files.length > 0 && (
        <div className="files-list">
          <ul>
            {files.map((file, index) => (
              <li key={index} className="files-list-item">
                <div className="files-list-item-preview">
                  {file.preview.type === 'image' ? (
                    <img className="files-list-item-preview-image" src={file.preview.url} />
                  ) : (
                    <div className="files-list-item-preview-extension">{file.extension}</div>
                  )}
                </div>
                <div className="files-list-item-content">
                  <div className="files-list-item-content-item files-list-item-content-item-1">
                    {file.name}
                  </div>
                  <div className="files-list-item-content-item files-list-item-content-item-2">
                    {file.sizeReadable}
                  </div>
                </div>
                <div className="files-list-item-remove" onClick={() => handleFileRemove(file.id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PreviewFiles;
