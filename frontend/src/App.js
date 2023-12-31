import { AdminLayout } from "./Layout/AdminLayout";
import { UserLayout } from "./Layout/UserLayout";

const role = 'user'
function App() {
  {
    if (role == 'user')
    return(
      <UserLayout/>
    )
    else if (role == 'admin')
    return(
      <AdminLayout/>
    )
  }
}

export default App;
