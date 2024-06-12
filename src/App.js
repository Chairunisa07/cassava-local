import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import Traceability from "./page/traceability";
import Login from "./page/login";
import Dashboard from "./page/dashboard";
import PerusahaanAddHarga from "./page/perusahaan/perusahaan-add-harga";
import PerusahaanEditHarga from "./page/perusahaan/perusahaan-edit-harga";
import Panen from "./page/panen";
import HistoryPanen from "./page/history-panen";
import AddOrder from "./page/add-order";
import UpdateOrder from "./page/update-order";
import UpdateHargaAktual from "./page/perusahaan/perusahaan-aktual";
import TerimaOrder from "./page/terima-order";
import Users from "./page/admin/users";
import AddUser from "./page/admin/add-user";
import EditUser from "./page/admin/edit-user";
import PerusahaanProfile from "./page/perusahaan/perusahaan-profile";
import PerusahaanProfileEdit from "./page/perusahaan/perusahaan-profile-edit";
import PetaniLahan from "./page/petani/petani-lahan";
import PetaniAddLahan from "./page/petani/petani-add-lahan";
import PetaniEditLahan from "./page/petani/petani-edit-lahan";
import PetaniProfile from "./page/petani/petani-profile";
import PetaniProfileEdit from "./page/petani/petani-profile-edit";
import PabrikList from "./page/pabrik/pabrik-data-list";
import PabrikAddList from "./page/pabrik/pabrik-add-list";
import PabrikEditList from "./page/pabrik/pabrik-edit-list";
import PabrikProfile from "./page/pabrik/pabrik-profile";
import LogistikList from "./page/logistik/logistik-list";
import LogistikListAdd from "./page/logistik/logistik-list-add";
import LogistikListEdit from "./page/logistik/logistik-list-edit";
import LogistikProfile from "./page/logistik/logistik-profile";
import LogistikProfileEdit from "./page/logistik/logistik-profile-edit";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PabrikProfileEdit from "./page/pabrik/pabrik-profile-edit";

function App() {
  return (
    <div className="Cassava Super">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/traceability" element={<Traceability />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-harga" element={<PerusahaanAddHarga />} />
          <Route
            path="/perusahaan-edit/:id"
            element={<PerusahaanEditHarga />}
          />
          <Route path="/panen" element={<Panen />} />
          <Route path="/history-panen" element={<HistoryPanen />} />
          <Route path="/panen/add" element={<AddOrder />} />
          <Route path="/products/update/:id" element={<UpdateOrder />} />
          <Route
            path="/orders/updateharga/:id"
            element={<UpdateHargaAktual />}
          />
          <Route path="/panen/acc/:id" element={<TerimaOrder />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/profile-perusahaan" element={<PerusahaanProfile />} />
          <Route
            path="/profile-perusahaan/edit/:id"
            element={<PerusahaanProfileEdit />}
          />
          <Route path="/datalahan" element={<PetaniLahan />} />
          <Route path="/datalahan/add" element={<PetaniAddLahan />} />
          <Route path="/datalahan/edit/:id" element={<PetaniEditLahan />} />
          <Route path="/profile-petani" element={<PetaniProfile />} />
          <Route
            path="/profile-petani/edit/:id"
            element={<PetaniProfileEdit />}
          />
          <Route path="/data-pabrik" element={<PabrikList />} />
          <Route path="/data-pabrik/add" element={<PabrikAddList />} />
          <Route path="/data-pabrik/edit/:id" element={<PabrikEditList />} />
          <Route path="/profile-pabrik" element={<PabrikProfile />} />
          <Route
            path="/profile-pabrik/edit/:id"
            element={<PabrikProfileEdit />}
          />
          <Route path="/data-logistik" element={<LogistikList />} />
          <Route path="/data-logistik/add" element={<LogistikListAdd />} />
          <Route
            path="/data-logistik/edit/:id"
            element={<LogistikListEdit />}
          />
          <Route path="/profile-logistik" element={<LogistikProfile />} />
          <Route
            path="/profile-logistik/edit/:id"
            element={<LogistikProfileEdit />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
