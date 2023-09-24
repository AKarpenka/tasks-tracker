/* eslint-disable react/prop-types */
import './Priority.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Priority = ({ mode }) => {
  switch (mode) {
    case 'HIGHEST':
      return <FontAwesomeIcon className="priority-highest" icon={faArrowUp} />;
    case 'HIGH':
      return <FontAwesomeIcon className="priority-high" icon={faArrowUp} />;
    case 'NORMAL':
      return <FontAwesomeIcon className="priority-normal" icon={faArrowRight} />;
    case 'LOW':
      return <FontAwesomeIcon className="priority-low" icon={faArrowDown} />;
    case 'LOWEST':
      return <FontAwesomeIcon className="priority-lowest" icon={faArrowDown} />;
    default:
      break;
  }
};

export default Priority;
