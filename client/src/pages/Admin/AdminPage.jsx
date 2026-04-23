import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'
const AdminPage = () => {
    const {user}=useSelector(state=>state.auth)
  return (
    <Layout>
        <div className="container">
            <div className="d-flex flex-column mt-4">
               <h1>Welcome <i>{user?.name}</i></h1>
               <h3>Manage Blood bank</h3>
               <hr/>
               <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsa tenetur neque excepturi, fugit animi dignissimos deserunt quae atque quia perferendis autem exercitationem illo dicta, laboriosam maxime molestias. Recusandae totam debitis hic ullam corporis ducimus, nobis error adipisci temporibus expedita molestias deleniti beatae in exercitationem ipsa suscipit pariatur repellat explicabo!
               </p>
            </div>
        </div>
    </Layout>
  )
}

export default AdminPage