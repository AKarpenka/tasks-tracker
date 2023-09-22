import './Modal.scss';

// eslint-disable-next-line react/display-name
const withModal = (WrappedComponent) => (props) => {
  return (
    <div className="overlay">
      <div className="modal">
        <WrappedComponent {...props} />
      </div>
    </div>
  );
};

export default withModal;
