import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import useToken from './useToken';

function App() {
    const { token, setToken } = useToken();

    const handleLogout = () => {
        sessionStorage.clear();
        setToken("");
    };

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <Dashboard handleLogout={handleLogout}/>
    );
}

export default App;
