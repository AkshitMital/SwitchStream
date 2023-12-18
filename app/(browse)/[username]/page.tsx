interface userPageProps {
  params: {
    username: String;
  };
}

const userPage = ({ params }: userPageProps) => {
  return <div>User: {params.username}</div>;
};

export default userPage;
