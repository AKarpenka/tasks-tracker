import { Link } from 'react-router-dom';
import img from './error.gif';

const Page404 = () => {
  return (
    <div>
      <img
        src={img}
        alt="Error"
        style={{
          display: 'block',
          maxWidth: '700px',
          width: '90%',
          objectFit: 'contain',
          margin: '0 auto'
        }}
      />
      <p style={{ textAlign: 'center' }}>
        Something went wrong with this page. You can watch the flying cup of coffee over and over
        or&nbsp;
        <Link to="/" style={{ textDecoration: 'underline' }}>
          back to the main page
        </Link>
        .
      </p>
    </div>
  );
};

export default Page404;
