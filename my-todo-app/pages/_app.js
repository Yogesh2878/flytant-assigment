import TodoList from '../components/TodoList';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <TodoList />
      <Component {...pageProps} />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/todos');
  const todos = await response.json();
  return {
    props: {
      todos,
    },
  };
}


export default MyApp;