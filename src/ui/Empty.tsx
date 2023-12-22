const Empty: React.FC<{ resourceName?: string }> = ({ resourceName }) => {
  if (resourceName) {
    return <p>No {resourceName} could be found!</p>;
  } else {
    return <p>Whoops! Nothing to see here.</p>;
  }
};

export default Empty;
