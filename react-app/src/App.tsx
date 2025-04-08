
import { Provider } from 'react-redux'
import './App.css'
import FileCard from './components/file/FileCard'

import UploadFile from './components/file/UploadFile'
import { RouterProvider } from 'react-router'
import { router } from './router'
import store from './store/store'
import DownloadFile from './components/file/DownloadFile'
import Auth from './components/user/Auth'

function App() {

  return (
    <>
        <Provider store={store}>
          <RouterProvider router={router} />
          {/* <DownloadFile fileName='IMG_8452~1.jpg'/> */}
          
        </Provider>
      {/* <UploadFile></UploadFile>
       */}
{/* <FileCard fileName='rrr' fileUrl='uuu'></FileCard> */}
    </>
  )
}

export default App
